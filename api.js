(function(){
  // Core API: registry, notifications, user state
  const registry = {}; // name -> {config, api}
  const ui = {}; // will be set after build

  function notify(text, type='info', timeout=4500){
    if(!ui.notifications) return console.log('notify:',text);
    const el = document.createElement('div');
    el.className = 'core-notice ' + (type==='error'?'notice-error': type==='success'?'notice-success':'notice-info');
    el.textContent = text;
    ui.notifications.appendChild(el);
    setTimeout(()=>{ try{ el.remove(); }catch(e){} }, timeout);
  }

  function registerModule(name, apiObj, config){
    if(!name) return;
    registry[name] = {api: apiObj, config: config || {} };
    console.log('Core: module registered', name);
  }

  function getModule(name){ return registry[name] ? registry[name].api : null; }
  function listModules(){ return Object.keys(registry); }

  function setUI(obj){ ui.root = obj.root; ui.content = obj.content; ui.notifications = obj.notifications; ui.header = obj.header; }

  // expose global API
  window.Core = {
    registerModule,
    getModule,
    listModules,
    notify,
    setUI,
    _registry: registry,
    _ui: ui
  };
})();