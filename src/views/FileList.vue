<script>
export default {
  i18n: {
    ko: {
      'Data name': '데이터 이름',
      'Size': '크기',
      'Date': '날짜',
      'Status': '상태',
    }
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = 'ko'
    }
  }
}
</script>

<template>
<div class="data-list">
  <header class="data-list__header">
    <h3 class="data-name">
      {{ $t("Data name") }}
    </h3>
    <h3 class="data-size">
      {{ $t("Size") }}
    </h3>
    <h3 class="data-date">
      {{ $t("Date") }}
    </h3>
    <h3 class="buttons">
      {{ $t("Status") }}
    </h3>
  </header>
</div>
</template>

<style lang="scss" scoped>
.data-list {
  width: 100%;
  &__header {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;

    h3 {
      width: 100%;
      text-align: center;
    }
  }
}

</style>
