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
