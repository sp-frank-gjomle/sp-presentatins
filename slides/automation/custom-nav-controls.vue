<script setup lang="ts">
import { animationsEnabled, toggleAnimations } from './animations'
</script>

<template>
  <button
    class="slidev-icon-btn"
    :title="animationsEnabled ? 'Slå av animasjoner (A)' : 'Slå på animasjoner (A)'"
    @click="toggleAnimations"
  >
    <div v-if="animationsEnabled" class="i-carbon:pause-outline" />
    <div v-else class="i-carbon:play-outline" />
  </button>
</template>
