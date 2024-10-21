<script>
import api from '../../api/api.js'
import FileItem from '@/views/fileList/FileItem.vue'
import FileListHeader from '@/views/fileList/FileListHeader.vue'
import { SORTING } from '@/utils/constants.js'

export default {
  components: { FileListHeader, FileItem },
  data() {
    return {
      headerPinned: false,
      scrollHide: true,
      scrollY: 0,
      lastScrollY: 0,
      dataList: [],
      sorting: {
        name : SORTING.NONE,
        date : SORTING.NONE
      },
      filter: {

      }
    }
  },
  mounted() {
    api.getDataList({}).then(dataList => {
      this.dataList = dataList
    })
  },
  i18n: {
    ko: {
      'Index': '번호',
      'Data name': '데이터 이름',
      'Size': '크기',
      'Date': '날짜',
      'Status 1': '1단계 정합',
      'Status 2': '2단계 정합',
      'Filter': '필터'
    }
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = 'ko'
    },
    changeSorting(columnName) {
      this.sorting[columnName] = (this.sorting[columnName] + 1) % 3
    }
  },
  computed: {}
}
</script>

<template>
  <div class="data-list">
    <div class="header-wrapper">
      <table class="data-list__header">
        <file-list-header :changeSorting="this.changeSorting" :sorting="this.sorting"/>
        <tbody>
        <file-item v-for="(data, index) in this.dataList" :file="{...data, index}" :key="index">
        </file-item>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>


th {
  text-align: center;
  width: auto;
  white-space: nowrap;
}

.data-list {
  width: var(--global-width);
}

button {
  border : none;
}
</style>
