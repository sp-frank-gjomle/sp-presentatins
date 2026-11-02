<script setup lang="ts">
import { useNav } from '@slidev/client'

// Søyle i vises når step > i. Siste steg viser bunnteksten.
withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()

const pillars = [
  {
    who: 'Konsumentene',
    title: 'Hjelp til selvhjelp',
    icon: 'i-carbon:book',
    points: ['Dokumentasjon av vanlige feil og løsninger', 'Selvbetjening for enkle problemer, som å fornye tokens', 'Status: er det meg eller tjenesten?'],
    volume: 'Flest saker løses her',
    width: '100%',
  },
  {
    who: 'Driftssenteret',
    title: 'En førstelinje som kan handle',
    icon: 'i-carbon:help-desk',
    points: ['Runbooks for kjente feilsituasjoner', 'Automasjon de trygt kan kjøre selv', 'Tydelige kriterier for å eskalere'],
    volume: 'Mange saker løses her',
    width: '62%',
  },
  {
    who: 'Fagpersonell',
    title: 'Noen som kan svare',
    icon: 'i-carbon:user-admin',
    points: ['Feilsøking som krever dyp kompetanse', 'Administrative overstyringer: tilgang, pakker, sertifikater', 'Må kunne nås når feilen oppstår'],
    volume: 'Få, men kritiske saker',
    width: '28%',
  },
]
</script>

<template>
  <div class="pillars" :class="{ live: !isPrintMode }">
    <div class="grid">
      <div v-for="(p, i) in pillars" :key="p.who" class="pillar" :class="{ pending: step <= i }">
        <span :class="p.icon" class="ic" />
        <div class="who">{{ p.who }}</div>
        <b>{{ p.title }}</b>
        <ul>
          <li v-for="pt in p.points" :key="pt">{{ pt }}</li>
        </ul>
        <div class="vol">
          <div class="track"><div class="fill" :style="{ width: p.width }" /></div>
          <small>{{ p.volume }}</small>
        </div>
      </div>
    </div>
    <div class="caption" :class="{ pending: step <= pillars.length }">
      Målet: de fleste feil løses før noen må ringe en fagperson
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.pillar {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  padding: 16px 16px 14px;
  border-radius: 14px;
  border-top: 4px solid var(--sp-primary);
  background: color-mix(in srgb, var(--sp-primary) 10%, transparent);
  line-height: 1.25;
}
.ic {
  font-size: 2.6rem;
  color: var(--sp-primary);
}
.who {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.75;
}
.pillar b {
  font-size: 1.15rem;
}
.pillar ul {
  align-self: stretch;
  text-align: left;
  margin: 8px 0 0;
  padding-left: 18px;
  flex: 1;
}
.pillar li {
  font-size: 0.88rem;
  margin: 0 0 6px;
}
.vol {
  align-self: stretch;
  margin-top: 6px;
}
.track {
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
}
.fill {
  height: 100%;
  border-radius: 4px;
  background: var(--sp-success);
}
.vol small {
  font-size: 0.75rem;
  opacity: 0.8;
}
.caption {
  margin-top: 16px;
  padding: 10px 16px;
  border-radius: 10px;
  border: 2px solid var(--sp-success);
  color: var(--sp-success);
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
}
.pending {
  opacity: 0;
}
.live .pillar,
.live .caption {
  transition: opacity 0.5s;
}
</style>
