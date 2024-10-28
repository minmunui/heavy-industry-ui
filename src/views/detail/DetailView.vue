<script>
import api, { BASE_URL } from '@/api/api.js'
import axios from 'axios'

export default {
  i18n: {
    ko: {
      'Loading...': '불러오는 중',
      'File Name': '파일 이름',
      'File Download': '파일 다운로드'
    },
    cn: {
      'Loading...': '加载中',
      'File Name': '文件名',
      'File Download': '文件下载'
    }
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
      images: [],
      error: null
    }
  },
  methods: {
    getImage() {
      api.getStitchedImage(this.$props.fileName, this.$props.step).then((res) => {
        console.log('res', res)
        this.images = res.data
      }).catch((err) => {
        this.error = err
      }).finally(() => {
        this.isLoading = false
      })
    },
    async downloadImage() {
      try {
        const response = await axios.get(BASE_URL + `stitched_image/download/${this.id}`, {
          responseType: 'blob'
        })
        const url = window.URL.createObjectURL(new Blob([response.data.url]))
        const link = document.createElement('a')
        link.href = url

        link.setAttribute('download', `${this.id}.png`)
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error(error)
        alert('파일 다운로드에 실패했습니다.')
      }
    }
  }
}
</script>

<template>
  <div class="detail-view">
    <header class="image-info">
      <span class="file-name">{{ this.$t('File Name') }} : {{ this.$props.fileName }}</span><span
      class="file-step">{{ this.$t('Step') }} : {{ this.$props.step }}</span>
    </header>
    <div  class="loading skeleton" v-if="isLoading">{{ $t('Loading...') }}</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="step==='1'" class="image-viewer">
      <button @click = "this.downloadImage">{{ $t('File Download') }}</button>
    </div>

    <div v-else-if="step==='2'" class="image-viewer">
      <a :href="this.images.url">+{{ $t('File Download') }}</a>
    </div>
  </div>
</template>

<style scoped>
.detail-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .image-info {
    top: 0;
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

.loading {
  padding : 1rem;
  margin: 4rem 0;
  text-align: center;
  font-size: 1.4rem;
}
</style>
