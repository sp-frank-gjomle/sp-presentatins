<script setup lang="ts">
import { useNav } from '@slidev/client'

// step 1: tid brukt på å finne feilen, 2: tid brukt på å rette den
withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()
</script>

<template>
  <div class="ttf" :class="{ live: !isPrintMode }">
    <div class="cause">
      <span class="i-carbon:certificate ic" />
      <div>
        <div class="when">Neste morgen, kl. 08:20</div>
        <b>Årsak: et utløpt sertifikat på en CI/CD-runner</b>
      </div>
    </div>

    <div class="row" :class="{ pending: step < 1 }">
      <div class="label">Finne ut hva som var galt</div>
      <div class="track"><div class="bar find" :style="{ width: step >= 1 ? '100%' : '0%' }"><span>ca. 11 timer</span></div></div>
    </div>
    <div class="row" :class="{ pending: step < 2 }">
      <div class="label">Rette feilen</div>
      <div class="track"><div class="bar fix" :style="{ width: step >= 2 ? '2%' : '0%' }" /><span class="out">10 minutter</span></div>
    </div>

    <div class="caption" :class="{ pending: step < 3 }">
      Feilen var enkel. Det vanskelige var å finne noen som visste hvor de skulle lete.
    </div>
  </div>
</template>

<style scoped>
.cause {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  border-radius: 12px;
  border-left: 4px solid var(--sp-warning);
  background: color-mix(in srgb, var(--sp-warning) 10%, transparent);
  margin-bottom: 30px;
}
.ic {
  font-size: 2.6rem;
  color: var(--sp-warning);
}
.when {
  font-family: monospace;
  font-weight: 700;
  color: var(--sp-primary);
}
.cause b {
  font-size: 1.25rem;
}
.row {
  display: grid;
  grid-template-columns: 240px 1fr;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
}
.label {
  font-weight: 700;
  font-size: 1.05rem;
}
.track {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
}
.bar {
  height: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  font-weight: 700;
  min-width: 10px;
}
.bar.find {
  background: color-mix(in srgb, var(--sp-danger) 70%, transparent);
}
.bar.fix {
  background: var(--sp-success);
  padding: 0;
}
.out {
  margin-left: 12px;
  font-weight: 700;
  color: var(--sp-success);
}
.caption {
  margin-top: 26px;
  padding: 10px 16px;
  border-radius: 10px;
  border: 2px solid var(--sp-danger);
  color: var(--sp-danger);
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
}
.pending {
  opacity: 0;
}
.live .row,
.live .caption {
  transition: opacity 0.5s;
}
.live .bar {
  transition: width 1s ease-out;
}
</style>
