(function(){
  const NAME='Auth';
  function factory(){
    return {
      init(mountSelector){
        const mount=document.querySelector(mountSelector);
        if(!mount) throw new Error('mount not found');
        const ph=mount.querySelector('.center-placeholder'); if(ph) ph.remove();
        const slot=document.createElement('div'); slot.className='module-slot';
        const form=document.createElement('div'); form.className='auth-form';
        const input1=document.createElement('input'); input1.className='auth-input'; input1.id='login'; input1.placeholder='Логин';
        const input2=document.createElement('input'); input2.className='auth-input'; input2.id='pass'; input2.type='password'; input2.placeholder='Пароль';
        const btn=document.createElement('button'); btn.className='auth-btn'; btn.textContent='Войти';
        form.appendChild(input1); form.appendChild(input2); form.appendChild(btn); slot.appendChild(form); mount.appendChild(slot);
        // users
        let users=[]; try{ users=JSON.parse(localStorage.getItem('cf_users')||'[]'); }catch(e){ users=[]; }
        if(!Array.isArray(users)||users.length===0){ users=[{login:'Администратор',password:'1234',role:'admin',fio:'Администратор'}]; localStorage.setItem('cf_users',JSON.stringify(users)); }
        btn.addEventListener('click', ()=>{
          const login=input1.value.trim(); const pass=input2.value;
          if(!login){ CoreNotify.notify('Введите логин','error'); return; }
          if(!pass){ CoreNotify.notify('Введите пароль','error'); return; }
          if(!/^[А-Яа-яЁё0-9 ()-]+$/.test(login)){ CoreNotify.notify('Недопустимые символы','error'); return; }
          const found=users.find(u=>u.login===login && u.password===pass);
          if(!found){ CoreNotify.notify('Неверный логин или пароль','error'); return; }
          localStorage.setItem('cf_current_user', found.fio||found.login);
          CoreNotify.notify('Вход выполнен: '+(found.fio||found.login),'success');
          if(window.CoreEvents) window.CoreEvents.emit('userLoggedIn',{login:found.login,fio:found.fio});
        });
        if(window.CoreEvents) window.CoreEvents.on('themeChanged', (t)=>{ /* adapt if needed */ });
      }
    };
  }
  if(window.CoreAPI && typeof window.CoreAPI.register==='function') window.CoreAPI.register(NAME,factory(),{});
  else document.addEventListener('DOMContentLoaded', ()=>{ if(window.CoreAPI && typeof window.CoreAPI.register==='function') window.CoreAPI.register(NAME,factory(),{}); });
})();
