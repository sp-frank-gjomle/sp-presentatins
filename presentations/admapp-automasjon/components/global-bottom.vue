<template>
  <footer
    v-if="$nav.currentLayout !== 'cover' && $nav.currentLayout !== 'end'"
    class="absolute bottom-0 left-0 right-0 flex items-center justify-between px-10 py-3 text-xs opacity-70 pointer-events-none"
  >
    <span class="sp-footer-logo">Sykehuspartner</span>
    <span>{{ $nav.currentPage }} / {{ $nav.total }}</span>
  </footer>
</template>
