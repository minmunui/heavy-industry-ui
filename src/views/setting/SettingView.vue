<script>
import LanguageSetting from '@/views/setting/LanguageSetting.vue'

export default {
  name: 'SettingView',
  components: { LanguageSetting },
  data() {
    return {
      // data
    }
  }
}
</script>

<template>
  <main>
    <language-setting />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  max-width: 800px;
}
</style>
