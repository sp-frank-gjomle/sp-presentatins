<script setup lang="ts">
import { useNav } from '@slidev/client'

// Gits fire områder. `step` (0–4) viser kommandoene en etter en: add, commit, push, clone/pull.
withDefaults(defineProps<{ step?: number }>(), { step: 4 })
const { isPrintMode } = useNav()

const areas = [
  { icon: '📝', title: 'Arbeidsmappe', sub: 'Filene du redigerer', c: 'var(--vscode)' },
  { icon: '📋', title: 'Staging', sub: 'Endringer klare til commit', c: 'var(--sp-warning)' },
  { icon: '🗄️', title: 'Lokalt repo', sub: 'Historikken på din PC (.git)', c: 'var(--git)' },
  { icon: '🦊', title: 'GitLab', sub: 'Felles kopi (remote «origin»)', c: 'var(--gitlab)' },
]
const cmds = ['git add', 'git commit', 'git push']
</script>

<template>
  <div class="git-areas" :class="{ live: !isPrintMode }">
    <div class="zone pc">Din PC</div>
    <div class="zone server">Server</div>

    <template v-for="(a, i) in areas" :key="a.title">
      <div class="area" :style="{ '--c': a.c, gridColumn: i * 2 + 1 }">
        <div class="icon">{{ a.icon }}</div>
        <b>{{ a.title }}</b>
        <span>{{ a.sub }}</span>
      </div>
      <div v-if="i < 3" class="cmd" :class="{ off: step < i + 1 }" :style="{ gridColumn: i * 2 + 2 }">
        <code>{{ cmds[i] }}</code>
        <div class="arrow">➜</div>
      </div>
    </template>

    <div class="back" :class="{ off: step < 4 }">
      <div class="line" />
      <code>git clone · git pull</code>
      <span class="hint">henter ned fra GitLab</span>
    </div>
  </div>
</template>

<style scoped>
.git-areas {
  display: grid;
  grid-template-columns: 1fr 110px 1fr 110px 1fr 110px 1fr;
  grid-template-rows: auto auto auto;
  row-gap: 10px;
  align-items: center;
}

.zone {
  grid-row: 1;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding-bottom: 4px;
  border-bottom: 2px solid var(--border);
  opacity: 0.8;
}

.zone.pc { grid-column: 1 / 6; }
.zone.server { grid-column: 7; border-color: var(--gitlab); }

.area {
  grid-row: 2;
  background: var(--surface);
  border: 1px solid var(--c);
  border-top: 4px solid var(--c);
  border-radius: 10px;
  padding: 14px 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 140px;
  justify-content: center;
}

.area .icon { font-size: 30px; margin-bottom: 6px; }
.area b { font-size: 1.05rem; }
.area span { font-size: 0.75rem; opacity: 0.75; margin-top: 4px; line-height: 1.3; }

.cmd { grid-row: 2; text-align: center; }
.cmd code { font-size: 0.75rem; white-space: nowrap; }
.cmd .arrow { color: var(--sp-primary); font-size: 26px; font-weight: 800; line-height: 1.2; }

.back {
  grid-row: 3;
  grid-column: 1 / 8;
  position: relative;
  text-align: center;
  padding-top: 14px;
}

.back .line {
  position: absolute;
  top: 4px;
  left: 12%;
  right: 12%;
  height: 3px;
  background: var(--gitlab);
  border-radius: 2px;
}

.back .line::before {
  content: '◀';
  position: absolute;
  left: -10px;
  top: -9px;
  color: var(--gitlab);
  font-size: 16px;
}

.back code { font-size: 0.8rem; }
.back .hint { font-size: 0.75rem; opacity: 0.7; margin-left: 8px; }

.off { opacity: 0; }
.live .cmd, .live .back { transition: opacity 0.3s ease; }
</style>
