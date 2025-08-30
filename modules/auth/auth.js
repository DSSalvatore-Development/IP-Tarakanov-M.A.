(function(){
  // simple auth module registering with Core
  const MODULE_NAME = 'Auth';
  function createAuthAPI(){
    return {
      init(mountSelector){
        const mount = document.querySelector(mountSelector);
        if(!mount) throw new Error('mount not found: '+mountSelector);
        // clear placeholder
        const ph = mount.querySelector('.center-placeholder');
        if(ph) ph.remove();

        // create module slot
        const slot = document.createElement('div');
        slot.className = 'module-slot auth-box';
        slot.innerHTML = `
          <div class="auth-card">
            <div class="auth-title">Вход в систему</div>
            <div class="auth-form">
              <input class="auth-input" id="auth-login" placeholder="Логин (русские буквы и цифры)" />
              <input class="auth-input" id="auth-pass" placeholder="Пароль" type="password" />
              <div class="auth-actions">
                <button class="auth-button" id="auth-submit">Войти</button>
              </div>
              <div class="auth-small" style="margin-top:6px">Администратор: Администратор / 1234</div>
            </div>
          </div>
        `;
        mount.appendChild(slot);

        // load users from localStorage (if none, create default admin)
        let users = [];
        try{ users = JSON.parse(localStorage.getItem('cf_users')||'[]'); }catch(e){ users = []; }
        if(!Array.isArray(users) || users.length===0){
          users = [{login:'Администратор', password:'1234', role:'admin', fio:'Администратор'}];
          localStorage.setItem('cf_users', JSON.stringify(users));
        }

        // handlers
        const loginInput = slot.querySelector('#auth-login');
        const passInput = slot.querySelector('#auth-pass');
        const btn = slot.querySelector('#auth-submit');
        btn.addEventListener('click', ()=>{
          const login = loginInput.value.trim();
          const pass = passInput.value;
          if(!login){ Core.notify('Введите логин', 'error'); return; }
          if(!pass){ Core.notify('Введите пароль', 'error'); return; }
          // only allow Russian letters, digits, spaces and parentheses as requested
          const valid = /^[А-Яа-яЁё0-9 ()-]+$/.test(login);
          if(!valid){ Core.notify('Логин содержит недопустимые символы', 'error'); return; }
          const found = users.find(u=>u.login===login && u.password===pass);
          if(!found){ Core.notify('Неверный логин или пароль', 'error'); return; }
          // success - set current user and update header
          localStorage.setItem('cf_current_user', found.fio || found.login);
          const headerUser = document.getElementById('core-user');
          if(headerUser) headerUser.textContent = found.fio || found.login;
          Core.notify('Вход выполнен: '+(found.fio||found.login),'success');
          // remove auth module from UI after login (we leave it; could close or replace)
        });
      }
    };
  }

  Core.registerModule(MODULE_NAME, createAuthAPI(), {info:'auth module'});
})();
