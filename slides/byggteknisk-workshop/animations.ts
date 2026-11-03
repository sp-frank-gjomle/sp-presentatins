import { ref, watch } from 'vue'

// Av/på for animasjoner. Lagres i localStorage og synkes mellom faner/vinduer (f.eks. presentatørvisning).
const STORAGE_KEY = 'sp-animations'
const CLASS_NAME = 'sp-no-anim'
const hasWindow = typeof window !== 'undefined'

export const animationsEnabled = ref(hasWindow ? localStorage.getItem(STORAGE_KEY) !== 'off' : true)

export function toggleAnimations() {
  animationsEnabled.value = !animationsEnabled.value
}

if (hasWindow) {
  watch(animationsEnabled, (enabled) => {
    document.documentElement.classList.toggle(CLASS_NAME, !enabled)
    localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off')
  }, { immediate: true })

  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY)
      animationsEnabled.value = e.newValue !== 'off'
  })

  // Tast A. Ignoreres i tekstfelt, med modifikatortaster og i tegnemodus (der velger A pil-verktøyet).
  window.addEventListener('keydown', (e) => {
    const target = e.target as HTMLElement | null
    if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || e.key.toLowerCase() !== 'a')
      return
    if (localStorage.getItem('slidev-drawing-enabled') === 'true')
      return
    if (target?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName ?? ''))
      return
    toggleAnimations()
  })
}
