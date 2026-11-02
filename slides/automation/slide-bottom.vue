<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// Logo og sidetall kommer fra temaet og global-top.vue. Her vises bare footer med deckets tittel og slidens `topic`.
const hiddenLayouts = ['cover', 'section', 'end']
const { $slidev, $frontmatter } = useSlideContext()

const brand = computed(() => $slidev.configs.title)
const footer = computed(() => ($frontmatter.topic ? `${brand.value} · ${$frontmatter.topic}` : brand.value))
</script>

<template>
  <div v-if="!hiddenLayouts.includes($frontmatter.layout)" class="sp-footer">
    {{ footer }}
  </div>
</template>

<style scoped>
.sp-footer {
  position: absolute;
  z-index: 10;
  left: 2rem;
  bottom: 16px;
  font-size: 0.75rem;
  opacity: 0.55;
}
</style>
