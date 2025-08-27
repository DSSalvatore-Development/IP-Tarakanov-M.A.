// Вспомогательные функции ядра
window.CoreUtils = {
  log: function(...args) {
    console.log("[Core]", ...args);
  },
  notify: function(message, type="info") {
    const wrap = document.getElementById("notifications");
    const el = document.createElement("div");
    el.className = "notification " + type;
    el.innerText = message;
    wrap.appendChild(el);
    setTimeout(()=>el.remove(), 4000);
  }
};