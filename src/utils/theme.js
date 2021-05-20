/**
 *
 * Returns true if globally preferred theme is dark and false if not.
 * @returns {boolean} Is dark mode globally preferred.
 */
const getGlobalPreference = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

/**
 *
 * Returns true if user prefers dark mode and false if not.
 * @returns {boolean} Does user prefers dark mode.
 */
const getUserPreferredTheme = () => {
  // If localStorage is available user preference is stored, return the stored value.
  if (localStorage) {
    const localPreference = localStorage.getItem('theme');
    if (localPreference) {
      return JSON.parse(localStorage.getItem('theme'));
    }
  }

  return null;
};

export const getInitialTheme = () =>
  getUserPreferredTheme() ?? { isDarkMode: getGlobalPreference(), accent: 'purple' };
