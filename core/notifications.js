export function notify(message, type="info") {
    const frame = document.querySelector(".frame");
    if (!frame) return;

    const note = document.createElement("div");
    note.className = "notification " + type;
    note.textContent = message;

    Object.assign(note.style, {
        position: "absolute",
        bottom: "10px",
        right: "10px",
        background: type === "error" ? "#e74c3c" : "#3498db",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "6px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        opacity: "0",
        transition: "opacity 0.3s ease"
    });

    frame.appendChild(note);

    setTimeout(() => { note.style.opacity = "1"; }, 50);
    setTimeout(() => { note.style.opacity = "0"; setTimeout(() => note.remove(), 500); }, 3000);
}
