import { createI18n } from 'vue-i18n'
import { i18nKr } from '@/i18n/ko.js'
import { i18nEn } from '@/i18n/en.js'

export const i18n = createI18n({
  locale: 'kr',
  fallbackLocale: 'en',
  message: {
    en: {...i18nEn},
    kr: {...i18nKr}
  }
})
