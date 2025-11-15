<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Success Message -->
    <div class="mb-8 text-center">
      <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
        <CheckCircle2 class="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <h1 class="text-3xl font-bold">Đặt vé thành công!</h1>
      <p class="mt-2 text-muted-foreground">Vé điện tử của bạn đã sẵn sàng</p>
    </div>

    <div class="mx-auto max-w-2xl">
      <div class="overflow-hidden border border-border rounded-lg bg-card">
        <div class="p-6 border-b border-border bg-card/50">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">Vé điện tử</h2>
            <span class="px-2 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium gap-1 flex items-center">
              <Ticket class="h-3 w-3" />
              {{ bookingId }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <div class="space-y-6">
            <!-- Movie Info -->
            <div class="flex gap-4">
              <div class="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                <img :src="movie.poster || '/placeholder.svg'" :alt="movie.title" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold">{{ movie.title }}</h2>
                <p class="mt-1 text-muted-foreground">{{ movie.genre }}</p>
                <div class="mt-3 flex flex-wrap gap-3 text-sm">
                  <span class="flex items-center gap-1 text-muted-foreground">
                    <Clock class="h-4 w-4" />
                    {{ movie.duration }} phút
                  </span>
                  <span class="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">{{ movie.rating }}/10</span>
                </div>
              </div>
            </div>

            <!-- Booking Details -->
            <div class="grid gap-4 rounded-lg border border-border bg-muted/30 p-4 sm:grid-cols-2">
              <div class="space-y-3">
                <div class="flex items-start gap-2">
                  <Calendar class="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p class="text-xs text-muted-foreground">Ngày chiếu</p>
                    <p class="font-medium">{{ currentDate }}</p>
                  </div>
                </div>
                <div class="flex items-start gap-2">
                  <Clock class="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p class="text-xs text-muted-foreground">Giờ chiếu</p>
                    <p class="font-medium">{{ showtime }}</p>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <div class="flex items-start gap-2">
                  <MapPin class="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p class="text-xs text-muted-foreground">Rạp chiếu</p>
                    <p class="font-medium">CineMax Hà Nội</p>
                    <p class="text-sm text-muted-foreground">Phòng 1</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Seats -->
            <div>
              <p class="mb-2 text-sm text-muted-foreground">Ghế ngồi</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="seat in seats"
                  :key="seat"
                  class="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium"
                >
                  {{ seat }}
                </span>
              </div>
            </div>

            <!-- QR Code -->
            <div class="flex flex-col items-center gap-4 border-t border-border pt-6">
              <div class="rounded-lg border-4 border-border bg-white p-4">
                <div ref="qrCodeRef" class="w-[200px] h-[200px]"></div>
              </div>
              <p class="text-center text-sm text-muted-foreground">
                Vui lòng xuất trình mã QR này tại quầy để nhận vé
              </p>
            </div>

            <!-- Total -->
            <div class="flex items-center justify-between border-t border-border pt-4">
              <span class="text-lg font-semibold">Tổng thanh toán</span>
              <span class="text-2xl font-bold text-primary">{{ total.toLocaleString('vi-VN') }}đ</span>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-3 sm:flex-row">
              <Button class="flex-1 gap-2" @click="downloadTicket">
                <Download class="h-4 w-4" />
                Tải vé
              </Button>
              <Button variant="outline" class="flex-1 gap-2 bg-transparent">
                <Share2 class="h-4 w-4" />
                Chia sẻ
              </Button>
            </div>

            <RouterLink to="/">
              <Button variant="ghost" class="w-full">
                Quay về trang chủ
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { CheckCircle2, Download, Share2, Calendar, Clock, MapPin, Ticket } from 'lucide-vue-next'
import { movies } from '@/lib/mock-data'
import Button from '@/components/ui/Button.vue'
import QRCode from 'qrcode'

const route = useRoute()

const bookingId = route.query.id as string || 'BK000000'
const movieId = route.query.movie as string || '1'
const showtime = route.query.time as string || '10:00'
const seats = (route.query.seats as string || '').split(',').filter(Boolean)
const total = Number.parseInt(route.query.total as string || '0')

const movie = computed(() => movies.find((m) => m.id === movieId) || movies[0])
const qrCodeRef = ref<HTMLDivElement>()

const currentDate = computed(() => {
  return new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

onMounted(async () => {
  if (qrCodeRef.value) {
    const qrData = `CINEMAX-${bookingId}-${movieId}-${seats.join(',')}`
    try {
      const qrCodeDataURL = await QRCode.toDataURL(qrData, { width: 200, margin: 2 })
      qrCodeRef.value.innerHTML = `<img src="${qrCodeDataURL}" alt="QR Code" />`
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }
})

const downloadTicket = () => {
  window.print()
}
</script>
