<template>
  <div class="key-pressed-wrapper">
    <span class="key-pressed-label">Last Key Pressed:</span>
    <span class="key-pressed">{{ lastKeyPressed || '-' }}</span>
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
  text-align: center;
}

.key-pressed {
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  margin-left: 10px;
}
</style>
