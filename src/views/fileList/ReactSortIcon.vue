<script>
import { SORTING } from '@/utils/constants.js'
import SortIconUp from '@/components/icons/SortIconUp.vue'
import SortIcon from '@/components/icons/SortIcon.vue'
import SortIconDown from '@/components/icons/SortIconDown.vue'

export default {
  name: 'react-sort-icon',
  components: { SortIconDown, SortIcon, SortIconUp },
  computed: {
    SORTING() {
      return SORTING
    },
    tooltipMessage() {
      if (this.sorting === SORTING.NONE) {
        return this.$t('Default')
      } else if (this.sorting === SORTING.ASC) {
        return this.$t('Ascending')
      } else if (this.sorting === SORTING.DESC) {
        return this.$t('Descending')
      }
    }
  },
  props: {
    sorting: {
      type: Number,
      default: -1
    }
  },
  i18n: {
    ko: {
      Default: '기본값',
      Ascending: '오름차순',
      Descending: '내림차순'
    },
    cn: {
      Default: '默认',
      Ascending: '升序',
      Descending: '降序'
    }
  },
}
</script>

<template>
  <div :data-tooltip="this.tooltipMessage" data-placement="bottom">
    <sort-icon v-if="sorting===SORTING.NONE"  />
    <sort-icon-up v-if="sorting===SORTING.ASC" />
    <sort-icon-down v-if="sorting===SORTING.DESC" />
  </div>
</template>

<style scoped>
div {
  width: 100%;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
}
</style>
