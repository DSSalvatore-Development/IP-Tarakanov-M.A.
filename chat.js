// Пример простого модуля Chat
class Chat {
    constructor(mountSelector) {
        const container = document.querySelector(mountSelector);
        if (!container) throw new Error("Контейнер не найден");

        this.element = document.createElement("div");
        this.element.className = "chat-module";
        this.element.innerHTML = `
            <h2>Чат</h2>
            <div class="messages"></div>
            <input type="text" placeholder="Введите сообщение..." />
        `;
        container.appendChild(this.element);
    }
}

window.Chat = Chat;
