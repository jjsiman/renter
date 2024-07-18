import { createI18n } from 'vue-i18n';

export const i18n = () => createI18n({
  legacy: false,
  numberFormats: {
    'en-US': {
      currency: {
        style: 'currency', currency: 'USD', notation: 'standard',
      },
      decimal: {
        style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2,
      },
      percent: {
        style: 'percent', useGrouping: false,
      },
    },
  },
});
