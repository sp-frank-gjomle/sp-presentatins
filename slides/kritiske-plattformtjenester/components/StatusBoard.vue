<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { apps, core, tools } from './stack'

// step 0: alt grønt, step 1: Git og pakkebrønn faller, step 2: verktøyene stopper og applikasjonene mister vedlikehold
const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 })

const { isPrintMode } = useNav()

const coreDown = computed(() => props.step >= 1)
const toolsDown = computed(() => props.step >= 2)
const clock = computed(() => ['20:57', '20:58', '21:02'][Math.min(props.step, 2)])
const summary = computed(() => {
  if (props.step === 0) return 'Alle systemer operative'
  if (props.step === 1) return '2 tjenester nede'
  return '7 systemer nede · 3 uten vedlikehold'
})
</script>

<template>
  <div class="board" :class="{ live: !isPrintMode }">
    <div class="topbar">
      <span class="i-carbon:dashboard" />
      <span>Driftsstatus</span>
      <span class="clock">{{ clock }}</span>
      <span class="summary" :class="{ bad: step > 0 }">{{ summary }}</span>
    </div>

    <div class="cap">Grunnmur</div>
    <div class="row core">
      <div v-for="s in core" :key="s.id" class="card" :class="{ down: coreDown }">
        <span class="icon" :class="s.icon" />
        <div class="text">
          <div class="name">{{ s.name }}</div>
          <div class="sub">{{ s.sub }}</div>
        </div>
        <span class="badge">{{ coreDown ? 'NEDE' : 'OK' }}</span>
      </div>
    </div>

    <div class="cap">Verktøy for drift og vedlikehold</div>
    <div class="row tools">
      <div v-for="s in tools" :key="s.id" class="card small" :class="{ down: toolsDown }">
        <span class="icon" :class="s.icon" />
        <div class="text">
          <div class="name">{{ s.name }}</div>
          <div class="sub">{{ s.sub }}</div>
        </div>
        <span class="badge">{{ toolsDown ? 'STOPPET' : 'OK' }}</span>
      </div>
    </div>

    <div class="cap">Applikasjoner</div>
    <div class="row apps">
      <div v-for="s in apps" :key="s.id" class="card small" :class="{ warn: toolsDown }">
        <span class="icon" :class="s.icon" />
        <div class="text">
          <div class="name">{{ s.name }}</div>
          <div class="sub">{{ toolsDown ? 'Kjører – kan ikke vedlikeholdes' : s.sub }}</div>
        </div>
        <span class="badge">{{ toolsDown ? 'KJØRER' : 'OK' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board {
  border: 1px solid var(--sp-shadow);
  border-radius: 12px;
  padding: 12px 18px 14px;
}
.topbar {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.95rem;
  margin-bottom: 8px;
}
.clock {
  font-family: monospace;
  font-size: 1.1rem;
  color: var(--sp-primary);
}
.summary {
  margin-left: auto;
  font-weight: 700;
  color: var(--sp-success);
}
.summary.bad {
  color: var(--sp-danger);
}
.cap {
  margin: 8px 0 4px;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.65;
}
.row {
  display: grid;
  gap: 10px;
}
.core {
  grid-template-columns: 1fr 1fr;
}
.tools {
  grid-template-columns: repeat(5, 1fr);
}
.apps {
  grid-template-columns: repeat(3, 1fr);
}
.card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 2px solid var(--sp-success);
  background: color-mix(in srgb, var(--sp-success) 10%, transparent);
}
.card.small {
  flex-direction: column;
  text-align: center;
  gap: 4px;
  padding: 8px 6px;
}
.card.down {
  border-color: var(--sp-danger);
  background: color-mix(in srgb, var(--sp-danger) 18%, transparent);
}
.card.warn {
  border-color: var(--sp-warning);
  background: color-mix(in srgb, var(--sp-warning) 14%, transparent);
}
.icon {
  font-size: 1.6rem;
  flex-shrink: 0;
}
.small .icon {
  font-size: 1.3rem;
}
.text {
  flex: 1;
  line-height: 1.2;
}
.name {
  font-weight: 700;
  font-size: 0.95rem;
}
.sub {
  font-size: 0.72rem;
  opacity: 0.8;
}
.badge {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--sp-success);
  color: #0d1117;
}
.down .badge {
  background: var(--sp-danger);
  color: #fff;
}
.warn .badge {
  background: var(--sp-warning);
  color: #0d1117;
}

.live .card,
.live .badge,
.live .summary {
  transition: background 0.6s, border-color 0.6s, color 0.6s;
}
.live .card.small:nth-child(2) { transition-delay: 0.1s; }
.live .card.small:nth-child(3) { transition-delay: 0.2s; }
.live .card.small:nth-child(4) { transition-delay: 0.3s; }
.live .card.small:nth-child(5) { transition-delay: 0.4s; }
</style>
