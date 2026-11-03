<script setup lang="ts">
import { useNav } from '@slidev/client'

// Skisse av VS Code-vinduet med nummererte områder. `step` (1–6) fremhever ett område, 0 = ingen.
withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()

const legend = [
  { n: 1, title: 'Activity Bar', text: 'Bytt mellom Explorer, søk, Git og extensions' },
  { n: 2, title: 'Side Bar', text: 'Innholdet i valgt visning, f.eks. filene i repoet' },
  { n: 3, title: 'Editor', text: 'Filene du jobber med, i faner' },
  { n: 4, title: 'Panel', text: 'Terminal, output og problemer' },
  { n: 5, title: 'Status Bar', text: 'Aktiv branch, synk-status og filtype' },
  { n: 6, title: 'Command Palette', text: 'Alle kommandoer: Ctrl+Shift+P' },
]
</script>

<template>
  <div class="anatomy" :class="{ live: !isPrintMode }">
    <div class="window">
      <div class="titlebar" :class="{ hl: step === 6 }">
        <span class="dots"><i /><i /><i /></span>
        <span class="search">🔍 demo-repo</span>
        <span class="num">6</span>
      </div>
      <div class="body">
        <div class="activity" :class="{ hl: step === 1 }">
          <div class="i-carbon:copy-file" />
          <div class="i-carbon:search" />
          <div class="i-carbon:branch" />
          <div class="i-carbon:apps" />
          <span class="num">1</span>
        </div>
        <div class="sidebar" :class="{ hl: step === 2 }">
          <div class="head">EXPLORER</div>
          <div class="f">▾ demo-repo</div>
          <div class="f in"><span class="i-vscode-icons:file-type-yaml" /> inventory.yml</div>
          <div class="f in sel"><span class="i-vscode-icons:file-type-yaml" /> ping.yml</div>
          <div class="f in"><span class="i-vscode-icons:file-type-markdown" /> README.md</div>
          <span class="num">2</span>
        </div>
        <div class="main">
          <div class="editor" :class="{ hl: step === 3 }">
            <div class="tabs"><span class="tab">ping.yml</span></div>
            <div class="code">
              <div><span class="k">- name:</span> Ping testserver</div>
              <div>&nbsp;&nbsp;<span class="k">hosts:</span> all</div>
              <div>&nbsp;&nbsp;<span class="k">tasks:</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">- ansible.windows.win_ping:</span></div>
            </div>
            <span class="num">3</span>
          </div>
          <div class="panel" :class="{ hl: step === 4 }">
            <div class="head">TERMINAL</div>
            <div class="term">PS C:\kode\demo-repo&gt; git status</div>
            <span class="num">4</span>
          </div>
        </div>
      </div>
      <div class="statusbar" :class="{ hl: step === 5 }">
        <span>⎇ main</span><span>⟳ 0↓ 0↑</span><span class="right">YAML</span>
        <span class="num">5</span>
      </div>
    </div>

    <div class="legend">
      <div v-for="l in legend" :key="l.n" class="row" :class="{ active: step === l.n }">
        <span class="n">{{ l.n }}</span>
        <div><b>{{ l.title }}</b><span>{{ l.text }}</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.anatomy { display: grid; grid-template-columns: 560px 1fr; gap: 22px; align-items: center; }

.window {
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: #1e1e1e;
  color: #ccc;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  height: 330px;
}

.titlebar { position: relative; height: 30px; background: #2d2d2d; display: flex; align-items: center; padding: 0 10px; }
.dots { display: flex; gap: 5px; }
.dots i { width: 9px; height: 9px; border-radius: 50%; background: #555; display: block; }
.search { margin: 0 auto; background: #3c3c3c; border-radius: 5px; padding: 2px 40px; font-size: 11px; }

.body { flex: 1; display: grid; grid-template-columns: 42px 150px 1fr; min-height: 0; }
.activity { position: relative; background: #333; display: flex; flex-direction: column; align-items: center; gap: 14px; padding-top: 12px; font-size: 20px; color: #aaa; }
.sidebar { position: relative; background: #252526; padding: 8px 0; }
.sidebar .head, .panel .head { font-size: 10px; letter-spacing: 0.06em; opacity: 0.7; padding: 0 10px 6px; }
.sidebar .f { padding: 2px 10px; display: flex; align-items: center; gap: 5px; white-space: nowrap; }
.sidebar .f.in { padding-left: 20px; }
.sidebar .f.sel { background: #37373d; }

.main { display: grid; grid-template-rows: 1fr 92px; min-height: 0; }
.editor { position: relative; background: #1e1e1e; }
.tabs { background: #252526; height: 26px; display: flex; }
.tab { background: #1e1e1e; padding: 5px 14px; border-top: 2px solid var(--vscode); }
.code { font-family: var(--slidev-code-font-family, monospace); padding: 10px 14px; line-height: 1.7; }
.code .k { color: #e06c75; }

.panel { position: relative; background: #1e1e1e; border-top: 1px solid #3c3c3c; padding-top: 6px; }
.term { font-family: var(--slidev-code-font-family, monospace); padding: 0 10px; color: #ddd; }

.statusbar { position: relative; height: 24px; background: var(--vscode); color: #fff; display: flex; align-items: center; gap: 14px; padding: 0 10px; font-size: 11px; }
.statusbar .right { margin-left: auto; margin-right: 26px; }

.num {
  position: absolute;
  right: 6px;
  top: 6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--sp-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.titlebar .num, .statusbar .num { top: 50%; transform: translateY(-50%); }

.hl { outline: 3px solid var(--sp-warning); outline-offset: -3px; z-index: 1; }

.legend { display: flex; flex-direction: column; gap: 9px; }
.legend .row { display: grid; grid-template-columns: 28px 1fr; gap: 10px; align-items: center; padding: 3px 6px; border-radius: 6px; }
.legend .row.active { background: color-mix(in srgb, var(--sp-warning) 16%, transparent); }
.legend .n {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--sp-primary);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.legend b { display: block; font-size: 0.95rem; }
.legend .row span:not(.n) { display: block; font-size: 0.75rem; opacity: 0.75; line-height: 1.3; }

.live .legend .row, .live .hl { transition: background 0.3s ease, outline-color 0.3s ease; }
</style>
