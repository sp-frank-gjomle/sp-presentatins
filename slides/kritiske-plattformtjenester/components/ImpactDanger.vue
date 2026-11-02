<template>
  <div class="impact">
    <span class="i-carbon:warning-filled icon" />
    <span><slot /></span>
  </div>
</template>

<style scoped>
.impact {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 18px;
  padding: 10px 20px;
  border-radius: 12px;
  border: 2px solid var(--sp-danger);
  background: color-mix(in srgb, var(--sp-danger) 14%, transparent);
  font-size: 1.15rem;
  font-weight: 700;
}
.icon {
  color: var(--sp-danger);
  font-size: 1.5rem;
  flex-shrink: 0;
}
</style>
