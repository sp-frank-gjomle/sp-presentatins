<script setup lang="ts">
// Demo-kort: hva som skal vises i en live demo. Brukes på `center`-slides.
const props = withDefaults(defineProps<{
  title: string
  items: string[]
  icon?: string
}>(), { icon: '🎬' })
// Nummereres nedover i to kolonner
const rows = Math.ceil(props.items.length / 2)
</script>

<template>
  <div class="demo">
    <div class="tag"><span>{{ icon }}</span> DEMO</div>
    <h2>{{ title }}</h2>
    <ol :style="{ gridTemplateRows: `repeat(${rows}, auto)` }">
      <li v-for="(item, i) in items" :key="i">
        <span class="n">{{ i + 1 }}</span>
        <span v-html="item" />
      </li>
    </ol>
  </div>
</template>

<style scoped>
.demo {
  width: 640px;
  margin: 0 auto;
  text-align: left;
  background: var(--surface);
  border: 1px solid var(--border);
  border-top: 4px solid var(--sp-warning);
  border-radius: 12px;
  padding: 18px 26px 16px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: var(--sp-warning);
  margin-bottom: 4px;
}

.tag span { font-size: 1.1rem; letter-spacing: 0; }
h2 { font-size: 1.6rem; margin: 0 0 12px; }
ol { list-style: none; padding: 0; margin: 0; display: grid; grid-auto-flow: column; grid-template-columns: 1fr 1fr; gap: 8px 22px; }
li { display: grid; grid-template-columns: 26px 1fr; gap: 9px; align-items: center; font-size: 0.92rem; line-height: 1.3; margin: 0; }

.n {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--sp-warning) 25%, transparent);
  color: var(--sp-warning);
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
