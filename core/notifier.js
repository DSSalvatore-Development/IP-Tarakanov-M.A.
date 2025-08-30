(function(){
  function notify(text,type='info',timeout=4500){
    const root = document.querySelector('.core-notifications') || createRoot();
    const el = document.createElement('div');
    el.className = 'core-notice ' + (type==='error'?'notice-error': type==='success'?'notice-success':'notice-info');
    el.textContent = text;
    el.addEventListener('click', ()=>{ try{ el.remove(); }catch(e){} });
    root.appendChild(el);
    if(timeout>0) setTimeout(()=>{ try{ el.remove(); }catch(e){} }, timeout);
    return el;
  }
  function createRoot(){
    const n = document.createElement('div'); n.className='core-notifications'; document.body.appendChild(n); return n;
  }
  window.CoreNotify={notify};
})();
