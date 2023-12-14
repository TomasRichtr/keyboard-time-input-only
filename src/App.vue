<script setup lang="ts">
import TimeInput from './components/TimeInput.vue'
import FormatSwitcher from '@/components/FormatSwitcher.vue'
import KeyPushedTracker from '@/components/KeyPushedTracker.vue'
</script>

<template>
  <main>
    <KeyPushedTracker class="key-pushed-tracker" />
    <FormatSwitcher class="format-switcher" />
    <TimeInput />
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
}
.format-switcher {
  margin-top: 15px;
}
.key-pushed-tracker {
  margin-bottom: 15px;
}
</style>
