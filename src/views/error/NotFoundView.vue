<script>
import DroneIcon from '@/components/icons/DroneIcon.vue'

export default {
  name: 'NotFoundView',
  components: { DroneIcon },

}
</script>

<template>
  <div class="not-found-view">
    <drone-icon class="drone-icon" />
    <h1>{{ this.$t('Page Not Found') }}</h1>
    <router-link :to="{name:'main'}" class="go-main">{{ this.$t('Back to main') }}</router-link>
  </div>
</template>

<style scoped>
.not-found-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.drone-icon {
  width: 200px;
  height: 200px;
  margin: 8rem;
  animation: wiggle 1.5s infinite;
}

h1, .go-main {
  width: 100%;
  text-align: center;
}

.go-main {
  font-size: 1.5rem;
  font-weight: bold;
}

@keyframes wiggle {
  0% {
    transform: rotate(0deg);
  }
  5% {
    transform: rotate(7deg);
  }
  10% {
    transform: rotate(-9deg);
  }
  15% {
    transform: rotate(11deg);
  }
  20% {
    transform: rotate(-12deg);
  }
  25% {
    transform: rotate(9deg);
  }
  30% {
    transform: rotate(-8deg)
  }
  35% {
    transform: rotate(7deg);
  }
  40% {
    transform: rotate(-6deg);
  }
  45% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-4deg)
  }
  55% {
    transform: rotate(3deg);
  }
  60% {
    transform: rotate(-2deg);
  }
  65% {
    transform: rotate(1deg);
  }
}
</style>
