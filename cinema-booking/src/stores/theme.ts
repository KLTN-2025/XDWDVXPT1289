import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<'dark' | 'light'>('dark')

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    updateTheme()
  }

  const updateTheme = () => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme.value)
  }

  return {
    theme,
    toggleTheme,
    updateTheme
  }
})
