import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        // Add other translations here
      },
    },
    ar: {
      translation: {
        welcome: "مرحبا",
        // Add other translations here
      },
    },
  },
  lng: localStorage.getItem('language') || 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
