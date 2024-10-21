import fileList from '@/views/fileList/FileList.vue'
import fileItem from '@/views/fileList/FileItem.vue'
import statusButton from '@/views/fileList/StatusButton.vue'
import fileListHeader from '@/views/fileList/FileListHeader.vue'

export const i18nKo = {
  ...fileList.i18n.ko,
  ...fileItem.i18n.ko,
  ...statusButton.i18n.ko,
  ...fileListHeader.i18n.ko
}
