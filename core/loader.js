(async function(){
  // loader: reads modules/modules.json and loads each module path
  async function loadAll(){
    // build UI and attach to Core
    const ui = CoreUI_build();
    Core.setUI(ui);

    // try to show saved user in header
    try {
      const cur = localStorage.getItem('cf_current_user');
      if(cur) document.getElementById('core-user').textContent = cur;
    } catch(e){}

    // fetch modules list
    let list = [];
    try{
      const r = await fetch('modules/modules.json', {cache:'no-store'});
      if(r.ok) list = await r.json();
    } catch(e){
      console.warn('modules.json fetch failed', e);
    }
    if(!Array.isArray(list) || list.length===0){
      // no modules — leave placeholder
      Core.notify('Модулей не найдено', 'info');
      return;
    }

    for(const modulePath of list){
      try{
        await loadModule(modulePath);
      }catch(err){
        Core.notify('Ошибка загрузки: '+modulePath+' — '+err.message, 'error');
        console.error(err);
      }
    }
  }

  async function loadModule(modulePath){
    // modulePath expected like "modules/auth" or "modules/something"
    const name = modulePath.split('/').pop();
    // fetch module config: <modulePath>/<name>.module.json
    const configUrl = modulePath + '/' + name + '.module.json';
    const cfgResp = await fetch(configUrl, {cache:'no-store'});
    if(!cfgResp.ok) throw new Error('module config not found: '+configUrl);
    const cfg = await cfgResp.json();
    // load CSS if any
    if(cfg.style){
      const link = document.createElement('link');
      link.rel = 'stylesheet'; link.href = modulePath + '/' + cfg.style;
      document.head.appendChild(link);
    }
    // load script and wait for registration
    if(cfg.entry){
      await new Promise((resolve, reject)=>{
        let timedOut = false;
        const timer = setTimeout(()=>{ timedOut = true; reject(new Error('module registration timeout')) }, 4500);
        const script = document.createElement('script');
        script.src = modulePath + '/' + cfg.entry;
        script.onload = ()=>{
          // wait short time for module to call Core.registerModule
          setTimeout(()=>{
            clearTimeout(timer);
            if(timedOut) return;
            const reg = Core._registry[cfg.name];
            if(reg && reg.api && typeof reg.api.init === 'function'){
              // mount into core content area
              try{
                const mount = cfg.mount || '#core-content';
                const api = reg.api;
                api.init(mount);
                Core.notify('Модуль "'+cfg.name+'" загружен', 'success');
                resolve();
              }catch(e){
                reject(e);
              }
            }else{
              reject(new Error('module did not register with Core: '+cfg.name));
            }
          }, 120);
        };
        script.onerror = ()=>{ clearTimeout(timer); reject(new Error('script load error')) };
        document.body.appendChild(script);
      });
    } else {
      throw new Error('no entry in module config');
    }
  }

  // start
  document.addEventListener('DOMContentLoaded', ()=>{ loadAll().catch(e=>console.error(e)); });
})();
