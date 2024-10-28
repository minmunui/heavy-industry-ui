<script>
import api from '@/api/api.js'
import axios from 'axios'

export default {
  data() {
    return {
      language: localStorage.language || 'en',
      serverName: '',
      serverIP: '',
      serverNameInvalid: 'false',
      serverIPInvalid: 'false',
      message: '',
      refreshInterval: this.$refreshInterval,
      IPValidMessage: '',

      isLoading: false
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
      'Server IP': '서버 IP',
      'Server Info Changed': '서버 정보가 변경되었습니다',
      'Server Info Change Failed': '서버 정보 변경에 실패했습니다',
      'Value cannot include character "!"': '값에 "!" 문자를 포함할 수 없습니다',
      'Change refresh interval': '새로고침 간격 변경',
      'Too fast refresh interval may cause performance issue': '너무 빠른 새로고침 간격은 성능 문제를 일으킬 수 있습니다',
      'Refresh Interval': '새로고침 간격',
      'Check Connection': '연결 확인',
      'This setting will be applied when server restarted': '이 설정은 서버 재시작 시 적용됩니다',
      'Server Setting': '서버 설정',
      'Connection Successful': '연결 성공',
      'Connection Failed': '연결 실패'
    },
    cn: {
      'Language Preference': '语言设置',
      'Dark Mode': '暗模式',
      'Light Mode': '亮模式',
      'Change': '更改',
      'Server Name': '服务器名称',
      'Change Server Name': '更改服务器名称',
      'Change Node ODM Server': 'Node ODM 服务器',
      'Server IP': '服务器 IP',
      'Server Info Changed': '服务器信息已更改',
      'Server Info Change Failed': '服务器信息更改失败',
      'Value cannot include character "!"': '值不能包含字符 "!"',
      'Change refresh interval': '更改刷新间隔',
      'Too fast refresh interval may cause performance issue': '刷新间隔太快可能会导致性能问题',
      'Refresh Interval': '刷新间隔',
      'Check Connection': '检查连接',
      'This setting will be applied when server restarted': '此设置将在服务器重新启动时应用',
      'Server Setting': '服务器设置',
      'Connection Successful': '连接成功',
      'Connection Failed': '连接失败'
    }
  },
  name: 'language-setting',
  methods: {
    checkNodeODM() {
      this.isLoading = true
      axios.get(`${this.serverIP}/info`).then(() => {
        this.IPValidMessage = 'Connection Successful'
      }).catch(() => {
        this.IPValidMessage = 'Connection Failed'
      }).finally(() => {
          this.isLoading = false
        }
      )
    },
    changeRefreshInterval() {
      this.$refreshInterval = this.refreshInterval
    },
    changeLanguage(language) {
      this.language = language
    },
    getServerInfo() {
      api.getServerInfo().then((res) => {
        console.log('res', res)
        this.serverName = res.title
        this.serverIP = res.ODM_URL
      })
    },
    changeServerInfo(event) {
      // stop the form from submitting
      event.preventDefault()
      if (this.checkInvalid()) {
        alert(this.$t('Value cannot include character "!"'))
        return
      }
      api.postServerInfo({ title: this.serverName, ODM_URL: this.serverIP }).then(() => {
        this.message = this.$t('Server Info Changed')
        this.serverNameInvalid = false
        this.serverIPInvalid = false
      }).catch(() => {
          this.message = this.$t('Server Info Change Failed')
          this.serverNameInvalid = false
          this.serverIPInvalid = false
        }
      )
    },
    checkInvalid() {
      let invalid = false
      if (this.serverName.includes('!')) {
        this.serverNameInvalid = true
        invalid = true
      }
      if (this.serverIP.includes('!')) {
        this.serverIPInvalid = true
        invalid = true
      }
      return invalid
    },
    messageClass(message) {
      return message.includes('Failed') ? 'error' : 'success'
    }
  },
  computed: {
    loadingClass() {
      return this.isLoading ? 'loading skeleton' : ''
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
    <span :class="`${this.messageClass(this.message)} message`">{{ this.message }}</span>
    <h3> {{ $t('Server Setting') }}</h3>
    <form @submit="this.changeServerInfo">
      <strong>{{ $t('Change Server Name') }}</strong>
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
      </fieldset>
      <small id="invalid-helper">{{ this.$t('Value cannot include character "!"') }}</small>
      <strong>{{ $t('Change Node ODM Server') }}</strong>
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
      <small>{{ this.$t('This setting will be applied when server restarted') }}</small>
      <input type="submit" :value="this.$t('Change')" />


    </form>
    <div class="valid-check">
      <button :class="`language-button ${loadingClass}`" @click="checkNodeODM">{{ $t('Check Connection') }} <b-spinner label="Spinning" v-if="this.isLoading"></b-spinner></button>
      <span :class="messageClass(this.IPValidMessage)">{{ this.IPValidMessage }}</span>
    </div>
    <hr />

<!--    <h3>{{ $t('Change refresh interval') }}</h3>-->
<!--    <span>-->
<!--      {{ $t('Too fast refresh interval may cause performance issue') }}-->
<!--    </span>-->
<!--    <label>-->
<!--      {{ $t('Refresh Interval') }} : {{ this.refreshInterval }}s-->
<!--      <input type="range" v-model="this.refreshInterval" @change="changeRefreshInterval" max="60" min="1" step="1" />-->
<!--    </label>-->
  </div>
</template>

<style scoped>
.setting-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--color-background-mute);
  border-radius: 1rem;
  padding: 2rem 2rem 4rem;
  margin: 2rem;
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
  font-size: 1rem;
}

.valid-check {
  display: flex;
  gap: 1rem;

  span {
    font-size: 1.5rem;
  }
}

.loading {
  cursor: not-allowed;
  background-color: var(--color-background-mute);
}

.message {
  font-size: 1rem;
  font-weight: bold;
}

.error {
  color: var(--error-red)
}

.success {
  color: var(--success-green)
}
</style>
