import { createI18n } from 'vue-i18n'
import { i18nKo } from '@/i18n/kr.js'
import { i18nEn } from '@/i18n/en.js'
import { i18nCn } from '@/i18n/cn.js'

export const i18n = createI18n({
  locale: 'ko',
  fallbackLocale: 'en',
  messages: {
    en: {...i18nEn},
    ko: {...i18nKo},
    cn: {...i18nCn}
  }
})
