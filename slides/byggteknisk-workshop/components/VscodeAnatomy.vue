<script setup lang="ts">
import { useNav } from '@slidev/client'

// Skisse av VS Code-vinduet (standardtemaet Dark Modern) med nummererte områder.
// `step` (1–7) fremhever ett område, 0 = ingen.
withDefaults(defineProps<{ step?: number }>(), { step: 0 })
const { isPrintMode } = useNav()

const legend = [
  { n: 1, title: 'Activity Bar', text: 'Explorer, søk, Git, Run og Extensions' },
  { n: 2, title: 'Primary Side Bar', text: 'Innholdet i valgt visning, f.eks. filene' },
  { n: 3, title: 'Editor', text: 'Filene du jobber med, i faner' },
  { n: 4, title: 'Panel', text: 'Terminal, Problems og Output' },
  { n: 5, title: 'Status Bar', text: 'Aktiv branch, synk og feil' },
  { n: 6, title: 'Command Center', text: 'Søk og kommandoer: Ctrl+Shift+P' },
  { n: 7, title: 'Secondary Side Bar', text: 'Copilot Chat' },
]
</script>

<template>
  <div class="anatomy" :class="{ live: !isPrintMode }">
    <div class="window">
      <div class="titlebar">
        <span class="logo i-vscode-icons:file-type-vscode" />
        <span class="menu">File&nbsp; Edit&nbsp; Selection&nbsp; View&nbsp; …</span>
        <span class="nav">← →</span>
        <span class="cc" :class="{ hl: step === 6 }">
          <span class="i-ph:magnifying-glass" /> demo-repo
          <span class="num">6</span>
        </span>
        <span class="tb-right"><span class="i-simple-icons:githubcopilot" /><span class="i-ph:sidebar-simple" /></span>
      </div>
      <div class="body">
        <div class="activity" :class="{ hl: step === 1 }">
          <div class="act active"><span class="i-ph:files" /></div>
          <div class="act"><span class="i-ph:magnifying-glass" /></div>
          <div class="act"><span class="i-ph:git-branch" /></div>
          <div class="act"><span class="i-ph:play" /></div>
          <div class="act"><span class="i-ph:squares-four" /></div>
          <div class="act bottom"><span class="i-ph:user-circle" /></div>
          <div class="act"><span class="i-ph:gear-six" /></div>
          <span class="num">1</span>
        </div>
        <div class="sidebar" :class="{ hl: step === 2 }">
          <div class="head">EXPLORER <span>···</span></div>
          <div class="f root">⌄ DEMO-REPO</div>
          <div class="f"><span class="i-vscode-icons:file-type-yaml" /> inventory.yml</div>
          <div class="f sel"><span class="i-vscode-icons:file-type-yaml" /> ping.yml</div>
          <div class="f"><span class="i-vscode-icons:file-type-markdown" /> README.md</div>
          <span class="num">2</span>
        </div>
        <div class="main">
          <div class="editor" :class="{ hl: step === 3 }">
            <div class="tabs">
              <span class="tab active"><span class="i-vscode-icons:file-type-yaml" /> ping.yml <i>×</i></span>
              <span class="tab"><span class="i-vscode-icons:file-type-markdown" /> README.md</span>
            </div>
            <div class="crumbs">ping.yml › Ping testserver</div>
            <div class="code">
              <div><i>1</i><span class="k">- name:</span> <span class="s">Ping testserver</span></div>
              <div><i>2</i>&nbsp;&nbsp;<span class="k">hosts:</span> <span class="s">windows</span></div>
              <div><i>3</i>&nbsp;&nbsp;<span class="k">tasks:</span></div>
              <div><i>4</i>&nbsp;&nbsp;&nbsp;&nbsp;- <span class="k">ansible.windows.win_ping:</span></div>
            </div>
            <span class="num">3</span>
          </div>
          <div class="panel" :class="{ hl: step === 4 }">
            <div class="ptabs"><span>PROBLEMS</span><span>OUTPUT</span><span class="on">TERMINAL</span></div>
            <div class="term">PS C:\kode\demo-repo&gt; git status<span class="cursor" /></div>
            <span class="num">4</span>
          </div>
        </div>
        <div class="chat" :class="{ hl: step === 7 }">
          <div class="head">CHAT <span>＋ ···</span></div>
          <div class="bubble"><span class="i-simple-icons:githubcopilot" /> Spør Copilot om koden din</div>
          <div class="input">Ask Copilot…</div>
          <span class="num">7</span>
        </div>
      </div>
      <div class="statusbar" :class="{ hl: step === 5 }">
        <span class="remote">&gt;&lt;</span>
        <span><span class="i-ph:git-branch" /> main</span>
        <span>⟳</span>
        <span>⊗ 0 ⚠ 0</span>
        <span class="right">Ln 4, Col 3</span>
        <span>YAML</span>
        <span class="i-simple-icons:githubcopilot" />
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
/* Farger fra VS Code-temaet «Dark Modern» */
.anatomy {
  --bg: #1f1f1f;
  --bar: #181818;
  --line: #2b2b2b;
  --fg: #cccccc;
  --muted: #9d9d9d;
  --accent: #0078d4;
  display: grid;
  grid-template-columns: 610px 1fr;
  gap: 20px;
  align-items: center;
}

