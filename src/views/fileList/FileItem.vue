<script>
import StatusButton from '@/views/fileList/StatusButton.vue'
import api from '@/api/api.js'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

export default {
  name: 'FileItem',
  components: { DeleteIcon, StatusButton },
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
  methods: {
    requestStitch1() {
      api.requestStitch(this.file.name, 1)
        .then(() => {
          window.location.reload()
        })
        .catch(() => {
          window.location.reload()
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
    },
    deleteFile() {
      const userConfirm = confirm(`${this.$t('Are you sure you want to delete this file?')} : ${this.file.name}`)

      if (userConfirm) {
        api.deleteFile(this.file.name)
          .then(() => {
            this.$emit('changeData')
          })
          .catch(() => {
            alert('Failed to delete file')
          })
      }
    }
  }
}
</script>

<template>
  <tr class="file-item">
    <td class="index">
      <div class="sticky">{{ file.index }}</div>
    </td>
    <td class="name">
      <div class="name-wrapper"><span>{{ file.name }}</span>
        <button :data-tooltip="this.$t('Delete')" @click="this.deleteFile">
          <delete-icon />
        </button>
      </div>
    </td>
    <td>{{ file.size }} {{ this.$t('images') }}</td>
    <td>{{ file.time }}</td>
    <td>
      <status-button :status="file.status_1" @stitch="requestStitch1" :file-name="this.$props.file.name"
                     step="1"></status-button>
    </td>
    <td>
      <status-button :status="file.status_2" @stitch="requestStitch2" :file-name="this.$props.file.name"
                     step="2"></status-button>
    </td>
  </tr>
</template>

<style scoped>

td {
  text-align: center;
}

td.index {
  position: sticky;
  padding: 0;
  left: 0;
}

.sticky {
  position: sticky
}


.name-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: var(--pico-h1-color);
    font-weight: bold;
  }
}
</style>
