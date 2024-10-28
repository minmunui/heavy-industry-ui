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
}
</script>

<template>
  <div :data-tooltip="this.tooltipMessage" data-placement="bottom" class="react-sort-icon">
    <sort-icon v-if="sorting===SORTING.NONE"  />
    <sort-icon-up v-if="sorting===SORTING.ASC" />
    <sort-icon-down v-if="sorting===SORTING.DESC" />
  </div>
</template>

<style scoped>
div.react-sort-icon {
  width: 100%;
  height: 100%;
  border-bottom: none;

  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
}
</style>
