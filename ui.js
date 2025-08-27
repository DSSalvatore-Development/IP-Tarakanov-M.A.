export function initUI() {
    const app = document.getElementById("app");
    const frame = document.createElement("div");
    frame.className = "frame";
    frame.innerHTML = `<h2 style="text-align:center;">Ядро запущено</h2>`;
    app.appendChild(frame);
}
