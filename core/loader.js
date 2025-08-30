(async function(){
  async function fetchJSON(url){
    try{ const r = await fetch(url, {cache:'no-store'}); if(!r.ok) throw new Error('not found'); return await r.json(); }catch(e){ throw e; }
  }

  async function loadAll(){
    // wait UI ready
    await new Promise(res=>{ if(window.CoreUI && document.readyState!=='loading') res(); else document.addEventListener('DOMContentLoaded', ()=>res()); });
    const ui = window.CoreUI;
    try{
      const list = await fetchJSON('modules/modules.json');
      if(!Array.isArray(list) || list.length===0){ window.CoreNotify.notify('Модулей не найдено', 'info'); return; }
      for(const path of list){
        try{ await loadModule(path); }catch(e){ window.CoreNotify.notify('Ошибка загрузки '+path+': '+e.message,'error'); console.error(e); }
      }
    }catch(e){
      window.CoreNotify.notify('Не удалось получить modules.json: '+ e.message,'error');
      console.warn(e);
    }
  }

  async function loadModule(modulePath){
    const name = modulePath.split('/').pop();
    const configUrl = modulePath+'/'+name+'.module.json';
    const cfg = await fetchJSON(configUrl);
    // load CSS if provided
    if(cfg.style){ const link = document.createElement('link'); link.rel='stylesheet'; link.href = modulePath + '/' + cfg.style; document.head.appendChild(link); }
    // load script
    if(!cfg.entry) throw new Error('entry required in module config');
    await new Promise((resolve,reject)=>{
      const timer = setTimeout(()=>reject(new Error('module load timeout')), window.CoreConfig.moduleTimeout || 5000);
      const s = document.createElement('script'); s.src = modulePath + '/' + cfg.entry;
      s.onload = ()=>{
        clearTimeout(timer);
        // expect module to call CoreAPI.register(name, api, cfg)
        setTimeout(()=>{
          const reg = window.CoreModules && window.CoreModules[cfg.name];
          if(!reg) return reject(new Error('module did not call register: '+cfg.name));
          // init module: api.init(mountSelector)
          try{
            const mount = cfg.mount || window.CoreMount.contentSelector;
            if(typeof reg.api.init === 'function'){ reg.api.init(mount); window.CoreNotify.notify('Модуль '+cfg.name+' инициализирован','success'); }
            resolve();
          }catch(err){ reject(err); }
        }, 80);
      };
      s.onerror = ()=>{ clearTimeout(timer); reject(new Error('script failed to load')); };
      document.body.appendChild(s);
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{ loadAll().catch(e=>console.error(e)); });
})();
