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
    this.getDataList()
    this.timer = setInterval(() => {
      this.getDataList()
    }, this.$refreshInterval * 1000)
  },
  methods: {
    sort() {
      if (this.sorting.name === SORTING.NONE && this.sorting.time === SORTING.NONE) {
        this.sortedDataList = this.dataList
        return
      }
      this.sortedDataList = this.dataList.slice().sort((a, b) => {
          if (this.sorting.name === SORTING.ASC) {
            return a.name > b.name ? 1 : -1
          } else if (this.sorting.name === SORTING.DESC) {
            return a.name < b.name ? 1 : -1
          }
          if (this.sorting.time === SORTING.ASC) {
            return a.time > b.time ? 1 : -1
          } else if (this.sorting.time === SORTING.DESC) {
            return a.time < b.time ? 1 : -1
          }
        }
      )
    },
    getDataList() {
      api.getDataList().then(dataList => {
        this.dataList = dataList.data
      })
    },
    changeSorting(columnName) {
      this.sorting[columnName] = (this.sorting[columnName] + 1) % 3
    }
  },
  watch: {
    'this.$refreshInterval': function() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.getDataList()
      }, this.$refreshInterval * 1000)
    },
    sorting: {
      handler() {
        this.sort()
      },
      deep: true
    },
    dataList() {
      this.sort()
    }
  }
}
</script>

<template>
  <div class="data-list">
    <div class="table-wrapper">
      <table class="data-list__header">
        <file-list-header :changeSorting="this.changeSorting" :sorting="this.sorting"
                          v-model:name="this.filter.name"
                          v-model:startTime="this.filter.startTime"
                          v-model:endTime="this.filter.endTime"
        />
        <tbody>
        <file-item v-for="(data, index) in this.sortedDataList" :file="{...data, index}" :key="index"
                   @changeData="() => this.getDataList()">
        </file-item>
        </tbody>
      </table>
      <div class="no-data" v-if="this.dataList.length === 0">{{ this.$t('No data') }}</div>
    </div>
  </div>
</template>

<style scoped>
.table-wrapper {
  margin-bottom: 5rem;
}

th {
  text-align: center;
  width: auto;
  white-space: nowrap;
}

.data-list {
  width: 100%;
  overflow-x: scroll;

  .table-wrapper {
    width: var(--global-width);
  }
}

button {
  border: none;
}

.no-data {
  font-size: 2rem;
  width: 100%;
  text-align: center;
}
</style>
