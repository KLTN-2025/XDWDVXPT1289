import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Ticket, Star, TrendingUp } from "lucide-react"
import { movies } from "@/lib/mock-data"
import Image from "next/image"

export default function HomePage() {
  const featuredMovie = movies[0]
  const trendingMovies = movies.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <Image
          src={featuredMovie.poster || "/placeholder.svg"}
          alt={featuredMovie.title}
          fill
          className="object-cover opacity-30"
          priority
        />

        <div className="container relative mx-auto flex h-full items-center px-4">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <Star className="h-4 w-4 fill-primary" />
              <span>Phim nổi bật</span>
            </div>

            <h1 className="text-balance text-5xl font-bold leading-tight md:text-6xl">{featuredMovie.title}</h1>

            <p className="text-pretty text-lg text-muted-foreground">{featuredMovie.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                {featuredMovie.rating}/10
              </span>
              <span>{featuredMovie.duration} phút</span>
              <span>{featuredMovie.genre}</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/movies">
                <Button size="lg" className="gap-2">
                  <Ticket className="h-5 w-5" />
                  Đặt vé ngay
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Play className="h-5 w-5" />
                Xem trailer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Movies */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Phim đang hot</h2>
            <p className="mt-2 text-muted-foreground">Những bộ phim được yêu thích nhất</p>
          </div>
          <Link href="/movies">
            <Button variant="ghost" className="gap-2">
              Xem tất cả
              <TrendingUp className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {trendingMovies.map((movie) => (
            <Link key={movie.id} href={`/movies?selected=${movie.id}`} className="group">
              <div className="overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold backdrop-blur">
                    <Star className="h-3 w-3 fill-warning text-warning" />
                    {movie.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-balance text-lg font-semibold">{movie.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{movie.genre}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{movie.duration} phút</span>
                    <Button size="sm" variant="ghost" className="gap-1 text-primary">
                      <Ticket className="h-4 w-4" />
                      Đặt vé
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Đặt vé dễ dàng</h3>
              <p className="text-sm text-muted-foreground">Chọn phim, chọn ghế và thanh toán chỉ trong vài bước</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Chất lượng cao</h3>
              <p className="text-sm text-muted-foreground">Hệ thống rạp hiện đại với âm thanh và hình ảnh tuyệt vời</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Play className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Phim mới nhất</h3>
              <p className="text-sm text-muted-foreground">Cập nhật liên tục các bộ phim bom tấn mới nhất</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
