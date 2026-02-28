import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import sq from './locales/sq/translation.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, sq: { translation: sq } },
  lng: localStorage.getItem('tregtia_lang') || 'sq',
  fallbackLng: 'sq',
  interpolation: { escapeValue: false },
  initImmediate: false,
});

export default i18n;
