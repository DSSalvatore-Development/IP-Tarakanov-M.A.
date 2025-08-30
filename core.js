// core.js
document.addEventListener("DOMContentLoaded", async () => {
    const ui = new CoreUI("core-frame");

    try {
        const response = await fetch("modules/modules.json");
        if (!response.ok) throw new Error("Не удалось загрузить список модулей");

        const modulesList = await response.json();

        for (const modulePath of modulesList) {
            try {
                await loadModule(modulePath, ui);
            } catch (err) {
                ui.notify(`Ошибка модуля ${modulePath}: ${err.message}`, "error");
            }
        }
    } catch (err) {
        ui.notify(`Ошибка ядра: ${err.message}`, "error");
    }
});

async function loadModule(modulePath, ui) {
    const configRes = await fetch(`${modulePath}/${modulePath.split('/').pop()}.module.json`);
    if (!configRes.ok) throw new Error("Файл конфигурации не найден");

    const config = await configRes.json();

    if (config.style) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${modulePath}/${config.style}`;
        document.head.appendChild(link);
    }

    if (config.entry) {
        const script = document.createElement("script");
        script.src = `${modulePath}/${config.entry}`;
        script.onload = () => {
            if (window[config.name]) {
                try {
                    new window[config.name](config.mount || "#core-frame");
                    ui.notify(`Модуль ${config.name} загружен`, "success");
                } catch (err) {
                    throw new Error(`Ошибка инициализации: ${err.message}`);
                }
            } else {
                throw new Error(`Класс ${config.name} не найден`);
            }
        };
        document.body.appendChild(script);
    }
}