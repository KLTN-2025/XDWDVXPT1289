<template>
  <header class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto flex h-16 items-center justify-between px-4">
      <RouterLink to="/" class="flex items-center gap-2 text-xl font-bold">
        <Film class="h-6 w-6 text-primary" />
        <span>CineMax</span>
      </RouterLink>

      <nav class="hidden items-center gap-6 md:flex">
        <RouterLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          class="text-sm font-medium transition-colors hover:text-primary"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-4">
        <Button variant="ghost" size="icon" @click="toggleTheme" class="h-9 w-9">
          <Sun v-if="theme === 'dark'" class="h-4 w-4" />
          <Moon v-else class="h-4 w-4" />
        </Button>
        <RouterLink to="/auth" class="hidden sm:block">
          <Button variant="outline" size="sm">
            Đăng nhập
          </Button>
        </RouterLink>

        <!-- Mobile menu button -->
        <Button variant="ghost" size="icon" @click="isOpen = !isOpen" class="md:hidden h-9 w-9">
          <Menu class="h-5 w-5" />
        </Button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isOpen" class="md:hidden border-t border-border bg-background/95 backdrop-blur">
      <nav class="container mx-auto flex flex-col gap-4 px-4 py-4">
        <RouterLink
          v-for="link in navLinks"
          :key="link.href"
          :to="link.href"
          @click="isOpen = false"
          class="text-lg font-medium transition-colors hover:text-primary"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink to="/auth" @click="isOpen = false">
          <Button variant="outline" class="w-full bg-transparent">
            Đăng nhập
          </Button>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Film, Sun, Moon, Menu } from 'lucide-vue-next'
import { useThemeStore } from '@/stores/theme'
import Button from '@/components/ui/Button.vue'

const themeStore = useThemeStore()
const { theme, toggleTheme } = themeStore
const isOpen = ref(false)

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/movies", label: "Phim" },
  { href: "/seats", label: "Chọn ghế" },
  { href: "/payment", label: "Thanh toán" },
  { href: "/admin", label: "Quản trị" },
]
</script>
