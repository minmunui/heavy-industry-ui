<script>
import SettingIcon from '@/components/icons/SettingIcon.vue'

import api from '@/api/api.js'
import HomeIcon from '@/components/icons/HomeIcon.vue'

export default {
  name: 'MainHeader',
  components: { HomeIcon, SettingIcon },
  i18n: {
    ko: {
      'Server Error': '서버 연결 오류',
      'Home' : '홈',
      'Setting' : '설정'
    },
    cn: {
      'Server Error': '无法连接到服务器',
      'Home' : '主页',
      'Setting' : '设置'
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
      api.getMachineInfo()
        .then(response => {
          this.title = response.data.title
        })
        .catch(error => {
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
    <router-link :to="{ name:'main'}" class="icon" :data-tooltip="this.$t('Home')" data-placement="right">
      <home-icon />
    </router-link>
    <h1 :class="machineNameClass">{{ this.title }}</h1>
    <router-link :to="{name:'setting'}" class="icon" :data-tooltip="this.$t('Setting')" data-placement="left">
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

.error {
  color: var(--error-red);
}
</style>
