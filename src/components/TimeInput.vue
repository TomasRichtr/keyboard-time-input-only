<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTimeFormat } from '@/store/time-format'
import { TimeFormat, TimePlaceholder } from '@/enums/time-format'

const { timeFormat } = storeToRefs(useTimeFormat())

const userInput = ref('')
let previousInput = ''

// Function to validate and format input based on the time format
const validateAndFormatInput = (input) => {
  if (input.length < previousInput.length) {
    // User is deleting characters
    previousInput = input
    return input
  }

  // Remove all non-numeric characters
  const numbersOnly = input.replace(/[^\d]/g, '')

  // Extract hours and minutes
  let hours = numbersOnly.substring(0, 2)
  let minutes = numbersOnly.substring(2, 4)

  // Validate and format hours
  if (hours.length === 2) {
    let maxHours = timeFormat.value === TimeFormat.H24 ? 23 : 12
    hours = Math.min(parseInt(hours) || 0, maxHours)
      .toString()
      .padStart(2, '0')
  }

  // Validate and format minutes
  if (minutes.length === 2) {
    minutes = Math.min(parseInt(minutes) || 0, 59)
      .toString()
      .padStart(2, '0')
  }

  // Combine hours and minutes
  let formatted = hours
  if (hours.length === 2 && minutes.length > 0) {
    formatted += `:${minutes}`
  }

  if (timeFormat.value === TimeFormat.H12 && formatted.length >= 5) {
    if (input.toLowerCase().includes('a')) {
      formatted += ' am'
    } else if (input.toLowerCase().includes('p')) {
      formatted += ' pm'
    }
  }

  previousInput = formatted
  return formatted
}

watch(userInput, (newValue) => {
  userInput.value = validateAndFormatInput(newValue)
})
watch(timeFormat, () => {
  userInput.value = ''
  timeInput.value?.focus()
})

const placeholder = computed(() => {
  return timeFormat.value === TimeFormat.H24 ? TimePlaceholder.H24 : TimePlaceholder.H12
})

const timeInput = ref<HTMLInputElement>()
onMounted(() => {
  timeInput.value?.focus()
})

const setAmPm = () => {
  if (timeFormat.value === TimeFormat.H24) return

  if (
    !userInput.value.toLowerCase().includes('p') &&
    !userInput.value.toLowerCase().includes('a')
  ) {
    userInput.value += 'a'
  }
}
</script>

<template>
  <input v-model="userInput" :placeholder="placeholder" ref="timeInput" @blur="setAmPm" />
</template>

<style scoped>
input {
  width: 350px;
  height: 50px;
  padding: 10px;
  font-size: 50px;
  text-align: center;
  border-radius: 10px;
}
</style>
