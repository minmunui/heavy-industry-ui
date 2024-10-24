import fileList from '@/views/fileList/FileList.vue'
import fileItem from '@/views/fileList/FileItem.vue'
import statusButton from '@/views/fileList/StatusButton.vue'
import fileListHeader from '@/views/fileList/FileListHeader.vue'
import detailView from '@/views/detail/DetailView.vue'
import mainHeader from '@/components/MainHeader.vue'
import reactSortIcon from '@/views/fileList/ReactSortIcon.vue'

export const i18nKo = {
  ...fileList.i18n.ko,
  ...fileItem.i18n.ko,
  ...statusButton.i18n.ko,
  ...fileListHeader.i18n.ko,
  ...detailView.i18n.ko,
  ...mainHeader.i18n.ko,
  ...reactSortIcon.i18n.ko
}
