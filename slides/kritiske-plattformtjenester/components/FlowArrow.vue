<script setup lang="ts">
import CrossBadge from './CrossBadge.vue'

// Pil som tegnes som «—(X)—▶». Hvit når den fungerer, rød med kryss i sirkel når den stopper.
withDefaults(defineProps<{
  blocked?: boolean
  dir?: 'right' | 'left' | 'up' | 'down'
}>(), { dir: 'right' })
</script>

<template>
  <div class="fa" :class="[dir, { blocked }]">
    <span v-if="dir === 'left' || dir === 'up'" class="head" />
    <span class="line" />
    <CrossBadge v-if="blocked" class="mid" />
    <span v-if="blocked" class="line" />
    <span v-if="dir === 'right' || dir === 'down'" class="head" />
  </div>
</template>

<style scoped>
.fa {
  --c: #fff;
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 0;
}
.fa.blocked {
  --c: var(--sp-danger);
}
.fa.up,
.fa.down {
  flex-direction: column;
  height: 100%;
  justify-content: center;
}
.fa.right,
.fa.left {
  width: 100%;
}
.line {
  flex: 1;
  background: var(--c);
}
.right .line,
.left .line {
  height: 3px;
  min-width: 6px;
}
.up .line,
.down .line {
  width: 3px;
  min-height: 4px;
}
.mid {
  flex-shrink: 0;
  margin: 0 2px;
}
.head {
  flex-shrink: 0;
  width: 0;
  height: 0;
  border: 8px solid transparent;
}
.right .head {
  border-left: 13px solid var(--c);
  border-right: 0;
}
.left .head {
  border-right: 13px solid var(--c);
  border-left: 0;
}
.up .head {
  border-bottom: 13px solid var(--c);
  border-top: 0;
}
.down .head {
  border-top: 13px solid var(--c);
  border-bottom: 0;
}
</style>
