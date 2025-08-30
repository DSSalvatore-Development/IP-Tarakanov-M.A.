(function(){
  function build(){
    const root = document.getElementById('core-frame');
    root.innerHTML = '';
    const header = document.createElement('div'); header.className='core-header';
    const title = document.createElement('div'); title.className='core-title'; title.textContent='';
    const controls = document.createElement('div'); controls.className='core-controls';
    // theme toggle
    const toggle = document.createElement('div'); toggle.id='theme-toggle'; toggle.title='Переключить тему';
    const knob = document.createElement('div'); knob.id='theme-knob'; toggle.appendChild(knob);
    controls.appendChild(toggle);
    header.appendChild(title); header.appendChild(controls);
    const content = document.createElement('div'); content.id='core-content'; content.innerHTML = '<div class="center-placeholder"></div>';
    const notices = document.createElement('div'); notices.className='core-notifications';
    root.appendChild(header); root.appendChild(content); root.appendChild(notices);

    // theme toggle logic
    let theme = localStorage.getItem('cf_theme') || window.CoreConfig.defaultTheme || 'dark';
    applyTheme(theme);
    toggle.addEventListener('click', ()=>{
      theme = (theme==='dark')?'light':'dark';
      localStorage.setItem('cf_theme', theme);
      applyTheme(theme);
      // broadcast to modules
      if(window.CoreEvents) window.CoreEvents.emit('themeChanged', theme);
      if(window.CoreNotify) window.CoreNotify.notify('Тема изменена: '+theme, 'success');
    });

    function applyTheme(t){
      if(t==='light'){ document.documentElement.classList.add('light'); knob.style.left='23px'; }
      else { document.documentElement.classList.remove('light'); knob.style.left='3px'; }
    }

    // expose mount points
    window.CoreMount = { contentSelector: '#core-content', headerSelector: header };
    // expose api for modules
    window.CoreAPI = {
      register(name, api, cfg){ if(!name) return; window.CoreModules = window.CoreModules || {}; window.CoreModules[name] = {api, cfg}; console.log('Module registered',name); },
      get(name){ return window.CoreModules && window.CoreModules[name] ? window.CoreModules[name].api : null; },
      list(){ return Object.keys(window.CoreModules||{}); }
    };

    return {root, header, content, notices, toggle};
  }

  // init on DOM ready
  document.addEventListener('DOMContentLoaded', ()=>{
    const ui = build();
    window.CoreUI = ui;
    // ensure theme change events pass to modules via CoreEvents
    if(window.CoreEvents){
      window.CoreEvents.on('themeChanged', (t)=>{
        // let modules handle via their own handlers if they registered
      });
    }
  });
})();