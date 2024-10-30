<template>
  <div class="detail-view">
    <header class="image-info">
      <span class="file-name">{{ this.$t('File Name') }} : {{ fileName }}</span>
      <span class="file-step">{{ this.$t('Step') }} : {{ step }}</span>
    </header>
    <div class="loading skeleton" v-if="this.isLoading">{{ $t('Loading...') }}</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="this.step === 1 || this.step=='1'" class="image-viewer">
      <div class="download-links">
        <download-image v-for="(image, key) in images" :key="key" :image="this.getDownloadLink(this.fileName, image)">
          {{ $t('File Download') }}
        </download-image>
      </div>
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
import api from '@/api/api.js'
import DownloadImage from '@/views/detail/DownloadImage.vue'

export default {
  name: 'detail-panel',
  components: { DownloadImage },
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
        api.getImageDownloadLinks(this.fileName).then((res) => {
          this.images = res.data.url
          this.isLoading = false
        })
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
    getDownloadLink(fileName, image) {
      return api.getDownloadLink(fileName, image)
    }
  }
}
</script>

<style scoped>
.detail-view {
  width:100%;
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

.download-links {
  width:100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
