<script setup lang="ts">
import { useNav } from '@slidev/client'

// Oversikt over verktøykjeden. `focus` fremhever en del og demper resten.
const props = withDefaults(defineProps<{
  focus?: 'all' | 'vscode' | 'gitlab' | 'runner' | 'proget' | 'ansible'
}>(), { focus: 'all' })

const { isPrintMode } = useNav()

const groups: Record<string, string[]> = {
  vscode: ['vscode', 'e-push', 'e-pull'],
  gitlab: ['gitlab', 'e-push', 'e-pull', 'e-job'],
  runner: ['gitlab', 'runner', 'e-job'],
  proget: ['proget', 'e-asset', 'e-asset-host', 'runner', 'windows'],
  ansible: ['runner', 'ansible', 'e-winrm', 'windows'],
}

const on = (key: string) => props.focus === 'all' || (groups[props.focus] ?? []).includes(key)
const cls = (key: string) => ({ dim: !on(key), hot: props.focus !== 'all' && on(key) })
</script>

<template>
  <svg viewBox="0 0 1720 600" class="big-picture" :class="{ live: !isPrintMode }">
    <defs>
      <marker id="bp-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10z" class="ah" />
      </marker>
    </defs>

    <!-- Kanter -->
    <g :class="cls('e-push')" class="edge">
      <path d="M302 230 L416 230" marker-end="url(#bp-ah)" />
      <text x="359" y="212" text-anchor="middle" class="t-edge">push</text>
    </g>
    <g :class="cls('e-pull')" class="edge">
      <path d="M418 300 L304 300" marker-end="url(#bp-ah)" />
      <text x="361" y="340" text-anchor="middle" class="t-edge">clone / pull</text>
    </g>
    <g :class="cls('e-job')" class="edge">
      <path d="M782 260 L896 260" marker-end="url(#bp-ah)" />
      <text x="839" y="242" text-anchor="middle" class="t-edge">jobb</text>
    </g>
    <g :class="cls('e-winrm')" class="edge">
      <path d="M1302 260 L1416 260" marker-end="url(#bp-ah)" />
      <text x="1359" y="242" text-anchor="middle" class="t-edge">WinRM</text>
    </g>
    <g :class="cls('e-asset')" class="edge dashed">
      <path d="M1100 500 L1100 426" marker-end="url(#bp-ah)" />
      <text x="1120" y="472" class="t-edge">images</text>
    </g>
    <g :class="cls('e-asset-host')" class="edge dashed">
      <path d="M1304 549 L1565 549 L1565 366" marker-end="url(#bp-ah)" />
      <text x="1430" y="535" text-anchor="middle" class="t-edge">assets</text>
    </g>

    <!-- VS Code -->
    <g :class="cls('vscode')" class="node" style="--c: var(--vscode)">
      <rect x="10" y="170" width="290" height="190" rx="20" />
      <text x="155" y="232" text-anchor="middle" class="t-icon">💻</text>
      <text x="155" y="288" text-anchor="middle" class="t-title">VS Code</text>
      <text x="155" y="326" text-anchor="middle" class="t-sub">Din PC · Git</text>
    </g>

    <!-- GitLab -->
    <g :class="cls('gitlab')" class="node" style="--c: var(--gitlab)">
      <rect x="420" y="150" width="360" height="230" rx="20" />
      <text x="600" y="214" text-anchor="middle" class="t-icon">🦊</text>
      <text x="600" y="272" text-anchor="middle" class="t-title">GitLab</text>
      <text x="600" y="312" text-anchor="middle" class="t-sub">Repo · branches</text>
      <text x="600" y="346" text-anchor="middle" class="t-sub">pipelines</text>
    </g>

    <!-- Runner med Ansible -->
    <g :class="cls('runner')" class="node" style="--c: var(--sp-primary)">
      <rect x="900" y="110" width="400" height="310" rx="20" />
      <text x="1100" y="170" text-anchor="middle" class="t-title">GitLab Runner</text>
      <text x="1100" y="208" text-anchor="middle" class="t-sub">K3s · container per jobb</text>
    </g>
    <g :class="cls('ansible')" class="node inner" style="--c: var(--ansible)">
      <rect x="940" y="250" width="320" height="130" rx="14" />
      <text x="1100" y="308" text-anchor="middle" class="t-title">Ansible</text>
      <text x="1100" y="346" text-anchor="middle" class="t-sub">ansible-playbook</text>
    </g>

    <!-- Windows-testserver -->
    <g :class="cls('windows')" class="node" style="--c: var(--windows)">
      <rect x="1420" y="170" width="290" height="190" rx="20" />
      <text x="1565" y="232" text-anchor="middle" class="t-icon">🖥️</text>
      <text x="1565" y="288" text-anchor="middle" class="t-title">Testserver</text>
      <text x="1565" y="326" text-anchor="middle" class="t-sub">Windows</text>
    </g>

    <!-- ProGet -->
    <g :class="cls('proget')" class="node" style="--c: var(--proget)">
      <rect x="900" y="504" width="400" height="90" rx="18" />
      <text x="1090" y="562" text-anchor="end" class="t-title">📦 ProGet</text>
      <text x="1110" y="560" class="t-sub">feeds · assets</text>
    </g>
  </svg>
</template>

<style scoped>
.big-picture { display: block; width: 100%; }
.big-picture text { font-family: inherit; fill: currentColor; }
.t-icon { font-size: 44px; }
.t-title { font-size: 34px; font-weight: 800; }
.t-sub { font-size: 24px; opacity: 0.75; }
.t-edge { font-size: 22px; opacity: 0.85; }

.node rect {
  fill: color-mix(in srgb, var(--c) 14%, var(--sp-background, #0d1117));
  stroke: var(--c);
  stroke-width: 3;
}

.node.inner rect { fill: color-mix(in srgb, var(--c) 22%, var(--sp-background, #0d1117)); }
.node.hot rect { stroke-width: 6; }

.edge path { fill: none; stroke: var(--sp-primary); stroke-width: 5; }
.edge.dashed path { stroke: var(--proget); stroke-dasharray: 12 8; }
.edge text { fill: var(--sp-primary); }
.ah { fill: var(--sp-primary); }

.dim { opacity: 0.22; }
.live .node, .live .edge { transition: opacity 0.3s ease; }
</style>
