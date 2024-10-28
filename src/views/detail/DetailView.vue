<template>
  <div class="detail-view">
    <header class="image-info">
      <span class="file-name">{{ this.$t('File Name') }} : {{ fileName }}</span>
      <span class="file-step">{{ this.$t('Step') }} : {{ step }}</span>
    </header>
    <div class="loading skeleton" v-if="isLoading">{{ $t('Loading...') }}</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="step === 1" class="image-viewer">
      <button
        @click="downloadImage"
        :disabled="isDownloading"
      >
        {{ isDownloading ? $t('Downloading...') : $t('File Download') }}
      </button>
    </div>
    <div v-else-if="step === 2" class="image-viewer">
      <button
        @click="downloadImage"
        :disabled="isDownloading"
      >
        {{ isDownloading ? $t('Downloading...') : $t('File Download') }}
      </button>
    </div>
  </div>
</template>

<script>
import api, { BASE_URL } from '@/api/api.js'
import axios from 'axios'

export default {
  i18n: {
    ko: {
      'Loading...': '불러오는 중',
      'Downloading...': '다운로드 중',
      'File Name': '파일 이름',
      'File Download': '파일 다운로드',
      'Download Failed': '파일 다운로드에 실패했습니다.'
    },
    cn: {
      'Loading...': '加载中',
      'Downloading...': '下载中',
      'File Name': '文件名',
      'File Download': '文件下载',
      'Download Failed': '文件下载失败'
    }
  },
  name: 'detail-panel',
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
  data() {
    return {
      isLoading: true,
      isDownloading: false,
      images: [],
      error: null
    }
  },
  mounted() {
    this.getImage()
  },
  methods: {
    getImage() {
      api.getStitchedImage(this.fileName, this.step)
        .then((res) => {
          this.images = res.data
        })
        .catch((err) => {
          this.error = err
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    async downloadImage() {
      if (!this.fileName || !this.step) {
        console.error('파일명 또는 step이 없습니다')
        return
      }

      this.isDownloading = true
      try {
        // fileName과 step을 모두 포함하도록 URL 수정
        const response = await axios.get(
          `${BASE_URL}/stitched_image/download/${this.fileName}/${this.step}`,
          {
            responseType: 'blob'
          }
        )

        // response.data가 직접 Blob 데이터임
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        console.log('response:', response)

        // 파일 확장자는 서버 응답에 따라 조정
        const extension = this.step === 1 ? 'zip' : 'png'
        link.setAttribute('download', `${this.fileName}_step${this.step}.${extension}`)

        document.body.appendChild(link)
        link.click()

        // cleanup
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('다운로드 중 에러 발생:', error)
        alert(this.$t('Download Failed'))
      } finally {
        this.isDownloading = false
      }
    }
  }
}
</script>

<style scoped>
.detail-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-info {
  top: 0;
  position: fixed;
  width: 100%;
  display: flex;
  padding: 0.25rem;
  gap: 1rem;
}

.image-info span {
  white-space: nowrap;
  color: var(--pico-h1-color);
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
  padding: 1rem;
  margin: 4rem 0;
  text-align: center;
  font-size: 1.4rem;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
