import fileList from '@/views/fileList/FileList.vue'
import fileItem from '@/views/fileList/FileItem.vue'
import statusButton from '@/views/fileList/StatusButton.vue'
import fileListHeader from '@/views/fileList/FileListHeader.vue'
import detailView from '@/views/detail/DetailView.vue'
import mainHeader from '@/components/MainHeader.vue'

export const i18nCn = {
  ...fileList.i18n.cn,
  ...fileItem.i18n.cn,
  ...statusButton.i18n.cn,
  ...fileListHeader.i18n.cn,
  ...detailView.i18n.cn,
  ...mainHeader.i18n.cn
}
