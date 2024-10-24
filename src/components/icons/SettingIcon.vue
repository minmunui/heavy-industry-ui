<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCog } from '@mdi/js';

export default {
  name: "setting-icon",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiCog,
    }
  }
}
</script>
