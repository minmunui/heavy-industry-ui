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
      sortedDataList: [],
      sorting: {
        name: SORTING.NONE,
        time: SORTING.NONE
      },
      filter: {
        name: '',
        startTime: '',
        endTime: ''
      },
      timer: null
    }
  },
  mounted() {
    // 2000ms마다 데이터를 가져옴
    this.getDataList()
    this.timer = setInterval(() => {
      this.getDataList()
    }, this.$refreshInterval * 1000)
  },
  i18n: {
    ko: {
      'Index': '번호',
      'Data name': '데이터 이름',
      'Size': '크기',
      'Date': '날짜',
      'Status 1': '1단계 정합',
      'Status 2': '2단계 정합',
      'Filter': '필터적용'
    },
    cn: {
      'Index': '编号',
      'Data name': '数据名称',
      'Size': '大小',
      'Date': '日期',
      'Status 1': '1阶段匹配',
      'Status 2': '2阶段匹配',
      'Filter': '过滤'
    }
  },
  methods: {
    getDataList() {
      api.getDataList().then(dataList => {
        this.dataList = dataList.data
        this.sortedDataList = dataList.data
      })
    },
    changeSorting(columnName) {
      this.sorting[columnName] = (this.sorting[columnName] + 1) % 3
      if (this.sorting[columnName] === SORTING.NONE) {
        this.sortedDataList = this.dataList
        for (const key in this.sorting) {
          if (key !== columnName) {
            this.sorting[key] = SORTING.NONE
          }
        }
        return
      }

      this.sortedDataList = this.dataList.slice().sort((a, b) => {
        if (this.sorting[columnName] === SORTING.ASC) {
          return a[columnName] > b[columnName] ? 1 : -1
        } else {
          return a[columnName] < b[columnName] ? 1 : -1
        }
      })
    },
    requestFilter() {
      api.getDataList(this.filter).then(res => {
        this.dataList = res.data
        this.sortedDataList = res.data
      })
    }
  },
  computed: {
    // filteredDataList() {
    //   return this.dataList.filter(data => {
    //     return data.name.includes(this.filter.name) &&
    //       data.time >= this.filter.startTime &&
    //       data.time <= this.filter.endTime
    //   })
    // }
  },
  watch : {
    "this.$refreshInterval": function() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.getDataList()
      }, this.$refreshInterval * 1000)
    }
  }
}
</script>

<template>
  <div class="data-list">
    <div class="table-wrapper">
      <table class="data-list__header">
        <file-list-header :changeSorting="this.changeSorting" :sorting="this.sorting" :filter="this.filteredDataList"
                          v-model:name="this.filter.name"
                          v-model:startTime="this.filter.startTime"
                          v-model:endTime="this.filter.endTime"
                          @filter="this.requestFilter"
        />
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
  width: 100%;
  margin: auto;
  overflow-x: scroll;

  .table-wrapper {
    width: var(--global-width);
  }
}

button {
  border: none;
}
</style>
