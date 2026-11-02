<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { apps, core, impact, tools } from './stack'
import type { CoreId, Scenario } from './stack'

// step 0: normal drift, 1: Git nede, 2: pakkebrønn nede, 3: begge nede
const props = withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()

const coreY: Record<CoreId, number> = { git: 90, pkg: 230 }
const toolY = (i: number) => 36 + i * 62
const appY = (i: number) => 60 + i * 100
const BUS_X = 575
const BUS_Y = 160

const down = computed<Record<CoreId, boolean>>(() => ({
  git: props.step === 1 || props.step >= 3,
  pkg: props.step === 2 || props.step >= 3,
}))
const scenario = computed<Scenario | null>(() => (props.step === 1 ? 'git' : props.step === 2 ? 'pkg' : props.step >= 3 ? 'both' : null))
const toolDown = (deps: CoreId[]) => deps.some(d => down.value[d])
const stopped = computed(() => tools.filter(t => toolDown(t.deps)).length)
const anyDown = computed(() => scenario.value !== null)

const headline = computed(() => {
  switch (props.step) {
    case 0: return 'Normal drift: alt flyter'
    case 1: return 'Bare Git nede'
    case 2: return 'Bare pakkebrønnen nede'
    default: return 'Begge nede'
  }
})

const edges = computed(() =>
  tools.flatMap((t, i) =>
    t.deps.map((d) => {
      const fromX = 190
      const toX = 340
      const mid = (fromX + toX) / 2
      return {
        key: `${t.id}-${d}`,
        d: `M ${fromX} ${coreY[d]} C ${mid} ${coreY[d]}, ${mid} ${toolY(i)}, ${toX} ${toolY(i)}`,
        broken: down.value[d],
      }
    }),
  ),
)
const appEdges = computed(() =>
  apps.map((a, i) => ({
    key: a.id,
    d: `M ${BUS_X} ${BUS_Y} C ${BUS_X + 40} ${BUS_Y}, ${BUS_X + 30} ${appY(i)}, 650 ${appY(i)}`,
    warn: anyDown.value,
  })),
)
</script>

<template>
  <div class="blast" :class="{ live: !isPrintMode }">
    <svg viewBox="0 -24 900 340" class="svg">
      <text x="100" y="-8" class="col">Grunnmur</text>
      <text x="420" y="-8" class="col">Verktøy</text>
      <text x="770" y="-8" class="col">Applikasjoner</text>

      <path v-for="e in edges" :key="e.key" :d="e.d" class="edge" :class="{ broken: e.broken }" />
      <template v-for="(t, i) in tools" :key="`stub-${t.id}`">
        <line :x1="500" :y1="toolY(i)" :x2="BUS_X" :y2="BUS_Y" class="edge" :class="{ broken: toolDown(t.deps) }" />
      </template>
      <path v-for="e in appEdges" :key="e.key" :d="e.d" class="edge" :class="{ warn: e.warn }" />

      <g v-for="c in core" :key="c.id" class="core" :class="{ down: down[c.id] }">
        <rect x="10" :y="coreY[c.id] - 36" width="180" height="72" rx="36" />
        <text x="100" :y="coreY[c.id] - 4" class="label">{{ c.name }}</text>
        <text x="100" :y="coreY[c.id] + 20" class="sub">{{ c.sub }}</text>
        <g v-if="down[c.id]" :transform="`translate(180, ${coreY[c.id] - 30})`">
          <circle r="14" class="xc" />
          <path d="M -5 -5 L 5 5 M 5 -5 L -5 5" class="xp" />
        </g>
      </g>

      <g v-for="(t, i) in tools" :key="t.id" class="node" :class="{ down: toolDown(t.deps) }">
        <rect x="340" :y="toolY(i) - 27" width="160" height="54" rx="10" />
        <text x="420" :y="toolY(i) - 3" class="label small">{{ t.name }}</text>
        <text x="420" :y="toolY(i) + 15" class="sub">{{ t.sub }}</text>
      </g>

      <g v-for="(a, i) in apps" :key="a.id" class="node app" :class="{ warn: anyDown }">
        <rect x="650" :y="appY(i) - 34" width="240" height="68" rx="10" />
        <text x="770" :y="appY(i) - 8" class="label">{{ a.name }}</text>
        <text x="770" :y="appY(i) + 14" class="sub">{{ scenario ? impact[a.id][scenario].text : a.sub }}</text>
      </g>
    </svg>
    <div class="status" :class="{ bad: stopped > 0 }">
      <span class="head">{{ headline }}</span>
      <span class="sep">→</span>
      <span class="count">{{ stopped }} av 5 verktøy stoppet</span>
      <span v-if="anyDown" class="warnText">3 applikasjoner kjører uten normalt vedlikehold</span>
    </div>
  </div>
</template>

<style scoped>
.blast {
  width: 100%;
}
.svg {
  width: 100%;
  height: 320px;
}
.edge {
  fill: none;
  stroke: var(--sp-primary);
  stroke-width: 2.5;
  stroke-dasharray: 8 8;
}
.edge.broken {
  stroke: var(--sp-danger);
  stroke-dasharray: 3 10;
  opacity: 0.8;
}
.edge.warn {
  stroke: var(--sp-warning);
  stroke-dasharray: 3 10;
}
.core rect {
  fill: color-mix(in srgb, var(--sp-primary) 25%, transparent);
  stroke: var(--sp-primary);
  stroke-width: 3;
}
.core.down rect {
  fill: color-mix(in srgb, var(--sp-danger) 45%, transparent);
  stroke: var(--sp-danger);
}
.node rect {
  fill: color-mix(in srgb, var(--sp-success) 12%, transparent);
  stroke: var(--sp-success);
  stroke-width: 2;
}
.node.down rect {
  fill: color-mix(in srgb, var(--sp-danger) 22%, transparent);
  stroke: var(--sp-danger);
}
.node.warn rect {
  fill: color-mix(in srgb, var(--sp-warning) 16%, transparent);
  stroke: var(--sp-warning);
}
text {
  text-anchor: middle;
  fill: currentColor;
}
.label {
  font-size: 19px;
  font-weight: 700;
}
.label.small {
  font-size: 16px;
}
.core .label {
  font-size: 21px;
}
.sub {
  font-size: 12.5px;
  opacity: 0.8;
}
.col {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.6;
}
.xc {
  fill: var(--sp-danger);
  stroke: #0d1117;
  stroke-width: 3;
}
.xp {
  fill: none;
  stroke: #fff;
  stroke-width: 3;
  stroke-linecap: round;
}
.live .edge,
.live .core rect,
.live .node rect {
  transition: stroke 0.6s, fill 0.6s, opacity 0.6s;
}
.status {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 4px 12px;
  font-size: 1.2rem;
  margin-top: 4px;
  color: var(--sp-success);
}
.status.bad {
  color: var(--sp-danger);
}
.head {
  font-weight: 700;
  color: var(--sp-primary);
}
.count {
  font-weight: 800;
}
.warnText {
  font-weight: 700;
  color: var(--sp-warning);
}
</style>
