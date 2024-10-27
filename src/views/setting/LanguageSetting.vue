<script>
import api from '@/api/api.js'

export default {
  data() {
    return {
      language: localStorage.language || 'en',
      serverName: '',
      serverIP: '',
      serverNameInvalid: "false",
      serverIPInvalid: "false",
      message: ''
    }
  },
  i18n: {
    ko: {
      'Language Preference': '언어 설정',
      'Dark Mode': '다크 모드',
      'Light Mode': '라이트 모드',
      'Change': '변경',
      'Server Name': '서버 이름',
      'Change Server Name': '서버 이름 변경',
      'Change Node ODM Server': 'Node ODM 서버 변경',
      'Server IP': '서버 IP'
    },
    cn: {
      'Language Preference': '语言设置',
      'Dark Mode': '暗模式',
      'Light Mode': '亮模式',
      'Change': '更改',
      'Server Name': '服务器名称',
      'Change Server Name': '更改服务器名称',
      'Change Node ODM Server': 'Node ODM 服务器',
      'Server IP': '服务器 IP'
    }
  },
  name: 'language-setting',
  methods: {
    changeLanguage(language) {
      console.log('changing language to', language)
      this.language = language
    },
    getServerInfo() {
      api.getServerInfo().then((res) => {
        console.log("res", res)
        this.serverName = res.title
        this.serverIP = res.ODM_URL
      })
    },
    changeServerInfo(event) {
      // stop the form from submitting
      if (this.checkInvalid()) return
      event.preventDefault()
      api.postServerInfo().then(() => {
        this.message = this.$t('Server Info Changed')
      }).catch(
        this.message = this.$t('Server Info Change Failed')
      )

    },
    checkInvalid() {
      let invalid = false
      if (this.serverName.includes('!')) {
        this.serverNameInvalid = true
        invalid = true
      }
      if (this.serverIPInvalid.includes('!')) {
        this.serverIPInvalid = true
        invalid = true
      }
      return invalid
    }
  },
  computed: {
    messageClass() {
      return this.message.includes('Failed') ? 'error' : 'success'
    }
  },
  watch: {
    language(newLanguage) {
      this.$i18n.locale = newLanguage
      localStorage.setItem('language', newLanguage)
      window.location.reload()
    }
  },
  mounted() {
    this.getServerInfo()
  }
}
</script>

<template>
  <div class="setting-form">
    <div class="language-setting">
      <h3>{{ $t('Language Preference') }}:</h3>
      <button class="language-button" @click="changeLanguage('en')">
        English
      </button>
      <button class="language-button" @click="changeLanguage('ko')">
        한국어
      </button>
      <button class="language-button" @click="changeLanguage('cn')">
        中文
      </button>
    </div>

    <hr />
    <span :class="`${this.messageClass} message`">{{this.message}}</span>
    <h3>{{ $t('Change Server Name') }}</h3>
    <form @submit="changeServerInfo">
      <fieldset role="group">
        <input
          class="server-name"
          type="text"
          name="server-name"
          :placeholder="this.$t('Server Name')"
          autocomplete="server-name"
          v-model="serverName"
          :aria-invalid="serverNameInvalid"
          aria-describedby="invalid-helper"
          @focusout="serverNameInvalid = serverName.includes('!')"
        />
        <input type="submit" :value="this.$t('Change')" />
      </fieldset>
      <small id="invalid-helper">{{this.$t('Value cannot include character "!"')}}</small>
    </form>

    <hr />

    <h3>{{ $t('Change Node ODM Server') }}</h3>
    <form @submit="this.changeServerInfo">
      <fieldset role="group">
        <input
          class="server-name"
          type="text"
          name="invalid"
          :placeholder="this.$t('Server IP')"
          autocomplete="server-name"
          v-model="serverIP"
          :aria-invalid="serverIPInvalid"
          aria-describedby="invalid-helper"
          @focusout="serverIPInvalid = serverIP.includes('!')"
        />
        <input type="submit" :value="this.$t('Change')"/>
      </fieldset>
      <small id="invalid-helper">{{this.$t('Value cannot include character "!"')}}</small>
    </form>
  </div>
</template>

<style scoped>
.setting-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--color-background-mute);
  border-radius: 1rem;
  padding: 2rem;
}

button.language-button {
  border: 1px solid var(--color-text);
  margin: 0 0.5rem;
}

input.server-name {
  width: 100%;
  padding: 0.4rem;
  border-radius: 0.5rem;
}

small {
 font-size : 1rem;
}

.message {
  font-size: 1rem;
  font-weight: bold;
}
.error {
  color: var(--error-red)
}

.success {
  color:var(--success-green)
}
</style>
