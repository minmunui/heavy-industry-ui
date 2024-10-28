<script>
import SettingIcon from '@/components/icons/SettingIcon.vue'

import api from '@/api/api.js'
import HomeIcon from '@/components/icons/HomeIcon.vue'
import UploadIcon from '@/components/icons/UploadIcon.vue'

export default {
  name: 'MainHeader',
  components: { UploadIcon, HomeIcon, SettingIcon },
  i18n: {
    ko: {
      'Server Error': '서버 연결 오류',
      'Home' : '홈',
      'Setting' : '설정',
      'Upload' : '사진 업로드'
    },
    cn: {
      'Server Error': '无法连接到服务器',
      'Home' : '主页',
      'Setting' : '设置',
      'Upload' : '上传图片'
    }
  },
  data() {
    return {
      title: 'UNKNOWN',
      error: false
    }
  },
  methods: {
    getMachineInfo() {
      api.getServerInfo()
        .then(res => {
          this.title = res.title
        })
        .catch(error => {

          console.log('error' + error)
            this.title = this.$t('Server Error')
            this.error = true
          }
        )
    }
  },
  computed: {
    machineNameClass() {
      return `machine-name ${this.error ? 'error' : ''}`
    }
  },
  mounted() {
    this.getMachineInfo()
  }
}

</script>

<template>
  <header class="main-header">
    <div class="left-side">
    <router-link :to="{ name:'main'}" class="icon" :data-tooltip="this.$t('Home')" data-placement="bottom">
      <home-icon />
    </router-link>
    <router-link :to="{name:'upload'}" class="icon" :data-tooltip="this.$t('Upload')" data-placement="bottom">
      <upload-icon />
    </router-link>
    </div>
    <h1 :class="machineNameClass">{{ this.title }}</h1>
    <router-link :to="{name:'setting'}" class="icon" :data-tooltip="this.$t('Setting')" data-placement="bottom">
      <setting-icon />
    </router-link>
  </header>
</template>

<style scoped>
h1 {
  margin-bottom: 0;
}

.icon {
  color: var(--color-text);
  border-radius : 1rem;
}

header.main-header {
  width: 100%;
  background-color: var(--color-background);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  white-space: nowrap;
}

.left-side {
  display: flex;
  gap: 1rem;
  z-index: 2000
}

.error {
  color: var(--error-red);
}
</style>
