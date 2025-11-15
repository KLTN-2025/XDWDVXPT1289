<template>
  <div class="container mx-auto px-4 py-12">
    <div class="mb-8">
      <RouterLink :to="`/seats?movie=${movieId}&time=${showtime}`">
        <Button variant="ghost" class="mb-4 gap-2">
          <ArrowLeft class="h-4 w-4" />
          Quay lại
        </Button>
      </RouterLink>
      <h1 class="text-3xl font-bold">Thanh toán</h1>
      <p class="mt-2 text-muted-foreground">Hoàn tất đặt vé của bạn</p>
    </div>

    <div class="grid gap-8 lg:grid-cols-[1fr_400px]">
      <!-- Payment Form -->
      <div class="space-y-6">
        <!-- Customer Information -->
        <div class="border border-border rounded-lg bg-card">
          <div class="p-6 border-b border-border">
            <h2 class="text-xl font-semibold">Thông tin khách hàng</h2>
          </div>
          <div class="p-6 space-y-4">
            <div class="space-y-2">
              <label for="name" class="text-sm font-medium">Họ và tên</label>
              <input
                id="name"
                v-model="name"
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
              <label for="phone" class="text-sm font-medium">Số điện thoại</label>
              <input
                id="phone"
                v-model="phone"
                type="tel"
                placeholder="0912345678"
                required
                class="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="border border-border rounded-lg bg-card">
          <div class="p-6 border-b border-border">
            <h2 class="text-xl font-semibold">Phương thức thanh toán</h2>
          </div>
          <div class="p-6">
            <div class="space-y-3">
              <div
                :class="[
                  'flex items-center space-x-3 rounded-lg border-2 p-4 transition-colors cursor-pointer',
                  paymentMethod === 'momo' ? 'border-primary bg-primary/5' : 'border-border'
                ]"
                @click="paymentMethod = 'momo'"
              >
                <input
                  type="radio"
                  id="momo"
                  v-model="paymentMethod"
                  value="momo"
                  class="h-4 w-4 text-primary"
                />
                <label for="momo" class="flex flex-1 cursor-pointer items-center gap-3">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10">
                    <Wallet class="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <p class="font-semibold">Ví MoMo</p>
                    <p class="text-sm text-muted-foreground">Thanh toán qua ví điện tử MoMo</p>
                  </div>
                </label>
              </div>

              <div
                :class="[
                  'flex items-center space-x-3 rounded-lg border-2 p-4 transition-colors cursor-pointer',
                  paymentMethod === 'vnpay' ? 'border-primary bg-primary/5' : 'border-border'
                ]"
                @click="paymentMethod = 'vnpay'"
              >
                <input
                  type="radio"
                  id="vnpay"
                  v-model="paymentMethod"
                  value="vnpay"
                  class="h-4 w-4 text-primary"
                />
                <label for="vnpay" class="flex flex-1 cursor-pointer items-center gap-3">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                    <CreditCard class="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p class="font-semibold">VNPAY</p>
                    <p class="text-sm text-muted-foreground">Thanh toán qua cổng VNPAY</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <Button
          class="w-full gap-2"
          size="lg"
          @click="handlePayment"
          :disabled="!name || !email || !phone || isProcessing"
        >
          <div v-if="isProcessing" class="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
          <CheckCircle2 v-else class="h-5 w-5" />
          {{ isProcessing ? 'Đang xử lý...' : 'Xác nhận thanh toán' }}
        </Button>
      </div>

      <!-- Order Summary -->
      <div>
        <div class="sticky top-20 border border-border rounded-lg bg-card">
          <div class="p-6 border-b border-border">
            <h2 class="text-xl font-semibold">Chi tiết đơn hàng</h2>
          </div>
          <div class="p-6 space-y-4">
            <div class="flex gap-4">
              <div class="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                <img :src="movie.poster || '/placeholder.svg'" :alt="movie.title" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1">
                <h3 class="font-semibold">{{ movie.title }}</h3>
                <p class="text-sm text-muted-foreground">{{ movie.genre }}</p>
                <p class="mt-1 text-sm text-muted-foreground">{{ movie.duration }} phút</p>
              </div>
            </div>

            <div class="space-y-2 border-t border-border pt-4">
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Suất chiếu</span>
                <span class="font-medium">{{ showtime }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Số lượng ghế</span>
                <span class="font-medium">{{ seats.length }} ghế</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Ghế</span>
                <div class="flex flex-wrap justify-end gap-1">
                  <span
                    v-for="seat in seats"
                    :key="seat"
                    class="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs"
                  >
                    {{ seat }}
                  </span>
                </div>
              </div>
            </div>

            <div class="border-t border-border pt-4">
              <div class="flex items-center justify-between">
                <span class="font-semibold">Tổng cộng</span>
                <span class="text-2xl font-bold text-primary">{{ total.toLocaleString('vi-VN') }}đ</span>
              </div>
            </div>

            <div class="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
              <p>Vé điện tử sẽ được gửi đến email của bạn sau khi thanh toán thành công.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, CreditCard, Wallet, CheckCircle2 } from 'lucide-vue-next'
import { movies } from '@/lib/mock-data'
import Button from '@/components/ui/Button.vue'

const route = useRoute()
const router = useRouter()

const movieId = route.query.movie as string || '1'
const showtime = route.query.time as string || '10:00'
const seats = (route.query.seats as string || '').split(',').filter(Boolean)
const total = Number.parseInt(route.query.total as string || '0')

const movie = computed(() => movies.find((m) => m.id === movieId) || movies[0])

const paymentMethod = ref<'momo' | 'vnpay'>('momo')
const name = ref('')
const email = ref('')
const phone = ref('')
const isProcessing = ref(false)

const handlePayment = async () => {
  isProcessing.value = true
  // Simulate payment processing
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log('Payment processed:', { paymentMethod: paymentMethod.value, name: name.value, email: email.value, phone: phone.value })

  // Generate booking ID and redirect to ticket page
  const bookingId = `BK${Date.now()}`
  router.push(`/ticket?id=${bookingId}&movie=${movieId}&time=${showtime}&seats=${seats.join(',')}&total=${total}`)
}
</script>
