export const getInitialDarkMode = (): boolean => {
    return localStorage.getItem('darkMode') === 'true';
};

export const setDarkModeInLocalStorage = (isDarkMode: boolean) => {
    localStorage.setItem('darkMode', String(isDarkMode));
};