<script setup lang="ts">
import TimeInput from './components/TimeInput.vue'
import FormatSwitcher from '@/components/FormatSwitcher.vue'
import KeyPushedTracker from '@/components/KeyPushTracker.vue'
import TimeToSave from '@/components/TimeToSave.vue'
</script>

<template>
  <header>
    <TimeToSave />
    <KeyPushedTracker class="key-pushed-tracker" />
    <FormatSwitcher class="format-switcher" />
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
  margin-bottom: 2rem;
  row-gap: 1rem;
  border-bottom: 2px solid gray;
  padding: 2rem;
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
