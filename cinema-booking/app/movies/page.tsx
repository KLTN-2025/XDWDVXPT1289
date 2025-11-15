"use client"

import { useState } from "react"
import { movies } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Calendar, Ticket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function MoviesPage() {
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "action" | "scifi" | "adventure">("all")

  const movie = movies.find((m) => m.id === selectedMovie)

  const filteredMovies = movies.filter((movie) => {
    if (filter === "all") return true
    return movie.genre.toLowerCase().includes(filter)
  })

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Phim đang chiếu</h1>
        <p className="mt-2 text-muted-foreground">Khám phá và đặt vé cho các bộ phim mới nhất</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={filter !== "all" ? "bg-transparent" : ""}
        >
          Tất cả
        </Button>
        <Button
          variant={filter === "action" ? "default" : "outline"}
          onClick={() => setFilter("action")}
          className={filter !== "action" ? "bg-transparent" : ""}
        >
          Hành động
        </Button>
        <Button
          variant={filter === "scifi" ? "default" : "outline"}
          onClick={() => setFilter("scifi")}
          className={filter !== "scifi" ? "bg-transparent" : ""}
        >
          Khoa học viễn tưởng
        </Button>
        <Button
          variant={filter === "adventure" ? "default" : "outline"}
          onClick={() => setFilter("adventure")}
          className={filter !== "adventure" ? "bg-transparent" : ""}
        >
          Phiêu lưu
        </Button>
      </div>

      {/* Movies Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMovies.map((movie) => (
          <Card key={movie.id} className="group overflow-hidden border-border transition-all hover:border-primary/50">
            <div className="relative aspect-[2/3] overflow-hidden">
              <Image
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-sm font-semibold backdrop-blur">
                <Star className="h-4 w-4 fill-warning text-warning" />
                {movie.rating}
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="text-balance text-lg font-semibold">{movie.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{movie.genre}</p>

              <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {movie.duration}p
                </span>
                <Badge variant="secondary" className="text-xs">
                  Đang chiếu
                </Badge>
              </div>

              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1 gap-1" onClick={() => setSelectedMovie(movie.id)}>
                  <Ticket className="h-4 w-4" />
                  Đặt vé
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedMovie(movie.id)}
                  className="bg-transparent"
                >
                  Chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Movie Detail Dialog */}
      <Dialog open={!!selectedMovie} onOpenChange={() => setSelectedMovie(null)}>
        <DialogContent className="max-w-3xl border-border">
          {movie && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{movie.title}</DialogTitle>
                <DialogDescription>{movie.genre}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                  <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold">Mô tả</h4>
                    <p className="text-pretty text-sm text-muted-foreground">{movie.description}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-semibold">{movie.rating}/10</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{movie.duration} phút</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold">
                      <Calendar className="h-4 w-4" />
                      Suất chiếu hôm nay
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      {movie.showtimes.map((time) => (
                        <Link key={time} href={`/seats?movie=${movie.id}&time=${time}`}>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            {time}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Link href={`/seats?movie=${movie.id}`} className="block">
                    <Button className="w-full gap-2">
                      <Ticket className="h-4 w-4" />
                      Chọn ghế và đặt vé
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
