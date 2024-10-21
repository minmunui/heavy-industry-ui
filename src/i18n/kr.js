import fileList from '@/views/fileList/FileList.vue'
import fileItem from '@/views/fileList/FileItem.vue'
import statusButton from '@/views/fileList/StatusButton.vue'

export const i18nKo = {
  'Hello world': '안녕 세상아',
  ...fileList.i18n.ko,
  ...fileItem.i18n.ko,
  ...statusButton.i18n.ko
}
