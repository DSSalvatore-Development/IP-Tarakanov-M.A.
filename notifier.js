(function(){
  function notify(text, type='info', timeout=4500){
    const root = document.querySelector('#core-frame .core-notifications');
    if(!root){ console.log('notify:',text); return;}
    const el = document.createElement('div');
    el.className = 'core-notice ' + (type==='error'?'notice-error': type==='success'?'notice-success':'notice-info');
    el.textContent = text;
    root.appendChild(el);
    setTimeout(()=>{ try{ el.remove(); }catch(e){} }, timeout);
  }
  window.CoreNotify = { notify };
})();