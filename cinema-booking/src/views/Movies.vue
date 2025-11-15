<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold">Phim đang chiếu</h1>
      <p class="mt-2 text-muted-foreground">Khám phá và đặt vé cho các bộ phim mới nhất</p>
    </div>

    <!-- Filters -->
    <div class="mb-8 flex flex-wrap gap-2">
      <Button
        v-for="filterOption in filterOptions"
        :key="filterOption.value"
        :variant="filter === filterOption.value ? 'default' : 'outline'"
        @click="filter = filterOption.value"
        :class="filter !== filterOption.value ? 'bg-transparent' : ''"
      >
        {{ filterOption.label }}
      </Button>
    </div>

    <!-- Movies Grid -->
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="group overflow-hidden border border-border bg-card transition-all hover:border-primary/50"
      >
        <div class="relative aspect-[2/3] overflow-hidden">
          <img
            :src="movie.poster || '/placeholder.svg'"
            :alt="movie.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div class="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-sm font-semibold backdrop-blur">
            <Star class="h-4 w-4 fill-warning text-warning" />
            {{ movie.rating }}
          </div>
        </div>

        <div class="p-4">
          <h3 class="text-balance text-lg font-semibold">{{ movie.title }}</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ movie.genre }}</p>

          <div class="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
            <span class="flex items-center gap-1">
              <Clock class="h-4 w-4" />
              {{ movie.duration }}p
            </span>
            <span class="rounded-full bg-secondary px-2 py-1 text-xs">
              Đang chiếu
            </span>
          </div>

          <div class="mt-4 flex gap-2">
            <Button size="sm" class="flex-1 gap-1" @click="selectedMovie = movie.id">
              <Ticket class="h-4 w-4" />
              Đặt vé
            </Button>
            <Button
              size="sm"
              variant="outline"
              @click="selectedMovie = movie.id"
              class="bg-transparent"
            >
              Chi tiết
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Movie Detail Modal -->
    <div v-if="selectedMovie" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="selectedMovie = null">
      <div class="bg-card border border-border rounded-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto" @click.stop>
        <div v-if="movie" class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-2xl font-bold">{{ movie.title }}</h2>
              <p class="text-muted-foreground">{{ movie.genre }}</p>
            </div>
            <Button variant="ghost" size="icon" @click="selectedMovie = null">
              <X class="h-5 w-5" />
            </Button>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <div class="relative aspect-[2/3] overflow-hidden rounded-lg">
              <img :src="movie.poster || '/placeholder.svg'" :alt="movie.title" class="w-full h-full object-cover" />
            </div>

            <div class="space-y-4">
              <div>
                <h4 class="mb-2 font-semibold">Mô tả</h4>
                <p class="text-pretty text-sm text-muted-foreground">{{ movie.description }}</p>
              </div>

              <div class="flex items-center gap-4 text-sm">
                <div class="flex items-center gap-1">
                  <Star class="h-4 w-4 fill-warning text-warning" />
                  <span class="font-semibold">{{ movie.rating }}/10</span>
                </div>
                <div class="flex items-center gap-1">
                  <Clock class="h-4 w-4" />
                  <span>{{ movie.duration }} phút</span>
                </div>
              </div>

              <div>
                <h4 class="mb-3 flex items-center gap-2 font-semibold">
                  <Calendar class="h-4 w-4" />
                  Suất chiếu hôm nay
                </h4>
                <div class="grid grid-cols-4 gap-2">
                  <RouterLink
                    v-for="time in movie.showtimes"
                    :key="time"
                    :to="`/seats?movie=${movie.id}&time=${time}`"
                    @click="selectedMovie = null"
                  >
                    <Button variant="outline" size="sm" class="w-full bg-transparent">
                      {{ time }}
                    </Button>
                  </RouterLink>
                </div>
              </div>

              <RouterLink :to="`/seats?movie=${movie.id}`" @click="selectedMovie = null">
                <Button class="w-full gap-2">
                  <Ticket class="h-4 w-4" />
                  Chọn ghế và đặt vé
                </Button>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Star, Clock, Calendar, Ticket, X } from 'lucide-vue-next'
import { movies } from '@/lib/mock-data'
import Button from '@/components/ui/Button.vue'

const selectedMovie = ref<string | null>(null)
const filter = ref<'all' | 'action' | 'scifi' | 'adventure'>('all')

const movie = computed(() => movies.find((m) => m.id === selectedMovie.value))

const filterOptions = [
  { value: 'all', label: 'Tất cả' },
  { value: 'action', label: 'Hành động' },
  { value: 'scifi', label: 'Khoa học viễn tưởng' },
  { value: 'adventure', label: 'Phiêu lưu' }
]

const filteredMovies = computed(() => {
  if (filter.value === 'all') return movies
  return movies.filter((movie) => movie.genre.toLowerCase().includes(filter.value))
})
</script>
