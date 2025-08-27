// Ядро проекта
window.Core = {
  modules: {},
  init: function() {
    CoreUtils.log("Ядро инициализировано");
    CoreUtils.notify("Ядро запущено");
    this.loadModules();
  },
  loadModules: async function() {
    try {
      const resp = await fetch("modules/modules.json");
      if (!resp.ok) {
        CoreUtils.log("Файл modules.json не найден — модулей нет");
        return;
      }
      const list = await resp.json();
      for (let m of list) {
        try {
          await import("./modules/"+m+"/index.js");
          CoreUtils.log("Модуль загружен:", m);
          CoreUtils.notify("Модуль "+m+" успешно загружен");
        } catch(e) {
          CoreUI.showError("Ошибка загрузки модуля "+m+": "+e.message);
        }
      }
    } catch(e) {
      CoreUI.showError("Не удалось загрузить список модулей: "+e.message);
    }
  }
};
window.addEventListener("DOMContentLoaded", ()=>Core.init());
