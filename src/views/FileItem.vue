<script>
export default {
  name: "FileItem",
  data() {
    return {

    }
  },
  props: {
    file: {
      type: Object,
      required: true,
      default: {
        name : 'file name',
        size : 'file size',
        time : '1970-01-01 00:00:00',
        status_1 : 0,
        status_2 : 0,
      }
    }
  },
}
</script>

<template>
<li class="file-item">
  <div class="file-item__header">
    <div class="file-item__name">
      {{ this.file.name}}
    </div>
    <div class="file-item__buttons">
      {{ this.file.status}}
    </div>
  </div>
  <div class="file-item__description">
    <div class="file-item__time">
      {{ this.file.time}}
    </div>
    <div class="file-item__size">
      {{ this.file.size}}
    </div>
  </div>
</li>
</template>

<style scoped>

</style>
