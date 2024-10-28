<script>
import { DATA_STATUS } from '@/utils/constants.js'
import { timeAgo } from '@/utils/utils.js'

export default {
  name: 'status-button',
  emits: ['stitch'],
  i18n: {
    ko: {
      'Uploading...': '업로딩...',
      'READY': '준비됨',
      'Stitching...': '정합 중...',
      'DONE': '완료',
      'ERROR': '에러',
      'ago': '전',
      'Stitch': '정합',
      'open': '열기',
      'log': '로그',
      'retry': '재시도'
    },
    cn: {
      'Uploading...': '上传中...',
      'READY': '准备就绪',
      'Stitching...': '拼接中...',
      'DONE': '完成',
      'ERROR': '错误',
      'ago': '前',
      'Stitch': '拼接',
      'open': '打开',
      'log': '日志',
      'retry': '重试'
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
    fileName: {
      type:String,
      required: true,
      default: 'file'
    },
    step: {
      type: Number,
      required: true,
      default: 0
    }
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
  }
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
    <router-link :to="{name:'detail', params:{fileName:this.fileName, step:this.step}}" class="open">
      {{ $t('open') }}
    </router-link>
  </div>
  <div class="status error" v-if="status.status === DATA_STATUS.ERROR">
    {{ $t('ERROR') }}
    <div class="buttons">
      <router-link :to="{name : 'error', params:{fileName:this.fileName, step:this.step}}" class="error">
        {{ $t('log') }}
      </router-link>
      <button class="error" @click="clickStitch">
        {{ $t('retry') }}
      </button>
    </div>
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

    .buttons {
      display: flex;
      gap: 0.25rem;

      a, button {
        background-color: var(--error-red);
      }
    }

  }

  &.done {
    color: var(--success-green);
    a, button {
      background-color: var(--success-green);
    }
  }

  &.ready {

    button {
      border: 1px solid var(--color-text);
    }
  }

  &.uploading, &.on-progress {
    color: var(--color-text);

    button {
      background-color: var(--color-text);
    }
  }
}

button {
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
  border: none;
  color: var(--vt-c-text-dark-1);

  &:hover, &:focus {
    cursor: pointer;
    box-shadow: 0 0 13px rgba(255, 255, 255, 0.7);
  }
}

a {
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
  border: none;
  color: var(--vt-c-text-dark-1);
  border-radius: var(--pico-border-radius);
  font-weight: bold;
  &:hover, &:focus {
    cursor: pointer;
    box-shadow: 0 0 13px rgba(255, 255, 255, 0.7);
  }
}
</style>
