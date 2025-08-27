import { validateModule } from './validator.js';

export async function loadModules() {
    try {
        // ⚠️ В реальном окружении GitHub Pages нет доступа к файловой системе,
        // здесь должен быть список модулей из JSON или API.
        // Для теста заглушка:
        const modules = [];

        for (const mod of modules) {
            if (await validateModule(mod)) {
                import(`../modules/${mod}/main.js`).then(m => m.init && m.init());
            }
        }
    } catch (err) {
        console.error("Ошибка загрузки модулей:", err);
    }
}
