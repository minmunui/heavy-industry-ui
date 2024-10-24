<script>
import api from '@/api/api.js'

export default {
  i18n: {
    ko: { 'Loading...': '불러오는 중' },
    cn: { 'Loading...': '加载中' },
  },
  name: 'detail-panel',
  components: {},
  props: {
    fileName: {
      type: String,
      required: true
    },
    step: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.getImage(this.$props.fileName, this.$props.step)
  },
  data() {
    return {
      isLoading: true,
      image: null,
      error: null
    }
  },
  methods: {
    getImage() {
      api.getStitchedImage(this.$props.fileName, this.$props.step).then((res) => {
        this.image = res.data
      }).catch((err) => {
        this.error = err
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<template>
  <div class="detail-view">
    <div v-if="isLoading">{{ $t('Loading...') }}</div>
    {{ this.$props.fileName }}
  </div>
</template>

<style scoped>

</style>
