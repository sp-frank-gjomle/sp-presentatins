<script setup lang="ts">
// Skisse av Source Control-visningen i VS Code (Ctrl+Shift+G), standardtemaet Dark Modern, med nummererte steg.
</script>

<template>
  <div class="scm">
    <div class="head">SOURCE CONTROL <span>✓ ⟳ ···</span></div>
    <div class="sec">⌄ CHANGES</div>
    <div class="msg">
      Legg til README for demo
      <span class="spark i-simple-icons:githubcopilot" />
      <span class="num">3</span>
    </div>
    <div class="btn"><span class="main">✓ Commit</span><span class="drop">⌄</span><span class="num">4</span></div>
    <div class="group">
      ⌄ Staged Changes <span class="count">1</span>
    </div>
    <div class="file"><span class="i-vscode-icons:file-type-markdown" /> README.md <span class="st a">A</span></div>
    <div class="group">
      ⌄ Changes <span class="count">1</span>
      <span class="num">2</span>
    </div>
    <div class="file"><span class="i-vscode-icons:file-type-yaml" /> ping.yml <span class="plus">+</span><span class="st m">M</span></div>
    <div class="sec graph-head">⌄ GRAPH</div>
    <div class="graph">
      <div><i class="dot cur" /> Legg til README <span class="ref">feature-ping</span></div>
      <div><i class="dot" /> Første versjon <span class="ref main">main</span></div>
    </div>
    <div class="bar">
      <span><span class="i-ph:git-branch" /> feature-ping <span class="num inline">1</span></span>
      <span><span class="i-ph:cloud-arrow-up" /> Publish Branch <span class="num inline">5</span></span>
    </div>
  </div>
</template>

<style scoped>
/* Farger fra VS Code-temaet «Dark Modern» */
.scm {
  --bar: #181818;
  --line: #2b2b2b;
  --muted: #9d9d9d;
  --accent: #0078d4;
  background: var(--bar);
  color: #ccc;
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 12.5px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
}

.head { display: flex; justify-content: space-between; font-size: 10.5px; letter-spacing: 0.04em; color: var(--muted); padding: 8px 12px 4px; }
.sec { font-size: 10.5px; font-weight: 700; padding: 4px 8px; color: #ccc; }
.graph-head { border-top: 1px solid var(--line); margin-top: 6px; padding-top: 6px; }
.msg { position: relative; margin: 2px 12px 7px; background: #313131; border: 1px solid var(--accent); padding: 6px 9px; border-radius: 4px; }
.spark { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: var(--muted); }
.btn { position: relative; margin: 0 12px 8px; display: flex; background: var(--accent); color: #fff; border-radius: 4px; font-weight: 600; }
.btn .main { flex: 1; text-align: center; padding: 5px; }
.btn .drop { padding: 5px 9px; border-left: 1px solid rgba(255, 255, 255, 0.3); }
.group { position: relative; padding: 3px 10px; font-weight: 700; font-size: 11px; }
.count { background: #616161; color: #fff; border-radius: 9px; padding: 0 6px; margin-left: 5px; font-weight: 600; font-size: 10px; }
.file { display: flex; align-items: center; gap: 6px; padding: 2px 12px 2px 24px; }
.st { margin-left: auto; font-weight: 700; }
.st.a { color: #73c991; }
.st.m { color: #e2c08d; margin-left: 8px; }
.plus { margin-left: auto; width: 17px; height: 17px; border-radius: 3px; background: #313131; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; }
.graph { padding: 2px 12px 4px; display: flex; flex-direction: column; gap: 3px; }
.graph > div { display: flex; align-items: center; gap: 7px; }
.dot { width: 9px; height: 9px; border-radius: 50%; border: 2px solid #3794ff; display: inline-block; }
.dot.cur { background: #3794ff; }
.ref { margin-left: auto; font-size: 10px; padding: 0 6px; border-radius: 8px; background: color-mix(in srgb, #3794ff 30%, transparent); }
.ref.main { background: #3a3a3a; }
.bar { margin-top: 6px; border-top: 1px solid var(--line); color: var(--muted); display: flex; justify-content: space-between; padding: 4px 12px; font-size: 11px; }
.bar > span { display: flex; align-items: center; gap: 4px; }

.num {
  position: absolute;
  right: -9px;
  top: 50%;
  transform: translateY(-50%);
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: var(--sp-warning);
  color: #000;
  font-size: 10.5px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.group .num { right: 12px; }
.num.inline { position: static; transform: none; display: inline-flex; margin-left: 2px; }
</style>
