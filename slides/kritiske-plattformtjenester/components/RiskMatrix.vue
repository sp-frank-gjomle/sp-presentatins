<script setup lang="ts">
// step 1: plasserer "I dag", step 2: viser "Med tiltak" og pil
const props = withDefaults(defineProps<{
  step?: number
  today?: [number, number]
  target?: [number, number]
}>(), { step: 0, today: () => [3, 5], target: () => [2, 2] })

const levels = [5, 4, 3, 2, 1]
const cols = [1, 2, 3, 4, 5]
function color(l: number, c: number) {
  const s = l * c
  if (s >= 15) return 'var(--sp-danger)'
  if (s >= 8) return '#ff9a3d'
  if (s >= 4) return 'var(--sp-warning)'
  return 'var(--sp-success)'
}
// Senter av celle i prosent
const pos = (p: [number, number]) => ({ x: ((p[0] - 0.5) / 5) * 100, y: ((5 - p[1] + 0.5) / 5) * 100 })
const t = pos(props.today)
const g = pos(props.target)
</script>

<template>
  <div class="risk">
    <div class="ylabel">Konsekvens →</div>
    <div class="wrap">
      <div class="grid">
        <template v-for="c in levels" :key="c">
          <div v-for="l in cols" :key="`${l}-${c}`" class="cell" :style="{ background: color(l, c) }" />
        </template>
        <svg class="overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="currentColor" />
            </marker>
          </defs>
          <line
            v-if="step >= 2"
            :x1="t.x" :y1="t.y" :x2="g.x" :y2="g.y"
            class="arrow" marker-end="url(#arrowhead)"
          />
        </svg>
        <div class="dot today" :class="{ shown: step >= 1 }" :style="{ left: `${t.x}%`, top: `${t.y}%` }">
          <span>I dag</span>
        </div>
        <div class="dot target" :class="{ shown: step >= 2 }" :style="{ left: `${g.x}%`, top: `${g.y}%` }">
          <span>Med tiltak</span>
        </div>
      </div>
      <div class="xlabel">Sannsynlighet →</div>
    </div>
  </div>
</template>

<style scoped>
.risk {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ylabel {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 0.85rem;
  opacity: 0.8;
}
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 58px);
  grid-template-rows: repeat(5, 58px);
  gap: 3px;
}
.cell {
  border-radius: 4px;
  opacity: 0.55;
}
.xlabel {
  margin-top: 6px;
  font-size: 0.85rem;
  opacity: 0.8;
}
.overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  color: #fff;
}
.arrow {
  stroke: #fff;
  stroke-width: 1.2;
  stroke-dasharray: 3 2;
  vector-effect: non-scaling-stroke;
}
.dot {
  position: absolute;
  width: 30px;
  height: 30px;
  margin: -15px 0 0 -15px;
  border-radius: 50%;
  border: 3px solid #fff;
  opacity: 0;
}
.dot.shown {
  opacity: 1;
}
.today {
  background: var(--sp-danger);
}
.target {
  background: var(--sp-success);
}
.dot span {
  position: absolute;
  left: 36px;
  top: 2px;
  white-space: nowrap;
  font-weight: 800;
  font-size: 0.9rem;
  color: #fff;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    0 0 6px #000,
    0 0 10px #000;
}
</style>
