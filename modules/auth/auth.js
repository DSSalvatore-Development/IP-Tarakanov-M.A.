(function(){
  const MODULE = 'Auth';
  function createAPI(){
    return {
      init(mountSelector){
        const mount = document.querySelector(mountSelector);
        if(!mount) throw new Error('Mount not found: '+ mountSelector);
        // clear placeholder
        const ph = mount.querySelector('.center-placeholder'); if(ph) ph.remove();
        // container centered
        const wrapper = document.createElement('div'); wrapper.className='module-slot auth-wrapper';
        const card = document.createElement('div'); card.className='auth-card';
        card.innerHTML = '<div class="auth-title">Вход</div><div class="auth-form"><input class="auth-input" id="login" placeholder="Логин (русские буквы и цифры)"><input class="auth-input" id="pass" placeholder="Пароль" type="password"><div class="auth-actions"><button class="auth-btn" id="btn">Войти</button></div><div class="auth-hint">Администратор: Администратор / 1234</div></div>';
        wrapper.appendChild(card);
        mount.appendChild(wrapper);
        // load users
        let users = []; try{ users = JSON.parse(localStorage.getItem('cf_users')||'[]'); }catch(e){ users = []; }
        if(!Array.isArray(users) || users.length===0){ users = [{login:'Администратор', password:'1234', role:'admin', fio:'Администратор'}]; localStorage.setItem('cf_users', JSON.stringify(users)); }
        const btn = card.querySelector('#btn');
        btn.addEventListener('click', ()=>{
          const login = card.querySelector('#login').value.trim();
          const pass = card.querySelector('#pass').value;
          if(!login){ CoreNotify.notify('Введите логин', 'error'); return; }
          if(!pass){ CoreNotify.notify('Введите пароль', 'error'); return; }
          if(!/^[А-Яа-яЁё0-9 ()-]+$/.test(login)){ CoreNotify.notify('Логин содержит недопустимые символы', 'error'); return; }
          const found = users.find(u=>u.login===login && u.password===pass);
          if(!found){ CoreNotify.notify('Неверный логин или пароль', 'error'); return; }
          localStorage.setItem('cf_current_user', found.fio || found.login);
          const headerUser = document.getElementById('core-user'); if(headerUser) headerUser.textContent = found.fio || found.login;
          CoreNotify.notify('Вход выполнен: '+(found.fio||found.login), 'success');
        });
        // theme reaction (optional)
        if(window.CoreEvents) window.CoreEvents.on('themeChanged', (t)=>{ /* modules can adapt styles here if needed */ });
      }
    };
  }
  // register with core API (CoreAPI.register created by frame.js)
  if(window.CoreAPI && typeof window.CoreAPI.register === 'function'){
    window.CoreAPI.register(MODULE, createAPI(), {});
  } else {
    // if CoreAPI not yet ready, wait a bit
    document.addEventListener('DOMContentLoaded', ()=>{ if(window.CoreAPI && typeof window.CoreAPI.register === 'function') window.CoreAPI.register(MODULE, createAPI(), {}); });
  }
})();
