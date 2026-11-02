<script setup lang="ts">
import { useNav } from '@slidev/client'
import FlowArrow from './FlowArrow.vue'

// step 0: alt grønt, 1: grunnmur og verktøy røde og applikasjoner gule, 2: tekniker forsøker manuell drift, 3: brannmur mot internett
const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()

const layers = [
  { id: 'apps', name: 'Applikasjoner', items: 'DIPS · MetaVision · Public 360' },
  { id: 'tools', name: 'Verktøy', items: 'ArgoCD · AWX · CI/CD · Backport · Scripts' },
  { id: 'core', name: 'Grunnmur', items: 'Git · Pakkebrønn' },
]

function state(id: string) {
  if (props.step === 0) return 'ok'
  return id === 'apps' ? 'warn' : 'down'
}

const captions = [
  'Alt fungerer som normalt',
  'Grunnmuren er ustabil: verktøyene stopper, applikasjonene kjører videre',
  'Drift og vedlikehold stopper opp',
  'Ingen reservevei utenfra i et air-gapped miljø',
]
</script>

<template>
  <div class="sum" :class="{ live: !isPrintMode }">
    <div class="grid">
      <div class="person" :class="{ pending: step < 2 }">
        <span class="i-carbon:user-avatar-filled icon" />
        <small>Tekniker prøver manuell drift</small>
      </div>
      <div class="link" :class="{ pending: step < 2 }">
        <FlowArrow blocked />
      </div>

      <div class="layers">
        <div v-for="l in layers" :key="l.id" class="layer" :class="state(l.id)">
          <b>{{ l.name }}</b>
          <span>{{ l.items }}</span>
        </div>
      </div>

      <div class="wall" :class="{ pending: step < 3 }">
        <div class="bar" />
        <span class="fwwrap"><span class="i-carbon:firewall fw" /></span>
        <small>Brannmur</small>
      </div>
      <div class="ext" :class="{ pending: step < 3 }">
        <FlowArrow blocked dir="left" />
      </div>
      <div class="net" :class="{ pending: step < 3 }">
        <span class="i-carbon:cloud icon" />
        <b>Internett</b>
      </div>
    </div>

    <div class="caption" :class="step === 0 ? 'good' : 'bad'">{{ captions[Math.min(step, 3)] }}</div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 130px 1fr 340px 64px 1fr 110px;
  align-items: center;
}
.person {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  line-height: 1.2;
  font-size: 0.85rem;
}
.icon {
  font-size: 3.4rem;
  color: var(--sp-primary);
}
.link {
  grid-column: 2;
  padding: 0 8px;
}
.layers {
  grid-column: 3;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.layer {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 14px 8px;
  border-radius: 10px;
  border: 2px solid var(--sp-success);
  background: color-mix(in srgb, var(--sp-success) 12%, transparent);
  line-height: 1.25;
}
.layer b {
  font-size: 1.2rem;
}
.layer span {
  font-size: 0.85rem;
  opacity: 0.85;
}
.layer.down {
  border-color: var(--sp-danger);
  background: color-mix(in srgb, var(--sp-danger) 22%, transparent);
}
.layer.warn {
  border-color: var(--sp-warning);
  background: color-mix(in srgb, var(--sp-warning) 16%, transparent);
}
.wall {
  grid-column: 4;
  position: relative;
  align-self: stretch;
  display: flex;
  justify-content: center;
}
.bar {
  width: 10px;
  height: 100%;
  border-radius: 3px;
  background: repeating-linear-gradient(0deg, #cbd5e1 0 22px, #64748b 22px 24px);
}
.fwwrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  padding: 6px;
  border-radius: 50%;
  background: #0d1117;
}
.fw {
  font-size: 2.6rem;
  color: #fff;
}
.wall small {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  white-space: nowrap;
}
.ext {
  grid-column: 5;
  padding: 0 8px;
}
.net {
  grid-column: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.pending {
  opacity: 0;
}
.caption {
  margin-top: 26px;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 1.15rem;
  font-weight: 700;
  text-align: center;
}
.caption.good {
  border: 2px solid var(--sp-success);
  color: var(--sp-success);
}
.caption.bad {
  border: 2px solid var(--sp-danger);
  color: var(--sp-danger);
}
.live .layer,
.live .caption {
  transition: background 0.6s, border-color 0.6s, color 0.6s;
}
.live .person,
.live .link,
.live .wall,
.live .ext,
.live .net {
  transition: opacity 0.6s;
}
</style>
