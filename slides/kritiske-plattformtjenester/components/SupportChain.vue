<script setup lang="ts">
import { useNav } from '@slidev/client'

// Ledd i vises når step >= i. Skalaen vises sammen med siste ledd.
// Fargen går gradvis fra primary (selvhjelp) til lilla (support).
const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()

const links = [
  { name: 'Konsumenten', sub: 'Teamet som drifter applikasjonen', icon: 'i-carbon:user-avatar-filled', q: 'Bygget feiler. Er det meg eller tjenesten?' },
  { name: 'Selvbetjening', sub: 'Dokumentasjon og automasjon', icon: 'i-carbon:book', q: 'Finner jeg svaret selv?' },
  { name: 'Driftssenteret', sub: 'Døgnbemannet førstelinje', icon: 'i-carbon:help-desk', q: 'Kan førstelinjen feilsøke og rette?' },
  { name: 'Fagkompetanse', sub: 'Git og pakkebrønn', icon: 'i-carbon:user-admin', q: 'Hvem kan feilsøke og overstyre?' },
]
const mix = (i: number) => `color-mix(in srgb, var(--chain-purple) ${Math.round((i / (links.length - 1)) * 100)}%, var(--sp-primary))`
</script>

<template>
  <div class="chain" :class="{ live: !isPrintMode }">
    <div class="row">
      <template v-for="(l, i) in links" :key="l.name">
        <span v-if="i > 0" class="i-carbon:arrow-right arrow" :style="{ color: mix(i - 0.5) }" :class="{ pending: props.step < i }" />
        <div class="link" :style="{ '--c': mix(i) }" :class="{ pending: props.step < i }">
          <span :class="l.icon" class="ic" />
          <b>{{ l.name }}</b>
          <small>{{ l.sub }}</small>
          <div class="q">{{ l.q }}</div>
        </div>
      </template>
    </div>
    <div class="scale" :class="{ pending: step < links.length - 1 }">
      <span>Selvhjelp</span>
      <div class="grad" />
      <span>Support</span>
    </div>
  </div>
</template>

<style scoped>
.chain {
  --chain-purple: #b48ef0;
}
.row {
  display: grid;
  grid-template-columns: 1fr 32px 1fr 32px 1fr 32px 1fr;
  align-items: stretch;
  gap: 4px;
}
.arrow {
  align-self: center;
  font-size: 1.6rem;
}
.link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  padding: 16px 10px 12px;
  border-radius: 14px;
  border: 2px solid var(--c);
  background: color-mix(in srgb, var(--c) 10%, transparent);
  line-height: 1.25;
}
.ic {
  font-size: 2.6rem;
  color: var(--c);
}
.link b {
  font-size: 1.1rem;
}
.link small {
  font-size: 0.78rem;
  opacity: 0.8;
}
.q {
  margin-top: auto;
  padding-top: 10px;
  font-size: 0.88rem;
  font-style: italic;
}
.scale {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 22px;
  font-size: 0.95rem;
  font-weight: 700;
}
.scale span:first-child {
  color: var(--sp-primary);
}
.scale span:last-child {
  color: var(--chain-purple);
}
.grad {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--sp-primary), var(--chain-purple));
}
.pending {
  opacity: 0;
}
.live .link,
.live .arrow,
.live .scale {
  transition: opacity 0.5s;
}
</style>
