<script>
export default {
  methods: {
    changeLanguage() {
      this.$i18n.locale = 'ko'
    }
  }
}
</script>

<template>
<div class="file-list">
  {{ $t("Hello world")}}
  <button @click="this.changeLanguage">
    click
  </button>
</div>
</template>

<style scoped>

</style>
