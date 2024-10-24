<script>
export default {
  data() {
    return { language: localStorage.language || 'en' }
  },
  i18n: {
    ko: {
      'Language Preference': '언어 설정',
      'Dark Mode': '다크 모드',
      'Light Mode': '라이트 모드',
      'Change': '변경',
      'Server Name': '서버 이름',
      'Change Server Name': '서버 이름 변경'
    },
    cn: {
      'Language Preference': '语言设置',
      'Dark Mode': '暗模式',
      'Light Mode': '亮模式',
      'Change': '更改',
      'Server Name': '服务器名称',
      'Change Server Name': '更改服务器名称'
    }
  },
  name: 'language-setting',
  methods: {
    changeLanguage(language) {
      console.log('changing language to', language)
      this.language = language
    }
  },
  watch: {
    language(newLanguage) {
      this.$i18n.locale = newLanguage
      localStorage.setItem('language', newLanguage)
      window.location.reload()
    }
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

    <hr/>

    <h3>{{ $t('Change Server Name') }}</h3>
    <form>
      <fieldset role="group">
        <input
          class="server-name"
          type="text"
          name="server-name"
          :placeholder="this.$t('Server Name')"
          autocomplete="server-name"
        />
        <input type="submit" :value="this.$t('Change')" />
      </fieldset>
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
  padding: 0.5rem;
  border: 1px solid var(--color-text);
  border-radius: 0.5rem;
}
</style>
