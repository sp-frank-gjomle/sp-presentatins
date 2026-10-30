<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const brand = 'Automasjon i drift og vedlikehold'
const { $page, $nav, $frontmatter } = useSlideContext()

const isCover = computed(() => $frontmatter.layout === 'cover')
const footer = computed(() => ($frontmatter.topic ? `${brand} · ${$frontmatter.topic}` : brand))
</script>

<template>
  <svg v-if="isCover" class="sp-logo-full" viewBox="0 0 314.2 58" aria-label="Sykehuspartner">
    <g fill="#6cace4">
      <circle cx="29" cy="7.2" r="7.2" />
      <circle cx="29" cy="29" r="7.2" />
      <circle cx="7.1" cy="29" r="7.2" />
    </g>
    <g fill="#fff">
      <circle cx="50.8" cy="29" r="7.2" />
      <circle cx="29" cy="50.8" r="7.2" />
    </g>
    <text x="75" y="36.1" fill="#fff" font-size="27" font-weight="700" textLength="239" lengthAdjust="spacingAndGlyphs">SYKEHUSPARTNER</text>
  </svg>
  <template v-else>
    <svg class="sp-logo-small" viewBox="0 0 58 58" aria-label="Sykehuspartner">
      <g fill="#6cace4">
        <circle cx="29" cy="7.2" r="7.2" />
        <circle cx="29" cy="29" r="7.2" />
        <circle cx="7.1" cy="29" r="7.2" />
      </g>
      <g fill="#fff">
        <circle cx="50.8" cy="29" r="7.2" />
        <circle cx="29" cy="50.8" r="7.2" />
      </g>
    </svg>
    <div class="sp-footer">{{ footer }}</div>
    <div class="sp-page">{{ $page }} / {{ $nav.total }}</div>
  </template>
</template>
