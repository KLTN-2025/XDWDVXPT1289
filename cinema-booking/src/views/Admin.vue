<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold">Quản trị hệ thống</h1>
      <p class="mt-2 text-muted-foreground">Quản lý phim, suất chiếu và theo dõi doanh thu</p>
    </div>

    <!-- Stats Cards -->
    <div class="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="border border-border rounded-lg bg-card">
        <div class="p-6">
          <div class="flex items-center justify-between pb-2">
            <h3 class="text-sm font-medium text-muted-foreground">Tổng doanh thu</h3>
            <DollarSign class="h-4 w-4 text-green-600" />
          </div>
          <div class="text-2xl font-bold">{{ adminStats.totalRevenue.toLocaleString('vi-VN') }}đ</div>
          <p class="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp class="h-3 w-3 text-green-600" />
            <span class="text-green-600">+12.5%</span> so với tháng trước
          </p>
        </div>
      </div>

      <div class="border border-border rounded-lg bg-card">
        <div class="p-6">
          <div class="flex items-center justify-between pb-2">
            <h3 class="text-sm font-medium text-muted-foreground">Vé đã bán</h3>
            <Ticket class="h-4 w-4 text-primary" />
          </div>
          <div class="text-2xl font-bold">{{ adminStats.ticketsSold.toLocaleString('vi-VN') }}</div>
          <p class="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp class="h-3 w-3 text-green-600" />
            <span class="text-green-600">+8.2%</span> so với tháng trước
          </p>
        </div>
      </div>

      <div class="border border-border rounded-lg bg-card">
        <div class="p-6">
          <div class="flex items-center justify-between pb-2">
            <h3 class="text-sm font-medium text-muted-foreground">Suất chiếu</h3>
            <Calendar class="h-4 w-4 text-warning" />
          </div>
          <div class="text-2xl font-bold">{{ adminStats.activeShowtimes }}</div>
          <p class="mt-1 text-xs text-muted-foreground">Đang hoạt động</p>
        </div>
      </div>

      <div class="border border-border rounded-lg bg-card">
        <div class="p-6">
          <div class="flex items-center justify-between pb-2">
            <h3 class="text-sm font-medium text-muted-foreground">Tổng phim</h3>
            <Film class="h-4 w-4 text-accent" />
          </div>
          <div class="text-2xl font-bold">{{ adminStats.totalMovies }}</div>
          <p class="mt-1 text-xs text-muted-foreground">Đang chiếu</p>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="space-y-6">
      <div class="flex gap-2 border-b border-border">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === tab.value
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Movies Tab -->
      <div v-if="activeTab === 'movies'" class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold">Quản lý phim</h2>
          <Button class="gap-2" @click="isAddMovieOpen = true">
            <Plus class="h-4 w-4" />
            Thêm phim mới
          </Button>
        </div>

        <div class="grid gap-4">
          <div
            v-for="movie in movies"
            :key="movie.id"
            class="border border-border rounded-lg bg-card"
          >
            <div class="p-4">
              <div class="flex gap-4">
                <div class="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <img :src="movie.poster || '/placeholder.svg'" :alt="movie.title" class="w-full h-full object-cover" />
                </div>
                <div class="flex flex-1 flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between">
                      <div>
                        <h3 class="font-semibold">{{ movie.title }}</h3>
                        <p class="text-sm text-muted-foreground">{{ movie.genre }}</p>
                      </div>
                      <span class="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">{{ movie.rating }}/10</span>
                    </div>
                    <p class="mt-2 text-sm text-muted-foreground">{{ movie.duration }} phút</p>
                  </div>
                  <div class="flex gap-2">
                    <Button size="sm" variant="outline" class="gap-1 bg-transparent">
                      <Edit class="h-3 w-3" />
                      Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      class="gap-1 bg-transparent text-destructive hover:text-destructive"
                      @click="handleDeleteMovie(movie.id)"
                    >
                      <Trash2 class="h-3 w-3" />
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Showtimes Tab -->
      <div v-if="activeTab === 'showtimes'" class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold">Quản lý suất chiếu</h2>
          <Button class="gap-2">
            <Plus class="h-4 w-4" />
            Thêm suất chiếu
          </Button>
        </div>

        <div class="grid gap-4">
          <div
            v-for="movie in movies.slice(0, 3)"
            :key="movie.id"
            class="border border-border rounded-lg bg-card"
          >
            <div class="p-6">
              <h3 class="text-lg font-semibold mb-4">{{ movie.title }}</h3>
              <div class="space-y-3">
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar class="h-4 w-4" />
                  <span>Hôm nay</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="time in movie.showtimes"
                    :key="time"
                    class="px-2 py-1 rounded-full border border-border text-sm flex items-center gap-1"
                  >
                    {{ time }}
                    <button
                      class="h-4 w-4 p-0 hover:text-destructive"
                      @click="handleDeleteShowtime(time)"
                    >
                      <Trash2 class="h-3 w-3" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bookings Tab -->
      <div v-if="activeTab === 'bookings'" class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold">Quản lý đặt vé</h2>
          <Button variant="outline" class="gap-2 bg-transparent">
            <BarChart3 class="h-4 w-4" />
            Xuất báo cáo
          </Button>
        </div>

        <div class="border border-border rounded-lg bg-card">
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="booking in mockBookings"
                :key="booking.id"
                class="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="font-semibold">{{ booking.id }}</span>
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs',
                        booking.status === 'confirmed'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      ]"
                    >
                      {{ booking.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xử lý' }}
                    </span>
                  </div>
                  <p class="text-sm text-muted-foreground">{{ booking.movie }}</p>
                  <div class="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users class="h-3 w-3" />
                    <span>{{ booking.customer }}</span>
                    <span>•</span>
                    <span>Ghế: {{ booking.seats.join(', ') }}</span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-primary">{{ booking.total.toLocaleString('vi-VN') }}đ</p>
                  <Button size="sm" variant="ghost" class="mt-1">
                    Chi tiết
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Movie Modal -->
    <div v-if="isAddMovieOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="isAddMovieOpen = false">
      <div class="bg-card border border-border rounded-lg max-w-md w-full mx-4" @click.stop>
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Thêm phim mới</h2>
            <Button variant="ghost" size="icon" @click="isAddMovieOpen = false">
              <X class="h-5 w-5" />
            </Button>
          </div>
          <p class="text-sm text-muted-foreground mb-4">Nhập thông tin phim để thêm vào hệ thống</p>
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="movie-title" class="text-sm font-medium">Tên phim</label>
              <input
                id="movie-title"
                v-model="newMovieTitle"
                placeholder="Nhập tên phim"
                class="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div class="space-y-2">
              <label for="movie-genre" class="text-sm font-medium">Thể loại</label>
              <input
                id="movie-genre"
                placeholder="Hành động, Khoa học viễn tưởng"
                class="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div class="space-y-2">
              <label for="movie-duration" class="text-sm font-medium">Thời lượng (phút)</label>
              <input
                id="movie-duration"
                type="number"
                placeholder="120"
                class="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div class="space-y-2">
              <label for="movie-description" class="text-sm font-medium">Mô tả</label>
              <input
                id="movie-description"
                placeholder="Mô tả ngắn về phim"
                class="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button class="w-full" @click="handleAddMovie">
              Thêm phim
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DollarSign, Ticket, Film, TrendingUp, Plus, Edit, Trash2, Calendar, Users, BarChart3, X } from 'lucide-vue-next'
import { movies, adminStats } from '@/lib/mock-data'
import Button from '@/components/ui/Button.vue'

const activeTab = ref<'movies' | 'showtimes' | 'bookings'>('movies')
const isAddMovieOpen = ref(false)
const newMovieTitle = ref('')

const tabs = [
  { value: 'movies', label: 'Phim' },
  { value: 'showtimes', label: 'Suất chiếu' },
  { value: 'bookings', label: 'Đặt vé' }
]

const mockBookings = [
  {
    id: 'BK001',
    movie: 'Avengers: Endgame',
    customer: 'Nguyễn Văn A',
    seats: ['A1', 'A2'],
    total: 200000,
    status: 'confirmed',
  },
  {
    id: 'BK002',
    movie: 'The Batman',
    customer: 'Trần Thị B',
    seats: ['B5', 'B6', 'B7'],
    total: 300000,
    status: 'confirmed',
  },
  {
    id: 'BK003',
    movie: 'Spider-Man: No Way Home',
    customer: 'Lê Văn C',
    seats: ['C10'],
    total: 100000,
    status: 'pending',
  },
]

const handleAddMovie = () => {
  console.log('Adding movie:', newMovieTitle.value)
  isAddMovieOpen.value = false
  newMovieTitle.value = ''
}

const handleDeleteMovie = (movieId: string) => {
  console.log('Deleting movie:', movieId)
}

const handleDeleteShowtime = (time: string) => {
  console.log('Deleting showtime:', time)
}
</script>
