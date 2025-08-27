// UI-функции ядра
window.CoreUI = {
  showError: function(msg) {
    CoreUtils.notify("Ошибка: " + msg, "error");
  },
  showInfo: function(msg) {
    CoreUtils.notify(msg, "info");
  }
};