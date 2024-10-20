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
      'Status 1': '1단계 정합',
      'Status 2': '2단계 정합'
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
    <div class="header-wrapper" :style="headerStyle">
      <header class="data-list__header">
        <div>
          <h3 class="data-name">
            {{ $t('Data name') }}
          </h3>
          <h3 class="data-size">
            {{ $t('Size') }}
          </h3>
        </div>
        <div>
          <h3 class="data-date">
            {{ $t('Date') }}
          </h3>
          <div>
            <h3 class="status-1">
              {{ $t('Status 1') }}
            </h3>
            <h3 class="status-2">
              {{ $t('Status 2') }}
            </h3>
          </div>
        </div>
        <button class="pin-button" @click="handlePin">
          {{ headerPinned ? 'Unpin' : 'Pin' }}
        </button>
      </header>
    </div>
    <section class="data-list__contents">
      <file-item v-for="data in dataList" :key="data.id" :file="data" />
    </section>
  </div>
</template>

<style lang="scss" scoped>


.data-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header-wrapper {
    width: 100%;

    .data-list__header {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      position: relative;
      width: 100%;
      max-width: 1280px;

      div {
        width: 100%;
        display: flex;

        .data-size {
          width: 50%;
        }
      }

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

  .data-list__contents {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1280px;
    gap: 1rem;
  }
}


@media (min-width: 769px) {
  .header-wrapper {
    display: flex;
    justify-content: center;
  }

  section {
    padding: 10px 0;
  }
}


@media (max-width: 768px) {
  .header-wrapper {
    display: none;
  }

  section {
    display: grid;
    grid-template-columns: 2fr;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  section {
    grid-template-columns: 1fr;
  }
}

</style>
