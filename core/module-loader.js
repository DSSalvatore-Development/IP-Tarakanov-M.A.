// Система загрузки модулей
window.ModuleLoader = {
  async loadModules() {
    try {
      const response = await fetch("modules/modules.json");
      const modules = await response.json();
      for (const mod of modules) {
        await this.loadModule(mod);
      }
    } catch (e) {
      console.warn("Модули не загружены:", e);
      UI.showNotification("Система", "Нет доступных модулей.");
    }
  },
  async loadModule(mod) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `modules/${mod}/index.js`;
      script.onload = () => {
        if (window[mod] && Diagnostics.checkModule(mod, window[mod])) {
          window[mod].init();
          UI.showNotification("Модуль", `${mod} успешно загружен`);
          resolve();
        } else {
          reject(new Error(`Модуль ${mod} не инициализирован`));
        }
      };
      script.onerror = () => reject(new Error(`Ошибка загрузки ${mod}`));
      document.body.appendChild(script);
    });
  }
};
