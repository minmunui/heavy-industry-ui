<template>
  <div class="detail-view">
    <header class="image-info">
      <span class="file-name">{{ this.$t('File Name') }} : {{ fileName }}</span>
      <span class="file-step">{{ this.$t('Step') }} : {{ step }}</span>
    </header>
    <div class="loading skeleton" v-if="isLoading">{{ $t('Loading...') }}</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="this.step === 1 || this.step=='1'" class="image-viewer">
      <button
        :disabled="isDownloading"
        v-if = "this.isLoading"
      >
        정합 결과는 Sever의 datasets/{{ this.fileName }}/opencv-output/에 저장되어 있습니다.
        <!--        {{ isDownloading ? $t('Downloading...') : $t('File Download') }}-->
      </button>
      <a v-else :href="this.fileLink">
        정합 결과는 Sever의 datasets/{{ this.fileName }}/opencv-output/에 저장되어 있습니다.. 눌러서 확인하세요.
      </a>
    </div>
    <div v-else-if="this.step === 2 || this.step==='2'" class="image-viewer">
      <a v-if="!this.isLoading" :href="this.images.url" download>
        {{ isDownloading ? $t('Downloading...') : $t('File Download') }}
      </a>
      <button v-else
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
      if (this.step === 1 || this.step === '1') {
        this.isLoading = false
        return
      }
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
    openLocalStorage(dirName) {
      window.open(`file:///home/crunch/Desktop/stitcher-be/datasets/${dirName}/opencv_output` ,"_blank")
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
  },
  computed : {
    fileLink() {
      return `file:///home/crunch/Desktop/stitcher-be/datasets/${this.$props.dirName}/opencv_output`
    }
  }
}
</script>

<style scoped>
.detail-view {
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
  padding: 2rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
