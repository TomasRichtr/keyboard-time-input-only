<script setup lang="ts">
import { useTimeFormat } from '@/store/time-format'
import { TimeFormat } from '@/enums/time-format'
import { storeToRefs } from 'pinia'

const timeFormatStore = useTimeFormat()
const { timeFormat } = storeToRefs(timeFormatStore)
const { setTimeFormat } = timeFormatStore
</script>

<template>
  <div class="format-switcher">
    <span
      class="format-switcher__opt"
      :class="{ active: timeFormat === TimeFormat.H24 }"
      @click="setTimeFormat(TimeFormat.H24)"
      >HH:mm</span
    >
    <span>/</span>
    <span
      class="format-switcher__opt"
      :class="{ active: timeFormat === TimeFormat.H12 }"
      @click="setTimeFormat(TimeFormat.H12)"
      >HH:mm a</span
    >
  </div>
</template>

<style scoped>
.format-switcher {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  cursor: pointer;
  font-size: 1.5rem;
}
.format-switcher__opt:hover {
  text-decoration: underline;
  color: blue;
}
.active {
  font-weight: bold;
}
</style>
