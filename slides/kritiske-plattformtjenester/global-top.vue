<script setup lang="ts">
const hiddenLayouts = ['cover', 'section', 'end']
</script>

<template>
  <div v-if="!hiddenLayouts.includes($slidev.nav.currentLayout)" class="slide-number">
    {{ $slidev.nav.currentPage }}
  </div>
</template>

<style scoped>
.slide-number {
  position: absolute;
  right: 28px;
  bottom: 16px;
  font-size: 0.9rem;
  opacity: 0.55;
  font-variant-numeric: tabular-nums;
}
</style>
