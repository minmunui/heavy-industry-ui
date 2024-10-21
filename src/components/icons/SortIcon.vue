<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMenuSwap } from '@mdi/js';

export default {
  name: "sort-icon",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiMenuSwap,
    }
  }
}
</script>
