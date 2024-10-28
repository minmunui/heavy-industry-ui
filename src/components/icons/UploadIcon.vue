<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiUpload } from '@mdi/js';

export default {
  name: "upload-icon",
  components: {
    SvgIcon
  },
  data() {
    return {
      path: mdiUpload,
    }
  }
}
</script>
