<script setup lang="ts">
// Skisse av Source Control-visningen i VS Code (Ctrl+Shift+G), med nummererte steg.
</script>

<template>
  <div class="scm">
    <div class="head">SOURCE CONTROL</div>
    <div class="msg">
      Legg til README for demo
      <span class="num">3</span>
    </div>
    <div class="btn">✓ Commit <span class="num">4</span></div>
    <div class="group">
      Staged Changes <span class="count">1</span>
    </div>
    <div class="file"><span class="i-vscode-icons:file-type-markdown" /> README.md <span class="st a">A</span></div>
    <div class="group">
      Changes <span class="count">1</span>
      <span class="num">2</span>
    </div>
    <div class="file"><span class="i-vscode-icons:file-type-yaml" /> ping.yml <span class="plus">+</span><span class="st m">M</span></div>
    <div class="bar">
      <span>⎇ feature-ping <span class="num inline">1</span></span>
      <span>☁ Publish Branch <span class="num inline">5</span></span>
    </div>
  </div>
</template>

<style scoped>
.scm {
  background: #252526;
  color: #ccc;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  font-size: 13px;
  width: 100%;
}

.head { font-size: 11px; letter-spacing: 0.06em; opacity: 0.7; padding: 9px 12px 6px; }
.msg { position: relative; margin: 0 12px 8px; background: #3c3c3c; border: 1px solid var(--vscode); padding: 6px 9px; border-radius: 3px; }
.btn { position: relative; margin: 0 12px 10px; background: var(--vscode); color: #fff; text-align: center; padding: 6px; border-radius: 3px; font-weight: 600; }
.group { position: relative; padding: 4px 12px; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }
.count { background: #4d4d4d; border-radius: 9px; padding: 0 6px; margin-left: 5px; font-weight: 600; }
.file { display: flex; align-items: center; gap: 6px; padding: 3px 12px 3px 22px; }
.st { margin-left: auto; font-weight: 700; }
.st.a { color: #73c991; }
.st.m { color: #e2c08d; margin-left: 8px; }
.plus { margin-left: auto; width: 18px; height: 18px; border-radius: 3px; background: #3c3c3c; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; }
.bar { margin-top: 10px; background: var(--vscode); color: #fff; display: flex; justify-content: space-between; padding: 5px 12px; font-size: 12px; }

.num {
  position: absolute;
  right: -9px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--sp-warning);
  color: #000;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.group .num { right: 12px; }
.num.inline { position: static; transform: none; display: inline-flex; margin-left: 4px; }
</style>
