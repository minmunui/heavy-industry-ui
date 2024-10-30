<script>
import api from '@/api/api.js'

export default {
  i18n: {
    ko: {
      Upload: '업로드',
      Uploading: '업로드 중',
      'File Upload': '파일 업로드',
      'Enter data name': '데이터 이름'


    },
    cn: {
      Upload: '上传',
      Uploading: '上传中',
      'File Upload': '文件上传',
      'Enter data name': '输入数据名称'
    }
  },
  name: 'upload-view',
  data() {
    return {
      selectedFiles: [],
      uploadId: '',
      isUploading: false
    }
  },
  computed: {
    uploadingClass() {
      return this.isUploading ? 'uploading skeleton' : 'outline'
    },
    uploadButton() {
      return this.isUploading ? this.$t('Uploading') : this.$t('Upload')
    }
  },
  methods: {
    validateInput() {
      if (this.uploadId.length === 0) {
        console.log('d')
        alert(this.$t('Please enter a name'))
        return false
      }
      // input은 -, _를 제외한 특수문자를 포함할 수 없다. 한국어 가능
      if (!/^[ㄱ-ㅎ가-힣a-zA-Z0-9-_]*$/.test(this.uploadId)) {
        alert(this.$t('Please enter a valid name'))
        return false
      }
      if (this.selectedFiles.length === 0) {
        alert(this.$t('Please select at least one file'))
        return false
      }
      return true
    },
    onFileChange(event) {
      this.selectedFiles = Array.from(event.target.files) // Store selected files in an array
    },
    async uploadFile() {
      if (!this.validateInput()) {
        return
      }
      this.isUploading = true
      const formData = new FormData()
      formData.append('total', this.selectedFiles.length)

      if (this.selectedFiles.length === 1) {
        formData.append('file', this.selectedFiles[0])
        api.uploadSingleFile(this.uploadId, formData).then(() =>
          alert('File uploaded successfully!')
        ).catch(() =>
          alert('An error occurred while uploading the file.')
        ).finally(() =>
          this.isUploading = false
        )
      } else {
        this.selectedFiles.forEach(file => {
          formData.append('files', file) // Append each file to the FormData object
        })

        api.uploadMultipleFiles(this.uploadId, formData).then(() =>
          alert('Files uploaded successfully!')
        ).catch(() =>
          alert('An error occurred while uploading the files.')
        ).finally(() =>
          this.isUploading = false
        )
      }
    }
  }
}
</script>

<template>
  <main>
    <h3> {{ this.$t('File Upload') }}</h3>
    <input type="text" v-model="uploadId" :placeholder="this.$t('Enter data name')" accept=".jpg, .jpeg, .png, .tiff" />
    <input type="file" @change="onFileChange" multiple />
    <button :class="uploadingClass" @click="uploadFile">{{ this.uploadButton }}</button>
    <div v-if="this.isUploading">{{ this.$t('Do not leave this page during upload') }}</div>
  </main>
</template>

<style scoped>
/* Add your styles here */
.uploading {
  cursor: not-allowed;
  background-color: gray;
}

input {
  background-color: var(--color-background-mute);
  border-radius: 0.5rem;
}

.outline {
  border: 1px solid var(--color-text);
  border-radius: 0.5rem;
}
</style>
