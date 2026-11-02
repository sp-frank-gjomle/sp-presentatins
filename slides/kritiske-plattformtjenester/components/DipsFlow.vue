<script setup lang="ts">
import { useNav } from '@slidev/client'
import CrossBadge from './CrossBadge.vue'
import FlowArrow from './FlowArrow.vue'

// step 0: normal tilstand, 1: CERT varsler, 2: patch klar, 3: Git nede og patchen stoppes, 4: sikkerhetsvinduet står åpent
const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()

const dips = () => (props.step === 0 ? 'ok' : 'warn')
const argo = () => (props.step >= 3 ? 'warn' : 'ok')
const git = () => (props.step >= 3 ? 'down' : 'ok')
</script>

<template>
  <div class="dips" :class="{ live: !isPrintMode }">
    <div class="grid">
      <div class="actor cert" :class="{ pending: step < 1 }">
        <span class="i-carbon:notification-filled icon alert" />
        <div>
          <b>CERT</b>
          <small>Kritisk sårbarhet publiseres<br>(CVSS 9.8)</small>
        </div>
      </div>
      <div class="side" :class="{ pending: step < 1 }">
        <FlowArrow />
      </div>
      <div class="box" :class="dips()">
        <span class="i-carbon:health-cross icon-white" />
        <div>
          <b>DIPS</b>
          <small>{{ step === 0 ? 'Kubernetes · kjører' : 'Kjører på sårbar versjon' }}</small>
        </div>
        <span v-if="step >= 1" class="tag">SÅRBAR</span>
      </div>

      <div class="up" :class="{ idle: step < 2 }">
        <FlowArrow dir="up" :blocked="step >= 3" />
        <span v-if="step >= 3" class="lbl">Kan ikke rulle ut ny versjon</span>
      </div>
      <div class="up" :class="{ idle: step < 2 }">
        <FlowArrow dir="down" :blocked="step >= 3" />
        <span v-if="step >= 3" class="lbl">Kan ikke hente manifest for DIPS</span>
      </div>

      <div class="box" :class="argo()">
        <span class="i-simple-icons:argo icon-white" />
        <div>
          <b>ArgoCD</b>
          <small>{{ step >= 3 ? 'GitOps Verktøy' : 'GitOps Verktøy' }}</small>
        </div>
      </div>

      <div class="actor" :class="{ pending: step < 2 }">
        <span class="i-carbon:user-avatar-filled icon" />
        <div>
          <b>Tekniker</b>
          <small>Patchen er klar og skal inn i Git</small>
        </div>
      </div>
      <div class="side" :class="{ pending: step < 2 }">
        <FlowArrow :blocked="step >= 3" />
      </div>
      <div class="box" :class="git()">
        <span class="i-simple-icons:git icon-white" />
        <div>
          <b>Git</b>
          <small>{{ step >= 3 ? 'DIPS Konfigurasjon' : 'DIPS Konfigurasjon' }}</small>
        </div>
        <CrossBadge v-if="step >= 3" class="x" />
      </div>
    </div>

    <div class="note" :class="{ pending: step < 4 }">
      Sikkerhetsvinduet står åpent: DIPS kjører videre på sårbar versjon
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 250px 120px 1fr;
  grid-template-rows: auto 56px auto 56px auto;
  align-items: center;
}
/* Rad 1: CERT – DIPS, rad 3: ArgoCD, rad 5: tekniker – Git. Piler mellom lagene ligger i kolonne 3. */
.grid > :nth-child(1) { grid-area: 1 / 1; }
.grid > :nth-child(2) { grid-area: 1 / 2; }
.grid > :nth-child(3) { grid-area: 1 / 3; }
.grid > :nth-child(4) { grid-area: 2 / 3; }
.grid > :nth-child(5) { grid-area: 4 / 3; }
.grid > :nth-child(6) { grid-area: 3 / 3; }
.grid > :nth-child(7) { grid-area: 5 / 1; }
.grid > :nth-child(8) { grid-area: 5 / 2; }
.grid > :nth-child(9) { grid-area: 5 / 3; }

.actor {
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1.2;
}
.actor b,
.box b {
  display: block;
  font-size: 1.05rem;
}
.actor small,
.box small {
  display: block;
  font-size: 0.8rem;
  opacity: 0.85;
}
.icon {
  font-size: 2.2rem;
  color: var(--sp-primary);
  flex-shrink: 0;
}
.icon-white {
  font-size: 2.2rem;
  flex-shrink: 0;
}
.icon.alert {
  color: var(--sp-danger);
}
.side {
  padding: 0 10px;
}
.box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
  padding: 12px 10px;
  border-radius: 10px;
  border: 2px solid var(--sp-success);
  background: color-mix(in srgb, var(--sp-success) 12%, transparent);
}
.box.down {
  border-color: var(--sp-danger);
  background: color-mix(in srgb, var(--sp-danger) 22%, transparent);
}
.box.warn {
  border-color: var(--sp-warning);
  background: color-mix(in srgb, var(--sp-warning) 16%, transparent);
}
.x {
  position: absolute;
  top: -14px;
  right: -10px;
}
.tag {
  position: absolute;
  top: -10px;
  right: 12px;
  padding: 1px 10px;
  border-radius: 999px;
  background: var(--sp-warning);
  color: #0d1117;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}
.up {
  position: relative;
  height: 100%;
}
.lbl {
  position: absolute;
  left: calc(50% + 28px);
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--sp-danger);
  white-space: nowrap;
}
.up.idle {
  opacity: 0.35;
}
.pending {
  opacity: 0;
}
.note {
  margin-top: 14px;
  padding: 10px 16px;
  border-radius: 10px;
  border: 2px solid var(--sp-danger);
  background: color-mix(in srgb, var(--sp-danger) 12%, transparent);
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
}
.live .box {
  transition: background 0.6s, border-color 0.6s, color 0.6s;
}
.live .actor,
.live .side,
.live .up,
.live .note {
  transition: opacity 0.6s;
}
</style>
