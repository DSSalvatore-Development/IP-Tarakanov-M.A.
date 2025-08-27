import { initUI } from './ui.js';
import { loadModules } from './loader.js';
import { initEvents } from './events.js';

window.Core = {
    events: null,
    init() {
        console.log("Ядро инициализируется...");
        this.events = initEvents();
        initUI();
        loadModules();
    }
};

window.addEventListener("DOMContentLoaded", () => {
    window.Core.init();
});
