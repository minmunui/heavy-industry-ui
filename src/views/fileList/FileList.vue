<script>
import api from '../../api/api.js'
import FileItem from '@/views/fileList/FileItem.vue'
import MyCoolComponent from '@/components/icons/SortIcon.vue'
import SortIcon from '@/components/icons/SortIcon.vue'

export default {
  components: { SortIcon, MyCoolComponent, FileItem },
  data() {
    return {
      headerPinned: false,
      scrollHide: true,
      scrollY: 0,
      lastScrollY: 0,
      dataList: []
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
  },
  computed: {}
}
</script>

<template>
  <div class="data-list">
    <div class="header-wrapper">
      <table class="data-list__header">
        <thead>
        <tr class="data-list__column-name">
          <th>
            {{ $t('Index') }}
          </th>
          <th class="data-name">
            <div class="header-cell">
              {{ $t('Data name') }}
              <button class="outline secondary sorting">
                <sort-icon/>
              </button>
            </div>
          </th>
          <th class="data-size">
            {{ $t('Size') }}
          </th>
          <th class="data-date">
            <div class="header-cell">
              {{ $t('Date') }}
              <button class="outline secondary sorting">
                <sort-icon/>
              </button>
            </div>
          </th>
          <th class="status-1">
            {{ $t('Status 1') }}
          </th>
          <th class="status-2">
            {{ $t('Status 2') }}
          </th>
        </tr>
        <tr>
          <th>
            {{ $t('Filter') }}
          </th>
          <th>
            <input class="name-filter" type="search" name="search" id="search" aria-label="Search">
          </th>
          <th>
          </th>
          <th class="date-filter">
            <input class="date-filter" type="datetime-local" name="date" id="date" aria-label="Datetime local"> ~
            <input class="date-filter" type="datetime-local" name="date" id="date" aria-label="Datetime local">
          </th>
          <th>

          </th>

          <th>

          </th>
        </tr>
        </thead>
        <tbody>
        <file-item v-for="(data, index) in this.dataList" :file="{...data, index}" :key="index">

        </file-item>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.header-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
}

th {
  text-align: center;
  width: auto;
  white-space: nowrap;
}

.data-list {
  width: var(--global-width);
}

input.date-filter {
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
  height: auto;
  width: 45%;
  margin: 0;
}

div.date-filter {
  display: flex;
  justify-content: center;
  align-items: center;

}

.name-filter {
  padding: 0.2rem 0.4rem;
  margin: 0;
  height: auto;
  font-size: 0.8rem;
}

button {
  border : none;

  &.sorting {
    padding : 0.25rem;
  }
}
</style>
