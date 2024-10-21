<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMenuDown } from '@mdi/js';

export default {
  name: "sort-icon-down",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiMenuDown,
    }
  }
}
</script>
