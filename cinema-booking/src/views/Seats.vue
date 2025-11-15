<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Header -->
    <div class="mb-8">
      <RouterLink to="/movies">
        <Button variant="ghost" class="mb-4 gap-2">
          <ArrowLeft class="h-4 w-4" />
          Quay lại
        </Button>
      </RouterLink>
      <h1 class="text-3xl font-bold">{{ movie.title }}</h1>
      <p class="mt-2 text-muted-foreground">
        Suất chiếu: {{ showtime }} - {{ movie.duration }} phút
      </p>
    </div>

    <div class="grid gap-8 lg:grid-cols-[1fr_320px]">
      <!-- Seat Map -->
      <div>
        <div class="border border-border rounded-lg bg-card">
          <div class="p-6 border-b border-border">
            <h2 class="text-xl font-semibold">Chọn ghế ngồi</h2>
          </div>
          <div class="p-6 space-y-6">
            <!-- Screen -->
            <div class="flex flex-col items-center gap-2">
              <div class="h-1 w-full max-w-2xl rounded-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              <p class="text-sm text-muted-foreground">Màn hình</p>
            </div>

            <!-- Seats Grid -->
            <div class="flex justify-center">
              <div class="space-y-2">
                <div v-for="row in rows" :key="row" class="flex items-center gap-2">
                  <span class="w-6 text-center text-sm font-semibold text-muted-foreground">{{ row }}</span>
                  <div class="flex gap-2">
                    <button
                      v-for="seat in getSeatsByRow(row)"
                      :key="seat.id"
                      @click="toggleSeat(seat.id)"
                      :disabled="seat.status === 'booked'"
                      :class="getSeatClasses(seat)"
                      :title="`${seat.id} - ${seat.price.toLocaleString('vi-VN')}đ`"
                    >
                      <Crown v-if="seat.type === 'vip' && seat.status !== 'booked'" class="absolute inset-0 m-auto h-4 w-4 text-warning" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Legend -->
            <div class="flex flex-wrap justify-center gap-6 border-t border-border pt-6">
              <div class="flex items-center gap-2">
                <div class="h-6 w-6 rounded-t-lg border-2 border-border bg-secondary" />
                <span class="text-sm text-muted-foreground">Ghế thường</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="relative h-6 w-6 rounded-t-lg border-2 border-warning/50 bg-warning/10">
                  <Crown class="absolute inset-0 m-auto h-3 w-3 text-warning" />
                </div>
                <span class="text-sm text-muted-foreground">Ghế VIP</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-6 w-6 rounded-t-lg border-2 border-primary bg-primary" />
                <span class="text-sm text-muted-foreground">Đã chọn</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-6 w-6 rounded-t-lg border-2 border-muted bg-muted opacity-50" />
                <span class="text-sm text-muted-foreground">Đã đặt</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div>
        <div class="sticky top-20 border border-border rounded-lg bg-card">
          <div class="p-6 border-b border-border">
            <h2 class="text-xl font-semibold">Thông tin đặt vé</h2>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <p class="text-sm text-muted-foreground">Phim</p>
              <p class="font-semibold">{{ movie.title }}</p>
            </div>

            <div>
              <p class="text-sm text-muted-foreground">Suất chiếu</p>
              <p class="font-semibold">{{ showtime }}</p>
            </div>

            <div>
              <p class="text-sm text-muted-foreground">Ghế đã chọn</p>
              <div v-if="selectedSeats.length > 0" class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="seatId in selectedSeats"
                  :key="seatId"
                  :class="getSeatBadgeClass(seatId)"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ seatId }}
                </span>
              </div>
              <p v-else class="text-sm text-muted-foreground">Chưa chọn ghế</p>
            </div>

            <div class="border-t border-border pt-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">Tổng tiền</span>
                <span class="text-2xl font-bold text-primary">{{ totalPrice.toLocaleString('vi-VN') }}đ</span>
              </div>
            </div>

            <Button class="w-full gap-2" :disabled="selectedSeats.length === 0" @click="handleContinue">
              <Armchair class="h-4 w-4" />
              Tiếp tục thanh toán
            </Button>

            <p v-if="selectedSeats.length === 0" class="text-center text-xs text-muted-foreground">Vui lòng chọn ít nhất một ghế</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Armchair, Crown } from 'lucide-vue-next'
import { movies, generateSeats, type Seat } from '@/lib/mock-data'
import Button from '@/components/ui/Button.vue'

const route = useRoute()
const router = useRouter()

const movieId = route.query.movie as string || '1'
const showtime = route.query.time as string || '10:00'

const movie = computed(() => movies.find((m) => m.id === movieId) || movies[0])
const seats = ref<Seat[]>([])
const selectedSeats = ref<string[]>([])

onMounted(() => {
  seats.value = generateSeats()
})

const toggleSeat = (seatId: string) => {
  const seat = seats.value.find((s) => s.id === seatId)
  if (!seat || seat.status === 'booked') return

  if (selectedSeats.value.includes(seatId)) {
    selectedSeats.value = selectedSeats.value.filter((id) => id !== seatId)
  } else {
    selectedSeats.value.push(seatId)
  }
}

const totalPrice = computed(() => {
  return selectedSeats.value.reduce((sum, seatId) => {
    const seat = seats.value.find((s) => s.id === seatId)
    return sum + (seat?.price || 0)
  }, 0)
})

const handleContinue = () => {
  if (selectedSeats.value.length === 0) return
  const seatNames = selectedSeats.value.join(',')
  router.push(`/payment?movie=${movieId}&time=${showtime}&seats=${seatNames}&total=${totalPrice.value}`)
}

const rows = computed(() => {
  return Array.from(new Set(seats.value.map((s) => s.row))).sort()
})

const getSeatsByRow = (row: string) => {
  return seats.value.filter((s) => s.row === row)
}

const getSeatClasses = (seat: Seat) => {
  const isSelected = selectedSeats.value.includes(seat.id)
  const isBooked = seat.status === 'booked'
  const isVIP = seat.type === 'vip'

  const baseClasses = 'relative h-8 w-8 rounded-t-lg border-2 transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100'

  if (isBooked) {
    return `${baseClasses} border-muted bg-muted`
  }
  if (isSelected) {
    return `${baseClasses} border-primary bg-primary shadow-lg shadow-primary/50`
  }
  if (isVIP) {
    return `${baseClasses} border-warning/50 bg-warning/10`
  }
  return `${baseClasses} border-border bg-secondary`
}

const getSeatBadgeClass = (seatId: string) => {
  const seat = seats.value.find((s) => s.id === seatId)
  return seat?.type === 'vip' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
}
</script>
