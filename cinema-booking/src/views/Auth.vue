<template>
  <div class="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
    <div class="w-full max-w-md border border-border rounded-lg bg-card">
      <div class="p-6 space-y-1 text-center">
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Film class="h-6 w-6 text-primary" />
        </div>
        <h1 class="text-2xl font-semibold">{{ isLogin ? 'Đăng nhập' : 'Đăng ký' }}</h1>
        <p class="text-sm text-muted-foreground">
          {{ isLogin ? 'Đăng nhập để đặt vé và quản lý tài khoản' : 'Tạo tài khoản mới để bắt đầu' }}
        </p>
      </div>
      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div v-if="!isLogin" class="space-y-2">
            <label for="name" class="text-sm font-medium">Họ và tên</label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="Nguyễn Văn A"
              required
              class="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div class="space-y-2">
            <label for="email" class="text-sm font-medium">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="email@example.com"
              required
              class="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div class="space-y-2">
            <label for="password" class="text-sm font-medium">Mật khẩu</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div v-if="isLogin" class="flex items-center justify-end">
            <a href="#" class="text-sm text-primary hover:underline">
              Quên mật khẩu?
            </a>
          </div>

          <Button type="submit" class="w-full">
            {{ isLogin ? 'Đăng nhập' : 'Đăng ký' }}
          </Button>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t border-border" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-card px-2 text-muted-foreground">Hoặc</span>
            </div>
          </div>

          <Button type="button" variant="outline" class="w-full bg-transparent">
            Đăng nhập với Google
          </Button>

          <div class="text-center text-sm">
            <span class="text-muted-foreground">{{ isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?' }}</span>
            <button type="button" @click="isLogin = !isLogin" class="text-primary hover:underline ml-1">
              {{ isLogin ? 'Đăng ký ngay' : 'Đăng nhập' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Film } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const router = useRouter()

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const name = ref('')

const handleSubmit = () => {
  // Mock authentication - just redirect to home
  console.log('Auth submitted:', { email: email.value, password: password.value, name: name.value, isLogin: isLogin.value })
  router.push('/')
}
</script>
