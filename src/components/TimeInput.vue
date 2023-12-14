<template>
  <div class="input-wrapper" :class="{ 'input-wrapper-focus': userInputFocus }">
    <div class="custom-placeholder" v-html="displayPlaceholder" ref="timeInputPlaceholder" />
    <input
      class="monospace-input"
      v-model="userInput"
      ref="timeInput"
      @blur="setAmPm"
      @focus="userInputFocus = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useTimeFormat } from '@/store/time-format'
import { TimeFormat, TimePlaceholder } from '@/enums/time-format'
import { useTimeInput } from '@/store/time-input'

const { timeFormat } = storeToRefs(useTimeFormat())
const { setTimeToSave } = useTimeInput()

const userInput = ref('')
const userInputFocus = ref(false)
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
  setTimeToSave(userInput.value)
})
watch(timeFormat, async () => {
  userInput.value = ''
  timeInput.value?.focus()

  await nextTick()
  alignInputWidthWithPlaceholder()
})

const placeholderText = computed(() => {
  return timeFormat.value === TimeFormat.H24 ? TimePlaceholder.H24 : TimePlaceholder.H12
})

const displayPlaceholder = computed(() => {
  let maskedPlaceholder = placeholderText.value.split('')
  for (let i = 0; i < userInput.value.length; i++) {
    if (userInput.value[i] !== ' ') {
      maskedPlaceholder[i] = '&nbsp;' // Replace with a non-breaking space
    }
  }
  return maskedPlaceholder.join('')
})

const timeInput = ref<HTMLInputElement>()
onMounted(() => {
  alignInputWidthWithPlaceholder()
  timeInput.value?.focus()
})

const setAmPm = () => {
  userInputFocus.value = false
  if (timeFormat.value === TimeFormat.H24) return

  if (
    !userInput.value.toLowerCase().includes('p') &&
    !userInput.value.toLowerCase().includes('a')
  ) {
    userInput.value += 'a'
  }
}

const timeInputPlaceholder = ref<HTMLDivElement>()

const alignInputWidthWithPlaceholder = () => {
  if (!timeInput.value) return

  timeInput.value.style.width = `${timeInputPlaceholder.value?.clientWidth}px`
}
</script>

<style scoped>
.input-wrapper {
  position: relative;
  height: 50px;
  padding: 10px;
  border: 1px solid gray;
  display: flex;
  justify-items: center;
  justify-content: center;
  border-radius: 10px;
}
.input-wrapper-focus {
  border: 4px solid black;
}

.monospace-input {
  font-family: 'Courier New', Courier, monospace;
  height: 50px;
  font-size: 2rem;
  text-align: left;
  border-radius: 10px;
  background-color: transparent;
  top: 0;
  left: 0;
  width: 150px;
  border: none;
}
.monospace-input:focus {
  outline: none;
  border: none;
}

.custom-placeholder {
  position: absolute;
  top: 0;
  height: 50px;
  padding-top: 10px;
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
  color: #aaa;
  pointer-events: none;
  white-space: pre; /* Preserve spaces and layout */
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
}
</style>
