/* =========================================================
   NeotrixUI — THEMES.JS
   Анти-миготіння + авто-вибір теми + перемикач
   ---------------------------------------------------------
   Принцип:
   - Тема визначається ДО рендера сторінки
   - Клас теми додається до <html>
   - Вибір користувача зберігається в localStorage
   - Плавність вмикається після DOMContentLoaded
   ========================================================= */
/* ---------------------------------------------------------
   1. Визначення теми ДО рендера сторінки
   ---------------------------------------------------------
   Виконується одразу, без очікування DOM.
   Має бути підключено в <head> ПЕРЕД CSS.
   --------------------------------------------------------- */
(function() {
    const root = document.documentElement;
    const STORAGE_KEY = 'neotrix-theme';
    // Якщо користувач вже вибрав тему — застосовуємо її
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
        applyThemeClass(saved);
        return;
    }
    // Якщо теми немає — визначаємо за часом доби
    const hour = new Date().getHours();
    const isNight = (hour >= 19 || hour < 7);
    applyThemeClass(isNight ? 'dark' : 'light');
    function applyThemeClass(mode) {
        root.classList.remove('ntx-theme-light', 'ntx-theme-dark');
        if (mode === 'dark') {
            root.classList.add('ntx-theme-dark');
        } else {
            root.classList.add('ntx-theme-light');
        }
    }
})();
/* ---------------------------------------------------------
   2. Плавність теми після завантаження DOM
   ---------------------------------------------------------
   Додає клас, який вмикає CSS-переходи (див. neotrix.css)
   --------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('ntx-animate-theme');
});
/* Публічний перемикач теми */
/* Додаємо функцію оновлення іконки */
function ntxUpdateThemeIcon() {
    const btn = document.querySelector(".ntx-theme-toggle-btn span");
    if (!btn) return;
    const root = document.documentElement;
    const isDark = root.classList.contains("ntx-theme-dark");
    // Анімація зміни
    btn.classList.add("ntx-hide");
    setTimeout(() => {
        btn.textContent = isDark ? "🌙" : "☀️";
        btn.classList.remove("ntx-hide");
    }, 200);
}
/* Викликаємо після зміни теми */
function neotrixToggleTheme() {
    const root = document.documentElement;
    const STORAGE_KEY = 'neotrix-theme';
    const isDark = root.classList.contains('ntx-theme-dark');
    const next = isDark ? 'light' : 'dark';
    root.classList.remove('ntx-theme-light', 'ntx-theme-dark');
    root.classList.add(next === 'dark' ? 'ntx-theme-dark' : 'ntx-theme-light');
    localStorage.setItem(STORAGE_KEY, next);
    ntxUpdateThemeIcon();
}
/* Оновлюємо іконку після завантаження сторінки */
window.addEventListener("DOMContentLoaded", () => {
    document.documentElement.classList.add("ntx-animate-theme");
    ntxUpdateThemeIcon();
});
