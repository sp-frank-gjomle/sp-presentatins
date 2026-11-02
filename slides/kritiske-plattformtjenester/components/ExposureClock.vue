<script setup lang="ts">
import { useNav } from '@slidev/client'

// step 0: normal dag, 1: nedetid-scenario vokser frem, 2: konklusjon
withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()
const hours = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48]
</script>

<template>
  <div class="exposure" :class="{ live: !isPrintMode }">
    <div class="axis">
      <span v-for="h in hours" :key="h" :style="{ left: `${(h / 48) * 100}%` }">{{ h }}t</span>
    </div>

    <div class="row">
      <div class="label">
        <span class="i-carbon:checkmark-filled ok" /> Normal dag
      </div>
      <div class="track">
        <div class="seg patch" style="width: 8.3%">Patch</div>
        <div class="seg roll" style="width: 8.3%">Utrulling</div>
        <div class="done">Lukket etter ~8 timer</div>
      </div>
    </div>

    <div class="row" :class="{ pending: step < 1 }">
      <div class="label">
        <span class="i-carbon:close-filled bad" /> Git / pakkebrønn nede
      </div>
      <div class="track">
        <div class="seg open" :style="{ width: step >= 1 ? '100%' : '0%' }">
          <span>Sårbarheten står åpen …</span>
        </div>
        <div class="arrow">?</div>
      </div>
    </div>

    <div class="note" :class="{ pending: step < 2 }">
      <span class="i-carbon:warning-alt" />
      Hver time med nedetid er en time ekstra der angripere kan utnytte en kjent sårbarhet.
    </div>
  </div>
</template>

<style scoped>
.exposure {
  padding: 8px 4px;
}
.axis {
  position: relative;
  height: 22px;
  margin-left: 230px;
  margin-right: 36px;
  font-size: 0.7rem;
  opacity: 0.6;
  font-family: monospace;
}
.axis span {
  position: absolute;
  transform: translateX(-50%);
}
.row {
  display: flex;
  align-items: center;
  margin: 18px 0;
}
.pending {
  opacity: 0;
}
.live .row,
.live .note {
  transition: opacity 0.5s;
}
.live .open {
  transition: width 2.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.label {
  width: 230px;
  flex-shrink: 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}
.ok {
  color: var(--sp-success);
}
.bad {
  color: var(--sp-danger);
}
.track {
  position: relative;
  flex: 1;
  margin-right: 36px;
  height: 46px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background: repeating-linear-gradient(90deg, transparent 0 calc(100% / 12 - 1px), var(--sp-shadow) calc(100% / 12 - 1px) calc(100% / 12));
}
.seg {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0d1117;
  white-space: nowrap;
  overflow: hidden;
}
.patch {
  background: var(--sp-warning);
  border-radius: 8px 0 0 8px;
}
.roll {
  background: var(--sp-success);
  border-radius: 0 8px 8px 0;
}
.done {
  margin-left: 14px;
  font-size: 0.9rem;
  color: var(--sp-success);
  font-weight: 700;
}
.open {
  justify-content: flex-start;
  padding-left: 14px;
  border-radius: 8px;
  color: #fff;
  font-size: 0.95rem;
  background: linear-gradient(90deg, var(--sp-warning), var(--sp-danger) 25%);
}
.arrow {
  position: absolute;
  right: -30px;
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--sp-danger);
}
.note {
  margin-top: 26px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 2px solid var(--sp-danger);
  background: color-mix(in srgb, var(--sp-danger) 12%, transparent);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
