(function(){
  // Builds header, content area and notifications container
  function buildUI(){
    const root = document.getElementById('core-frame');
    root.innerHTML = '';
    const header = document.createElement('div');
    header.className = 'core-header';
    header.innerHTML = '<div class="core-title">Кассовый фрейм — ИП Тараканов М.А.</div><div id="core-user" style="color:var(--muted)"></div>';
    const content = document.createElement('div');
    content.id = 'core-content';
    content.innerHTML = '<div class="center-placeholder">Фрейм готов к загрузке модулей</div>';
    const notifications = document.createElement('div');
    notifications.className = 'core-notifications';
    root.appendChild(header);
    root.appendChild(content);
    root.appendChild(notifications);
    return {root, header, content, notifications};
  }

  window.CoreUI_build = buildUI;
})();
