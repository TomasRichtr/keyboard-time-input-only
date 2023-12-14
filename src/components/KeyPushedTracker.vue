<template>
  <div v-if="!!lastKeyPressed">
    <div class="key-pressed-label">Last Key Pressed:</div>
    <div class="key-pressed">{{ lastKeyPressed }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const lastKeyPressed = ref('')

const updateKey = (event) => {
  lastKeyPressed.value = event.key
}

onMounted(() => {
  window.addEventListener('keydown', updateKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', updateKey)
})
</script>

<style scoped>
.key-pressed-label {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.key-pressed {
  font-weight: bold;
  font-size: 3rem;
  text-align: center;
}
</style>
