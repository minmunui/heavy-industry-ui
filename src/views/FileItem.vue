<script>
export default {
  name: 'FileItem',
  data() {
    return {}
  },
  props: {
    file: {
      type: Object,
      required: true,
      default: {
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
  }
}
</script>

<template>
  <li class="file-item">
    <div class="file-item__header row">
      <div class="file-item__name">
        {{ this.file.name }}
      </div>
      <div class="file-item__size">
        {{ this.file.size }} {{ $t('images') }}
      </div>
    </div>
    <div class="file-item__description row">
      <div class="file-item__time">
        {{ this.file.time }}
      </div>

      <div class="file-item__buttons">
        {{ this.file.status }}
      </div>
    </div>
  </li>
</template>

<style scoped>
@media (min-width: 769px) {
  .file-item {
    padding: 10px;
    display: flex;
    justify-content: space-around;
    width: 100%;
    color: var(--color-text);
    font-size: 1.2rem;

    .row {
      display: flex;
      width: 100%;
      justify-content: space-around;

      div {
        width: 100%;
        text-align: center;
      }

      .file-item__size {
        width: 50%;
      }
    }
  }
}

@media (max-width: 768px) {
  .file-item {
    width: 100%;
    list-style: none;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    padding: 10px;

    .file-item__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .file-item__name {
        padding: 0.5rem;
        font-size: 1.2rem;
        font-weight: bold;
      }

      .file-item__header {
        display: flex;
      }
    }
    .file-item__description {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .file-item__time {
        padding: 0.5rem;
        font-size: 1rem;
      }
    }
  }
}
</style>
