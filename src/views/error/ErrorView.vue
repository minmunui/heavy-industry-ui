<script>
import api from '@/api/api.js'

export default {
  name: 'errorView',
  i18n: {
    ko: {
      'Server disconnected': '서버와 연결이 끊겼습니다.',
      'Check the server connection.': '서버 연결을 확인하세요.'
    },
    cn: {
      'Server disconnected': '服务器断开连接。',
      'Check the server connection.': '检查服务器连接。'
    }
  },
  props: {
    fileName: {
      type: String,
      required: true
    },
    step: {
      type: String,
      required: true,
      default() {
        return '0'
      }
    }
  },
  data() {
    return {
      errorLog: '',
      troubleShooting: ''
    }
  },
  mounted() {
    this.getErrorLog()
  },
  methods: {
    getErrorLog() {
      api.getErrorLog(this.$props.fileName, this.$props.step).then((res) => {
        this.errorLog = res.data.errorLog
        this.troubleShooting = res.data.troubleShooting
      }).catch(() => {
        this.errorLog = this.$t('Server disconnected')
        this.troubleShooting = this.$t('Check the server connection.')
      })
    }
  }
}
</script>

<template>
  <div class="error-view">
    <h1>{{ $t('Error Log') }}</h1>
    <p class="log">{{ errorLog }}</p>
    <hr/>
    <h3>{{ $t('Trouble Shooting') }}</h3>
    <p>{{ troubleShooting }}</p>
  </div>
</template>

<style scoped>
.error-view {
  width: 100%;
  max-width: 1400px;
  padding: 2rem;
}

.log {
  height: 20rem;
  overflow-y: scroll;
  color: var(--error-red);
  font-family: monospace;
  font-weight: bold
}

h1, h3 {
  white-space : nowrap;
}
</style>
