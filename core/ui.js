// ui.js
class CoreUI {
    constructor(frameId) {
        this.frame = document.getElementById(frameId);
        this.createNotificationArea();
    }

    createNotificationArea() {
        this.notifications = document.createElement("div");
        this.notifications.style.position = "absolute";
        this.notifications.style.top = "10px";
        this.notifications.style.right = "10px";
        this.notifications.style.zIndex = "999";
        this.frame.appendChild(this.notifications);
    }

    notify(message, type = "error") {
        const note = document.createElement("div");
        note.innerText = message;
        note.style.padding = "10px 15px";
        note.style.marginBottom = "10px";
        note.style.borderRadius = "10px";
        note.style.fontSize = "14px";
        note.style.color = "#fff";
        note.style.background = type === "error" ? "#d9534f" : "#5cb85c";
        note.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
        this.notifications.appendChild(note);
        setTimeout(() => note.remove(), 5000);
    }
}

window.CoreUI = CoreUI;
