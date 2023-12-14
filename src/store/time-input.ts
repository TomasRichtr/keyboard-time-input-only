import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useTimeFormat } from '@/store/time-format'
import { TimeFormat } from '@/enums/time-format'

export const useTimeInput = defineStore('timeInput', () => {
  const timeToSave = ref('')
  const { timeFormat } = storeToRefs(useTimeFormat())
  const setTimeToSave = (time12h) => {
    if (timeFormat.value === TimeFormat.H24) {
      timeToSave.value = time12h
      return
    }
    // Extract hours, minutes and the AM/PM indicator
    const [time, modifier] = time12h.split(' ')
    let [hours, minutes] = time.split(':')

    // Convert string hours and minutes to numbers
    hours = parseInt(hours, 10)
    minutes = parseInt(minutes, 10)

    // Handle midnight
    if (hours === 12) {
      hours = 0
    }

    // Convert to 24-hour time if it's PM
    if (modifier?.toLowerCase() === 'pm') {
      hours = hours + 12
    }

    // Ensure hours are two digits
    if (hours < 10) {
      hours = '0' + hours
    }
    if (!hours || !minutes) {
      timeToSave.value = ''
      return
    }
    timeToSave.value = `${hours}:${minutes.toString().padStart(2, '0')}`
  }

  return { timeToSave, setTimeToSave }
})
