<script>
import { DATA_STATUS } from '@/utils/constants.js'
import { timeAgo } from '@/utils/utils.js'

export default {
  name: 'status-button',
  emits: ['stitch'],
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
      type: String,
      required: true,
      default: 'file'
    },
    step: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      size: 80,
      scan: true
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
      this.$emit('stitch', this.size, this.scan)
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
    <div class="flex-col">
      <span class="status ready">{{ $t('READY') }}</span>
      <button class="stitch" @click="clickStitch">
        {{ $t('Stitch') }}
      </button>
    </div>
    <div class="stitch-options" v-if="step==='1'">
      <div class="cluster_size">
        <span :data-tooltip="this.$t('Maximum number of images included in one cluster')"
              :style="{borderBottom:'none'}"> {{ this.$t('Max') }}
          <input type="number" v-model="size" min="40" max="200" step="5">
        </span>
      </div>
      <div class="scan-option" data-placement="bottom" :data-tooltip="this.$t('If you uncheck it, you can get better results, but there is a chance of failure.')">
          <label>
          {{ this.$t('Scan option') }} <input class="checkbox" type="checkbox" name="english" v-model="scan"/>
        </label>
      </div>
    </div>
  </div>
  <div class="status on-progress" v-if="status.status === DATA_STATUS.QUEUED">
    {{ $t('QUEUED') }}
    <time :datetime="status.data.startedAt">{{ timeAgo(status.data.startedAt) }}</time>
  </div>
  <div class="status on-progress" v-if="status.status === DATA_STATUS.ONPROGRESS">
    {{ $t('Stitching...') }}
    <time :datetime="status.data.startedAt">{{ timeAgo(status.data.startedAt) }}</time>
    <span v-if="status.data.progress">{{ Math.floor(status.data.progress) }}%</span>
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
  justify-content: center;
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
    flex-direction: row;
    gap: 1rem;

    button {
      border: 1px solid var(--color-text);
    }

    span {
      flex-direction: row;
      margin-top: 0.2rem;
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
  font-weight: bold;

  &:hover, &:focus {
    cursor: pointer;
    box-shadow: 0 0 13px rgba(255, 255, 255, 0.7);
  }
}

input {
  border: 1px solid var(--color-text);
  border-radius: 5px;
  padding: 0.2rem;
  margin-bottom: 0;
  height: 1.8rem;
  width: 3rem;
}

.flex-col {
  flex-direction: column;
}

.checkbox {
  padding : 0;
  margin: 0;
  width: 1.5rem;
  border-radius: 50%;
  height: 1.5rem;

  &:checked {
    background-color: var(--sea-blue-500);
  }
}

.stitch-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.scan-option {
  border-bottom: none;
}

label {
  margin: 0;
}
</style>
