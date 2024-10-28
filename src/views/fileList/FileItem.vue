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
      api.requestStitch(this.file.name, 1)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    requestStitch2() {
      api.requestStitch(this.file.name, 2)
        .then(() => {
          window.location.reload()
        })
        .catch(error => {
          alert(error)
          window.location.reload()
        })
    }
  }

}
</script>

<template>
  <tr class="file-item">
    <td class="index"><div class="sticky">{{ file.index }}</div></td>
    <td>{{ file.name }}</td>
    <td>{{ file.size }}</td>
    <td>{{ file.time }}</td>
    <td>
      <status-button :status="file.status_1" @stitch="requestStitch1" :file-name="this.$props.file.name" step="1"></status-button>
    </td>
    <td>
      <status-button :status="file.status_2" @stitch="requestStitch2" :file-name="this.$props.file.name" step="2"></status-button>
    </td>
  </tr>
</template>

<style scoped>

td {
  text-align: center;
}

td.index {
  position:sticky;
  padding: 0;
  left: 0;
}

.sticky {
  position: sticky
}
</style>
