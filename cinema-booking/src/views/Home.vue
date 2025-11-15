<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-[600px] overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <img
        :src="featuredMovie.poster || '/placeholder.svg'"
        :alt="featuredMovie.title"
        class="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      <div class="container relative mx-auto flex h-full items-center px-4">
        <div class="max-w-2xl space-y-6">
          <div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Star class="h-4 w-4 fill-primary" />
            <span>Phim nổi bật</span>
          </div>

          <h1 class="text-balance text-5xl font-bold leading-tight md:text-6xl">{{ featuredMovie.title }}</h1>

          <p class="text-pretty text-lg text-muted-foreground">{{ featuredMovie.description }}</p>

          <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span class="flex items-center gap-1">
              <Star class="h-4 w-4 fill-warning text-warning" />
              {{ featuredMovie.rating }}/10
            </span>
            <span>{{ featuredMovie.duration }} phút</span>
            <span>{{ featuredMovie.genre }}</span>
          </div>

          <div class="flex flex-wrap gap-4">
            <RouterLink to="/movies">
              <Button size="lg" class="gap-2">
                <Ticket class="h-5 w-5" />
                Đặt vé ngay
              </Button>
            </RouterLink>
            <Button size="lg" variant="outline" class="gap-2 bg-transparent">
              <Play class="h-5 w-5" />
              Xem trailer
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Movies -->
    <section class="container mx-auto px-4 py-16">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h2 class="text-3xl font-bold">Phim đang hot</h2>
          <p class="mt-2 text-muted-foreground">Những bộ phim được yêu thích nhất</p>
        </div>
        <RouterLink to="/movies">
          <Button variant="ghost" class="gap-2">
            Xem tất cả
            <TrendingUp class="h-4 w-4" />
          </Button>
        </RouterLink>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <RouterLink
          v-for="movie in trendingMovies"
          :key="movie.id"
          :to="`/movies?selected=${movie.id}`"
          class="group"
        >
          <div class="overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
            <div class="relative aspect-[2/3] overflow-hidden">
              <img
                :src="movie.poster || '/placeholder.svg'"
                :alt="movie.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold backdrop-blur">
                <Star class="h-3 w-3 fill-warning text-warning" />
                {{ movie.rating }}
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-balance text-lg font-semibold">{{ movie.title }}</h3>
              <p class="mt-1 text-sm text-muted-foreground">{{ movie.genre }}</p>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-sm text-muted-foreground">{{ movie.duration }} phút</span>
                <Button size="sm" variant="ghost" class="gap-1 text-primary">
                  <Ticket class="h-4 w-4" />
                  Đặt vé
                </Button>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- Features -->
    <section class="border-t border-border bg-card/50 py-16">
      <div class="container mx-auto px-4">
        <div class="grid gap-8 md:grid-cols-3">
          <div class="text-center">
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Ticket class="h-6 w-6 text-primary" />
            </div>
            <h3 class="mb-2 text-lg font-semibold">Đặt vé dễ dàng</h3>
            <p class="text-sm text-muted-foreground">Chọn phim, chọn ghế và thanh toán chỉ trong vài bước</p>
          </div>
          <div class="text-center">
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Star class="h-6 w-6 text-primary" />
            </div>
            <h3 class="mb-2 text-lg font-semibold">Chất lượng cao</h3>
            <p class="text-sm text-muted-foreground">Hệ thống rạp hiện đại với âm thanh và hình ảnh tuyệt vời</p>
          </div>
          <div class="text-center">
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Play class="h-6 w-6 text-primary" />
            </div>
            <h3 class="mb-2 text-lg font-semibold">Phim mới nhất</h3>
            <p class="text-sm text-muted-foreground">Cập nhật liên tục các bộ phim bom tấn mới nhất</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Play, Ticket, Star, TrendingUp } from 'lucide-vue-next'
import { movies } from '@/lib/mock-data'
import Button from '@/components/ui/Button.vue'

const featuredMovie = computed(() => movies[0])
const trendingMovies = computed(() => movies.slice(0, 3))
</script>
