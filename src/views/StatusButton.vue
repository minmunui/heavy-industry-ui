<script>
import { DATA_STATUS } from '@/utils/constants.js'

export default {
  props: {
    status: {
      type: Object,
      required: true,
      default() {
        return {
          status: DATA_STATUS.ERROR,
          data: "Api error"
        }
      }
    }
  }
}
</script>

<template>
  <button>
    안녕
  </button>
</template>

<style scoped lang="scss">
@use "pico";



</style>
