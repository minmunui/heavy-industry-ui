<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMenuUp } from '@mdi/js';

export default {
  name: "sort-icon-up",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiMenuUp,
    }
  }
}
</script>
