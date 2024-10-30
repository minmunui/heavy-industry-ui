<script>
import DetailIcon from '@/components/icons/DetailIcon.vue'

export default {
  name: 'DownloadImage',
  components: { DetailIcon },
  props: {
    image: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isShowDetail: false,
      downloaded: false,
      isMagnify: false
    }
  },
  methods: {
    toggleDetail() {
      this.isShowDetail = !this.isShowDetail
    },
    download() {
      this.downloaded = true
    },
    toggleMagnify() {
      this.isMagnify = !this.isMagnify
    }
  },
  computed: {
    downloadClass() {
      return {
        'downloaded': this.downloaded
      }
    },
    magnifyClass() {
      return {
        'magnify': this.isMagnify
      }
    },
    isCluster() {
      if (this.image.endsWith('clustered.png')) {
        return true
      }
    }
  }
}
</script>

<template>
  <div class="download-image">
    <div class="download-image__header">
      <a :href="image" download :class=downloadClass @click="download">
        {{ $t('File Download') }} <span v-if="this.isCluster">gps</span>
      </a>
      <detail-icon @click="this.toggleDetail" class="icon" />
    </div>
    <div class="wrapper-wrapper">
    <div class="image-wrapper" :hidden="!this.isShowDetail" :class="magnifyClass">
      <img :src="image" alt="image"   @click="toggleMagnify" />
    </div>
    </div>
  </div>
</template>

<style scoped>
a {
  font-size: 1.2rem;
  text-decoration: underline;
  font-weight: bold;
}

.icon {
  cursor: pointer;
}

.downloaded {
  color: var(--error-red);

  &:hover {
    background: none;
  }
}

.download-image {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.download-image__header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


.image-wrapper {
  width: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 100%;
    object-fit: cover;
    max-width: none;
  }
}

.wrapper-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.magnify {
  width: 200%;
  height: 100%;
}
</style>
