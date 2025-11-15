<template>
  <div class="min-h-screen bg-background text-foreground">
    <Header />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <ChatbotWidget />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ChatbotWidget from '@/components/ChatbotWidget.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.updateTheme()
})
</script>
