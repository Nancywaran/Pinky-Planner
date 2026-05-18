<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import '@/styles/global.css'

const { initAuth } = useAuth()
const isDarkMode = ref(false)

// Initialize auth
onMounted(async () => {
  await initAuth()
  
  // Check for dark mode preference
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode !== null) {
    isDarkMode.value = JSON.parse(savedDarkMode)
  } else {
    // Check system preference
    isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  
  updateDarkMode()
})

// Toggle dark mode
function updateDarkMode() {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark-mode')
  } else {
    document.documentElement.classList.remove('dark-mode')
  }
  localStorage.setItem('darkMode', JSON.stringify(isDarkMode.value))
}

// Watch for dark mode changes
import { watch } from 'vue'
watch(isDarkMode, updateDarkMode)

// Expose to window for global access
window.toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}
</script>

<style scoped>
#app {
  min-height: 100vh;
  transition: background-color 0.3s ease;
}
</style>
