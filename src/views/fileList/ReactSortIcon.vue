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
    }
  },
  props: {
    sorting: {
      type: Number,
      default: -1
    }
  }
}
</script>

<template>
  <sort-icon v-if="sorting===SORTING.NONE" />
  <sort-icon-up v-if="sorting===SORTING.ASC" />
  <sort-icon-down v-if="sorting===SORTING.DESC" />
</template>

<style scoped>

</style>
