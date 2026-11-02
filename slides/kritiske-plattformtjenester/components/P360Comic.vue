<script setup lang="ts">
import { useNav } from '@slidev/client'
import CrossBadge from './CrossBadge.vue'
import FlowArrow from './FlowArrow.vue'

// part 1: rute 1–3, part 2: rute 4–6. step 1–3: én rute per klikk, step 4: varselet nederst.
withDefaults(defineProps<{ part?: 1 | 2; step?: number }>(), { part: 1, step: 0 })
const { isPrintMode } = useNav()
</script>

<template>
  <div class="comic" :class="{ live: !isPrintMode }">
    <div class="panels">
      <template v-if="part === 1">
        <div class="panel" :class="{ pending: step < 1 }">
          <div class="num">1</div>
          <div class="scene">
            <div class="chip bad"><span class="i-carbon:document ic" />Public 360<small>Feil</small></div>
            <div class="row">
              <div class="chip"><span class="i-carbon:headset ic" />Driftssenter</div>
              <div class="aw"><FlowArrow /></div>
              <div class="chip"><span class="i-carbon:user-avatar-filled ic" />Tekniker A</div>
            </div>
          </div>
          <p>Feil i Public 360. Driftssenteret varsler driftsansvarlig, Tekniker A</p>
        </div>

        <div class="panel" :class="{ pending: step < 2 }">
          <div class="num">2</div>
          <div class="scene">
            <div class="row">
              <div class="chip bad"><span class="i-simple-icons:gitlab ic" />Git<small>Nede</small><CrossBadge class="x" /></div>
              <div class="chip bad"><span class="i-carbon:package ic" />Pakkebrønn<small>Nede</small><CrossBadge class="x" /></div>
            </div>
            <div class="row">
              <div class="chip"><span class="i-carbon:user-avatar-filled ic" />Tekniker A</div>
              <div class="aw"><FlowArrow /></div>
              <div class="chip warn"><span class="i-carbon:folder ic" />Lokal kopi</div>
            </div>
          </div>
          <p>Tekniker A finner ut at Git og pakkebrønn er nede, men har en lokal kopi av koden</p>
        </div>

        <div class="panel" :class="{ pending: step < 3 }">
          <div class="num">3</div>
          <div class="scene">
            <div class="row">
              <div class="chip"><span class="i-carbon:document-download ic" />Installasjonsfiler</div>
              <div class="chip warn"><span class="i-carbon:folder-details ic" />Lokal kopi<small>+ endringer</small></div>
            </div>
            <div class="vw"><FlowArrow dir="down" /></div>
            <div class="chip ok wide"><span class="i-carbon:document ic" />Public 360<small>Målsystem: oppe igjen</small></div>
          </div>
          <p>Tekniker A legger installasjonsfiler manuelt på målsystemet, og bruker lokal kopi og endringer til å få tjenesten opp igjen</p>
        </div>
      </template>

      <template v-else>
        <div class="panel" :class="{ pending: step < 1 }">
          <div class="num">4</div>
          <div class="scene">
            <div class="row">
              <div class="chip warn"><span class="i-carbon:folder-details ic" />Lokal kopi<small>+ endringer</small></div>
              <div class="aw long"><FlowArrow blocked /></div>
              <div class="chip bad"><span class="i-simple-icons:gitlab ic" />Git<small>Nede</small></div>
            </div>
            <div class="chip"><span class="i-carbon:user-avatar-filled ic" />Tekniker A</div>
          </div>
          <p>Tekniker A får ikke lagt de endrede filene i Git, siden Git er nede</p>
        </div>

        <div class="panel" :class="{ pending: step < 2 }">
          <div class="time"><span class="i-carbon:time" /> Flere uker senere</div>
          <div class="num">5</div>
          <div class="scene">
            <div class="row tight">
              <div class="chip yellow"><span class="i-carbon:user-avatar-filled ic" />Tekniker B</div>
              <div class="aw"><FlowArrow /></div>
              <div class="chip"><span class="i-carbon:flow ic" />CI/CD</div>
              <div class="aw"><FlowArrow /></div>
              <div class="chip bad"><span class="i-carbon:document ic" />Public 360<small>Knekker</small></div>
            </div>
            <div class="vw"><FlowArrow dir="up" /></div>
            <div class="chip"><span class="i-simple-icons:gitlab ic" />Git<small>Gammel kode</small></div>
          </div>
          <p>Gammel kode i Git. Tekniker B trigger automasjon i CI/CD som knekker Public 360</p>
        </div>

        <div class="panel" :class="{ pending: step < 3 }">
          <div class="num">6</div>
          <div class="scene">
            <div class="row">
              <div class="chip yellow"><span class="i-carbon:user-avatar-filled ic" />Tekniker B</div>
              <div class="aw long"><FlowArrow blocked /></div>
              <div class="chip"><span class="i-carbon:user-avatar-filled ic" />Tekniker A</div>
            </div>
            <div class="chip bad wide"><span class="i-carbon:phone ic" />Vedlikehold avbrutt</div>
          </div>
          <p>Tekniker B får ikke tak i Tekniker A, og må avbryte vedlikeholdet</p>
        </div>
      </template>
    </div>

    <div class="banner" :class="[part === 1 ? 'warning' : 'danger', { pending: step < 4 }]">
      <span :class="part === 1 ? 'i-carbon:warning-alt-filled' : 'i-carbon:warning-filled'" class="bi" />
      {{ part === 1 ? 'Å jobbe uten Git og pakkebrønn krever mange manuelle tiltak' : 'Manuelt arbeid som ikke er i Git, samsvarer ikke med virkeligheten' }}
    </div>
  </div>
