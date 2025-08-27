// Ядро проекта
window.Core = {
  init() {
    console.log("Ядро инициализировано.");
    UI.showNotification("Ядро", "Инициализация завершена.");
    ModuleLoader.loadModules();
  }
};
document.addEventListener("DOMContentLoaded", Core.init);
