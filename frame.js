(function(){
  function build(){
    const root = document.getElementById('core-frame');
    root.innerHTML = '';
    const header = document.createElement('div'); header.className='core-header';
    const controls = document.createElement('div'); controls.className='core-controls';
    const toggle = document.createElement('div'); toggle.id='theme-toggle'; toggle.title='Переключить тему';
    const knob = document.createElement('div'); knob.id='theme-knob'; toggle.appendChild(knob);
    controls.appendChild(toggle);
    header.appendChild(controls);
    const content = document.createElement('div'); content.id='core-content'; content.innerHTML='<div class=\"center-placeholder\"></div>';
    root.appendChild(header); root.appendChild(content);
    // theme logic
    let theme = localStorage.getItem('cf_theme') || window.CoreConfig.defaultTheme || 'dark';
    apply(theme);
    toggle.addEventListener('click', ()=>{ theme=(theme==='dark'?'light':'dark'); localStorage.setItem('cf_theme',theme); apply(theme); if(window.CoreEvents) window.CoreEvents.emit('themeChanged',theme); if(window.CoreNotify) window.CoreNotify.notify('Тема: '+theme,'success'); });
    function apply(t){ if(t==='light'){ document.documentElement.classList.add('light'); knob.style.transform='translateX(20px)'; } else { document.documentElement.classList.remove('light'); knob.style.transform='translateX(0)'; } }
    // CoreAPI
    window.CoreAPI = { register(name, api, cfg){ if(!name) return; window.CoreModules = window.CoreModules||{}; window.CoreModules[name]={api, cfg}; console.log('registered',name); }, get(name){ return window.CoreModules && window.CoreModules[name] ? window.CoreModules[name].api : null }, list(){ return Object.keys(window.CoreModules||{}); } };
    return {root, header, content};
  }
  document.addEventListener('DOMContentLoaded', ()=>{ window.CoreUI = build(); });
})();