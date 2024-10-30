<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiRefresh } from '@mdi/js';

export default {
  name: "refresh-icon",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiRefresh,
    }
  }
}
</script>
