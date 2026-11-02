<script setup lang="ts">
import { useNav } from '@slidev/client'

// step 0: årsak, 1: ingen patching/utrulling/automasjon, 2: applikasjonene kjører men kan ikke vedlikeholdes, 3: konsekvenser, 4: økt risiko
withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()
</script>

<template>
  <div class="flow" :class="{ live: !isPrintMode }">
    <div class="node cause">
      <span class="i-carbon:close-filled ic" />
      Git eller pakkebrønn nede eller ustabil
    </div>

    <span class="i-carbon:arrow-right arrow" :class="{ pending: step < 1 }" />
    <div class="node tools" :class="{ pending: step < 1 }">
      <span class="i-carbon:settings-adjust ic" />
      Ingen patching, utrulling eller automasjon
    </div>

    <span class="i-carbon:arrow-right arrow" :class="{ pending: step < 2 }" />
    <div class="node apps" :class="{ pending: step < 2 }">
      <span class="i-carbon:application ic" />
      Applikasjonene kjører, men kan ikke patches eller oppgraderes
    </div>

    <span class="i-carbon:arrow-right arrow" :class="{ pending: step < 3 }" />
    <div class="split" :class="{ pending: step < 3 }">
      <div class="node warn small">Sårbarheter blir stående åpne</div>
      <div class="node warn small">Feil tar lengre tid å rette</div>
    </div>

    <span class="i-carbon:arrow-right arrow" :class="{ pending: step < 4 }" />
    <div class="node risk" :class="{ pending: step < 4 }">
      <span class="i-carbon:warning-filled ic" />
      Økt risiko over tid
    </div>
  </div>
</template>

<style scoped>
.flow {
  display: grid;
  grid-template-columns: 1fr 28px 1fr 28px 1.2fr 28px 1.1fr 28px 0.9fr;
  align-items: center;
  gap: 4px;
  min-height: 260px;
}
.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 6px;
  padding: 14px 8px;
  border-radius: 12px;
  border: 2px solid var(--sp-primary);
  background: color-mix(in srgb, var(--sp-primary) 12%, transparent);
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1.25;
  min-height: 110px;
}
.node.cause,
.node.risk {
  border-color: var(--sp-danger);
  background: color-mix(in srgb, var(--sp-danger) 22%, transparent);
}
.node.apps,
.node.warn {
  border-color: var(--sp-warning);
  background: color-mix(in srgb, var(--sp-warning) 14%, transparent);
}
.node.small {
  min-height: 70px;
}
.split {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ic {
  font-size: 1.8rem;
  color: var(--sp-primary);
}
.cause .ic,
.risk .ic {
  color: var(--sp-danger);
}
.apps .ic {
  color: var(--sp-warning);
}
.arrow {
  font-size: 1.6rem;
  color: var(--sp-primary);
}
.pending {
  opacity: 0;
}
.live .node,
.live .arrow,
.live .split {
  transition: opacity 0.6s;
}
</style>
