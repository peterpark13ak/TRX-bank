const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['pe', 'hd', 'zh', 'pt'],
  fallbackLng: 'en',
  localeSubpaths: {
    en: 'en',
    pe: 'pe',
    hd: 'hd',
    pt: 'pt',
    zh: 'zh',
  },
});
