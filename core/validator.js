export async function validateModule(name) {
    try {
        // Проверка существования модуля (заглушка для GitHub Pages)
        console.log(`Проверка модуля: ${name}`);
        return true;
    } catch (err) {
        console.error(`Ошибка валидации модуля ${name}:`, err);
        return false;
    }
}
