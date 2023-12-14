<script setup lang="ts">
import TimeInput from './components/TimeInput.vue'
import FormatSwitcher from '@/components/FormatSwitcher.vue'
import KeyPushedTracker from '@/components/KeyPushedTracker.vue'
import TimeToSave from '@/components/TimeToSave.vue'
</script>

<template>
  <header>
    <TimeToSave />
    <FormatSwitcher class="format-switcher" />
    <KeyPushedTracker class="key-pushed-tracker" />
  </header>
  <main>
    <TimeInput />
  </main>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  column-gap: 20px;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  height: fit-content;
}
main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
}
</style>
