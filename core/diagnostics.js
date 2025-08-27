// Проверка корректности модулей
window.Diagnostics = {
  checkModule(name, module) {
    try {
      if (typeof module.init !== "function") {
        throw new Error("Нет функции init");
      }
      console.log(`Модуль ${name} корректен.`);
      return true;
    } catch (err) {
      UI.showNotification("Ошибка модуля", `${name}: ${err.message}`);
      return false;
    }
  }
};
