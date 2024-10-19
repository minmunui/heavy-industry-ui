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
        time : '1070-01-01 00:00:00',
        type : 'file type',
      }
    }
  },
}
</script>

<template>
<li class="file-item">
  <div class="file-item__header">
    <div class="file-item__name">

    </div>
    <div class="file-item__buttons">

    </div>
  </div>
  <div class="file-item__description">
    <div class="file-item__time">

    </div>
    <div class="file-item__size">

    </div>
  </div>
</li>
</template>

<style scoped>

</style>