.window {
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg);
  color: var(--fg);
  font-size: 11px;
  display: flex;
  flex-direction: column;
  height: 340px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
}

.titlebar { position: relative; height: 32px; flex: none; background: var(--bar); border-bottom: 1px solid var(--line); display: flex; align-items: center; gap: 10px; padding: 0 10px; }
.logo { font-size: 14px; }
.menu { color: var(--muted); font-size: 10px; white-space: nowrap; }
.nav { color: var(--muted); margin-left: 18px; }
.cc { position: relative; flex: 1; max-width: 210px; display: flex; align-items: center; justify-content: center; gap: 6px; background: #2a2a2a; border: 1px solid #3c3c3c; border-radius: 6px; height: 21px; color: var(--muted); }
.cc .num { right: -26px; }
.tb-right { margin-left: auto; display: flex; gap: 10px; color: var(--muted); font-size: 13px; }

.body { flex: 1; display: grid; grid-template-columns: 38px 132px 1fr 128px; min-height: 0; }

.activity { position: relative; background: var(--bar); border-right: 1px solid var(--line); display: flex; flex-direction: column; align-items: center; padding-top: 4px; font-size: 19px; color: #868686; }
.act { width: 100%; display: flex; justify-content: center; padding: 6px 0; border-left: 2px solid transparent; }
.act.active { color: #fff; border-left-color: var(--accent); }
.act.bottom { margin-top: auto; }

.sidebar, .chat { position: relative; background: var(--bar); padding: 6px 0; }
.sidebar { border-right: 1px solid var(--line); }
.chat { border-left: 1px solid var(--line); display: flex; flex-direction: column; }
.head { display: flex; justify-content: space-between; font-size: 9.5px; letter-spacing: 0.04em; color: var(--muted); padding: 0 10px 6px; }
.f { padding: 2px 10px 2px 20px; display: flex; align-items: center; gap: 5px; white-space: nowrap; }
.f.root { padding-left: 6px; font-weight: 700; font-size: 10px; }
.f.sel { background: #37373d; outline: 1px solid var(--accent); outline-offset: -1px; }

.main { display: grid; grid-template-rows: 1fr 96px; min-height: 0; }
.editor { position: relative; background: var(--bg); }
.tabs { background: var(--bar); height: 28px; display: flex; border-bottom: 1px solid var(--line); }
.tab { display: flex; align-items: center; gap: 5px; padding: 0 10px; color: var(--muted); border-right: 1px solid var(--line); }
.tab.active { background: var(--bg); color: #fff; border-top: 1px solid var(--accent); }
.tab i { font-style: normal; margin-left: 4px; }
.crumbs { color: var(--muted); font-size: 10px; padding: 3px 12px; }
.code { font-family: var(--slidev-code-font-family, monospace); padding: 2px 0; line-height: 1.75; }
.code i { display: inline-block; width: 26px; text-align: right; margin-right: 12px; color: #6e7681; font-style: normal; }
.code .k { color: #569cd6; }
.code .s { color: #ce9178; }

.panel { position: relative; background: var(--bar); border-top: 1px solid var(--line); }
.ptabs { display: flex; gap: 14px; padding: 6px 12px 4px; font-size: 9.5px; color: var(--muted); }
.ptabs .on { color: #fff; border-bottom: 1px solid var(--accent); }
.term { font-family: var(--slidev-code-font-family, monospace); padding: 4px 12px; color: var(--fg); }
.cursor { display: inline-block; width: 6px; height: 12px; background: var(--fg); margin-left: 3px; vertical-align: -2px; }

.bubble { margin: 4px 8px; padding: 7px; border-radius: 6px; background: #2a2a2a; color: var(--muted); line-height: 1.35; display: flex; gap: 5px; }
.input { margin: auto 8px 4px; border: 1px solid #3c3c3c; border-radius: 6px; padding: 6px; color: #6e7681; }

.statusbar { position: relative; height: 22px; flex: none; background: var(--bar); border-top: 1px solid var(--line); color: var(--muted); display: flex; align-items: center; gap: 12px; padding-right: 10px; font-size: 10px; }
.statusbar > span { display: flex; align-items: center; gap: 3px; }
.remote { background: var(--accent); color: #fff; height: 100%; padding: 0 8px; font-weight: 700; }
.statusbar .right { margin-left: auto; }
.statusbar .num { right: auto; left: 50%; }

.num {
  position: absolute;
  right: 6px;
  top: 6px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--sp-primary);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.activity .num { right: auto; left: 50%; top: auto; bottom: 64px; transform: translateX(-50%); }
.cc .num, .statusbar .num { top: 50%; transform: translateY(-50%); }

.hl { outline: 2px solid var(--sp-warning); outline-offset: -2px; z-index: 1; }

.legend { display: flex; flex-direction: column; gap: 7px; }
.legend .row { display: grid; grid-template-columns: 26px 1fr; gap: 9px; align-items: center; padding: 2px 6px; border-radius: 6px; }
.legend .row.active { background: color-mix(in srgb, var(--sp-warning) 16%, transparent); }
.legend .n {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--sp-primary);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.legend b { display: block; font-size: 0.88rem; }
.legend .row span:not(.n) { display: block; font-size: 0.72rem; opacity: 0.75; line-height: 1.3; }

.live .legend .row { transition: background 0.3s ease; }
</style>
