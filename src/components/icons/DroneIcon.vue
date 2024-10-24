<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiQuadcopter } from '@mdi/js';

export default {
  name: "drone-icon",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiQuadcopter,
    }
  }
}
</script>
