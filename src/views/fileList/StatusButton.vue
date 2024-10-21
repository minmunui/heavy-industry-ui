<script>
import { DATA_STATUS } from '@/utils/constants.js'
import { timeAgo } from '@/utils/utils.js'

export default {
  name: 'status-button',
  emits: ['stitch'],
  i18n: {
    ko: {
      'Uploading...': '업로딩...',
      READY: '준비됨',
      'Stitching...': '정합 중...',
      DONE: '완료',
      ERROR: '에러',
      ago: '전',
      'Stitch': '정합',
      open: '열기',
      log: '로그'

    }
  },
  props: {
    status: {
      type: Object,
      required: true,
      default() {
        return {
          status: DATA_STATUS.ERROR,
          data: 'Api error'
        }
      }
    },
  },
  computed: {
    DATA_STATUS() {
      return DATA_STATUS
    }
  },
  methods: {
    timeAgo,
    clickStitch() {
      this.$emit('stitch')
    }
  },
}
</script>

<template>
  <div class="status uploading" v-if="status.status === DATA_STATUS.UPLOADING">
    {{ $t('Uploading...') }}
    <time :datetime="status.data.startedAt">{{ timeAgo(status.data.startedAt) }}</time>
  </div>
  <div class="status ready" v-if="status.status === DATA_STATUS.READY">
    {{ $t('READY') }}
    <button class="stitch" @click="clickStitch">
      {{ $t('Stitch') }}
    </button>
  </div>
  <div class="status on-progress" v-if="status.status === DATA_STATUS.ONPROGRESS">
    {{ $t('Stitching...') }}
    <time :datetime="status.data.startedAt">{{ timeAgo(status.data.startedAt) }}</time>
  </div>
  <div class="status done" v-if="status.status === DATA_STATUS.DONE">
    {{ $t('DONE') }}
    <button class="open">
      {{ $t('open') }}
    </button>
  </div>
  <div class="status error" v-if="status.status === DATA_STATUS.ERROR">
    {{ $t('ERROR') }}
    <button class="error">
      {{ $t('log') }}
    </button>
  </div>
</template>

<style scoped>
.status {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-weight: bold;

  &.error {
    color: var(--error-red);

    button {
      background-color: var(--error-red)
    }
  }

  &.ready, &.done {
    color: var(--success-green);

    button {
      background-color: var(--success-green)
    }
  }

  &.uploading, &.on-progress {
    color: var(--pending-yellow);

    button {
      background-color: var(--pending-yellow);
    }
  }
}

button {
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
  border: none;

  &:hover, &:focus {
    cursor: pointer;
    box-shadow: 0 0 13px rgba(255, 255, 255, 0.7);
  }
}
</style>
