<script setup lang="ts">
import { configs, useDrawings, useNav } from '@slidev/client'
import { onBeforeUnmount, onMounted } from 'vue'
import { animationsEnabled, toggleAnimations } from './animations'

// Tast P slår tegnemodus (penn) av/på. Esc avslutter også tegnemodus.
const { drawingEnabled } = useDrawings()
const { isPresenter } = useNav()

function onKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement | null
  if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || e.key.toLowerCase() !== 'p')
    return
  if (target?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName ?? ''))
    return
  if (!configs.drawings.enabled || (configs.drawings.presenterOnly && !isPresenter.value))
    return
  drawingEnabled.value = !drawingEnabled.value
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
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
