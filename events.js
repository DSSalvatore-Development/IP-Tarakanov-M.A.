(function(){
  const listeners = {};
  function on(name, fn){ (listeners[name] = listeners[name] || []).push(fn); return ()=>off(name,fn); }
  function off(name, fn){ if(!listeners[name]) return; listeners[name] = listeners[name].filter(f=>f!==fn); }
  function emit(name, data){ (listeners[name]||[]).forEach(f=>{ try{ f(data) }catch(e){console.error(e)} }) }
  window.CoreEvents = { on, off, emit };
})();