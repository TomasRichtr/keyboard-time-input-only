<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTimeInput } from '@/store/time-input'

const { timeToSave } = storeToRefs(useTimeInput())
</script>

<template>
  <div class="saved-value-wrapper">
    <span class="saved-value-label">Saved Value:</span>
    <span class="saved-value">{{ timeToSave || '-' }}</span>
  </div>
</template>

<style scoped>
.saved-value {
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  margin-left: 10px;
}
.saved-value-label {
  font-size: 1.5rem;
  text-align: center;
}
</style>
