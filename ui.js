// UI функции ядра
window.UI = {
  showNotification(title, message) {
    const note = document.createElement("div");
    note.className = "notification";
    note.innerHTML = `<strong>${title}</strong>: ${message}`;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 4000);
  }
};
