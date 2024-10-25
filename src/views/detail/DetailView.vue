<script>
import api from '@/api/api.js'

export default {
  i18n: {
    ko: { 'Loading...': '불러오는 중',
      'File Name': '파일 이름',
    },
    cn: { 'Loading...': '加载中',
      'File Name': '文件名',
    },
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
        console.log("res", res)
        this.image = res
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
    <header class="image-info">
      <span class="file-name">{{this.$t('File Name')}} : {{this.$props.fileName}}</span><span class="file-step">{{this.$t('Step')}} : {{this.$props.step}}</span>
    </header>
    <div v-if="isLoading">{{ $t('Loading...') }}</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="image-viewer">
      <img :src="image" alt="stitched image" />
    </div>
  </div>
</template>

<style scoped>
.detail-view {
  width: 100%;

  .image-info {
    top:0;
    position: fixed;
    width: 100%;
    display: flex;
    padding: 0.25rem;
    gap: 1rem;
    span {
      white-space: nowrap;
      color: var(--pico-h1-color);
    }
  }
}

.image-viewer {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}
</style>
