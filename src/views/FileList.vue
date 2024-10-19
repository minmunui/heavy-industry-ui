<script>
import api from '../api/api.js'
import FileItem from '@/views/FileItem.vue'

export default {
  components: { FileItem },
  data() {
    return {
      headerPinned: false,

      scrollHide: true,

      scrollY: 0,
      lastScrollY: 0,

      dataList: []
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    api.getDataList().then(dataList => {
      this.dataList = dataList
    })
  },
  i18n: {
    ko: {
      'Data name': '데이터 이름',
      'Size': '크기',
      'Date': '날짜',
      'Status': '상태'
    }
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = 'ko'
    },
    handleScroll() {
      this.scrollY = window.scrollY
      if (this.scrollY > this.last) {
        this.scrollHide = false
      } else {
        this.scrollHide = true
      }
      this.lastScrollY = this.scrollY
    },
    handlePin() {
      this.headerPinned = !this.headerPinned
    }
  },
  computed: {
    headerVisible() {
      return this.headerPinned || !this.scrollHide
    },
    headerStyle() {
      return {
        backgroundColor: this.headerVisible ? 'white' : 'lightgray'
      }
    }
  }
}
</script>

<template>
  <div class="data-list">
    <header class="data-list__header" :style="headerStyle">
      <h3 class="data-name">
        {{ $t('Data name') }}
      </h3>
      <h3 class="data-size">
        {{ $t('Size') }}
      </h3>
      <h3 class="data-date">
        {{ $t('Date') }}
      </h3>
      <h3 class="buttons">
        {{ $t('Status') }}
      </h3>
      <button class="pin-button" @click="handlePin">
        {{ headerPinned ? 'Unpin' : 'Pin' }}
      </button>
    </header>
    <section class="data-list__contents">
      <file-item v-for="data in dataList" :key="data.id" :file="data" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.data-list {
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    position: relative;

    h3 {
      width: 100%;
      text-align: center;
    }

    .pin-button {
      position: absolute;
      right: 10px;
      height: 2rem;
    }
  }
}

</style>
