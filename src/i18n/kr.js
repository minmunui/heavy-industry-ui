import fileList from '@/views/FileList.vue'
import fileItem from '@/views/FileItem.vue'

export const i18nKo = {
  'Hello world': '안녕 세상아',
  ...fileList.i18n.ko,
  ...fileItem.i18n.ko
}