</template>

<style scoped>
.panels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: 320px;
}
.panel {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 22px 14px 14px;
  border-radius: 12px;
  border: 2px solid color-mix(in srgb, var(--sp-primary) 60%, transparent);
  background: color-mix(in srgb, var(--sp-primary) 8%, transparent);
}
.num {
  position: absolute;
  top: -13px;
  left: -10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--sp-primary);
  color: #0d1117;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}
.time {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 12px;
  border-radius: 999px;
  background: #0d1117;
  border: 2px solid var(--sp-primary);
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
}
.scene {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
}
.aw {
  flex: 0 0 30px;
}
.aw.long {
  flex-basis: 60px;
}
.row.tight .aw {
  flex-basis: 22px;
}
.row.tight .chip {
  font-size: 0.74rem;
  padding: 5px 4px;
}
.vw {
  height: 30px;
}
.chip {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  padding: 6px 7px;
  min-width: 0;
  border-radius: 8px;
  border: 2px solid var(--sp-shadow);
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1.15;
}
.chip.wide {
  min-width: 160px;
}
.chip small {
  font-weight: 500;
  opacity: 0.85;
  font-size: 0.68rem;
}
.chip.ok {
  border-color: var(--sp-success);
  background: color-mix(in srgb, var(--sp-success) 14%, transparent);
}
.chip.warn {
  border-color: var(--sp-warning);
  background: color-mix(in srgb, var(--sp-warning) 14%, transparent);
}
.chip.bad {
  border-color: var(--sp-danger);
  background: color-mix(in srgb, var(--sp-danger) 20%, transparent);
}
.ic {
  font-size: 1.9rem;
  color: var(--sp-primary);
}
.yellow .ic {
  color: var(--sp-warning);
}
.bad .ic {
  color: #fff;
}
.x {
  position: absolute;
  top: -13px;
  right: -10px;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
}
p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.3;
}
.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 18px;
  padding: 10px 14px;
  border-radius: 12px;
  border: 2px solid var(--c);
  background: color-mix(in srgb, var(--c) 14%, transparent);
  font-weight: 700;
  font-size: 1.1rem;
}
.banner .bi {
  color: var(--c);
  font-size: 1.6rem;
}
.warning {
  --c: var(--sp-warning);
}
.danger {
  --c: var(--sp-danger);
}
.pending {
  opacity: 0;
}
.live .panel,
.live .banner {
  transition: opacity 0.6s;
}
</style>
