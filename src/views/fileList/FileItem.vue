<script>
import StatusButton from '@/views/fileList/StatusButton.vue'
import api from '@/api/api.js'

export default {
  name: 'FileItem',
  components: { StatusButton },
  data() {
    return {}
  },
  props: {
    file: {
      type: Object,
      required: true,
      default: {
        index: 0,
        name: 'file name',
        size: 'file size',
        time: '1970-01-01 00:00:00',
        status_1: 0,
        status_2: 0
      }
    }
  },
  i18n: {
    ko: {
      'images': '장'
    },
    en: {}
  },
  methods: {
    requestStitch1() {
      api.stitch1(this.file.name)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    requestStitch2() {
      api.stitch2(this.file.name)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

}
</script>

<template>
  <tr class="file-item">
    <td>{{ file.index }}</td>
    <td>{{ file.name }}</td>
    <td>{{ file.size }}</td>
    <td>{{ file.time }}</td>
    <td>
      <status-button :status="file.status_1" @stitch="requestStitch1"></status-button>
    </td>
    <td>
      <status-button :status="file.status_2" @stitch="requestStitch2"></status-button>
    </td>
  </tr>
</template>

<style scoped>
td {
  text-align: center;
}
</style>
