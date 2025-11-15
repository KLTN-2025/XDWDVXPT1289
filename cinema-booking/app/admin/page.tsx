"use client"

import { useState } from "react"
import { movies, adminStats } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Ticket, Film, TrendingUp, Plus, Edit, Trash2, Calendar, Users, BarChart3 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

export default function AdminPage() {
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false)
  const [newMovieTitle, setNewMovieTitle] = useState("")

  const handleAddMovie = () => {
    console.log("[v0] Adding movie:", newMovieTitle)
    setIsAddMovieOpen(false)
    setNewMovieTitle("")
  }

  const handleDeleteMovie = (movieId: string) => {
    console.log("[v0] Deleting movie:", movieId)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Quản trị hệ thống</h1>
        <p className="mt-2 text-muted-foreground">Quản lý phim, suất chiếu và theo dõi doanh thu</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalRevenue.toLocaleString("vi-VN")}đ</div>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success">+12.5%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vé đã bán</CardTitle>
            <Ticket className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.ticketsSold.toLocaleString("vi-VN")}</div>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-success" />
              <span className="text-success">+8.2%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Suất chiếu</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.activeShowtimes}</div>
            <p className="mt-1 text-xs text-muted-foreground">Đang hoạt động</p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng phim</CardTitle>
            <Film className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalMovies}</div>
            <p className="mt-1 text-xs text-muted-foreground">Đang chiếu</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="movies" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="movies">Phim</TabsTrigger>
          <TabsTrigger value="showtimes">Suất chiếu</TabsTrigger>
          <TabsTrigger value="bookings">Đặt vé</TabsTrigger>
        </TabsList>

        {/* Movies Tab */}
        <TabsContent value="movies" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Quản lý phim</h2>
            <Dialog open={isAddMovieOpen} onOpenChange={setIsAddMovieOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Thêm phim mới
                </Button>
              </DialogTrigger>
              <DialogContent className="border-border">
                <DialogHeader>
                  <DialogTitle>Thêm phim mới</DialogTitle>
                  <DialogDescription>Nhập thông tin phim để thêm vào hệ thống</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="movie-title">Tên phim</Label>
                    <Input
                      id="movie-title"
                      placeholder="Nhập tên phim"
                      value={newMovieTitle}
                      onChange={(e) => setNewMovieTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="movie-genre">Thể loại</Label>
                    <Input id="movie-genre" placeholder="Hành động, Khoa học viễn tưởng" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="movie-duration">Thời lượng (phút)</Label>
                    <Input id="movie-duration" type="number" placeholder="120" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="movie-description">Mô tả</Label>
                    <Input id="movie-description" placeholder="Mô tả ngắn về phim" />
                  </div>
                  <Button className="w-full" onClick={handleAddMovie}>
                    Thêm phim
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {movies.map((movie) => (
              <Card key={movie.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{movie.title}</h3>
                            <p className="text-sm text-muted-foreground">{movie.genre}</p>
                          </div>
                          <Badge variant="secondary">{movie.rating}/10</Badge>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{movie.duration} phút</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                          <Edit className="h-3 w-3" />
                          Sửa
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1 bg-transparent text-destructive hover:text-destructive"
                          onClick={() => handleDeleteMovie(movie.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Showtimes Tab */}
        <TabsContent value="showtimes" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Quản lý suất chiếu</h2>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm suất chiếu
            </Button>
          </div>

          <div className="grid gap-4">
            {movies.slice(0, 3).map((movie) => (
              <Card key={movie.id} className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">{movie.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Hôm nay</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {movie.showtimes.map((time) => (
                        <Badge key={time} variant="outline" className="gap-1">
                          {time}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-4 w-4 p-0 hover:bg-transparent hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Quản lý đặt vé</h2>
            <Button variant="outline" className="gap-2 bg-transparent">
              <BarChart3 className="h-4 w-4" />
              Xuất báo cáo
            </Button>
          </div>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    id: "BK001",
                    movie: "Avengers: Endgame",
                    customer: "Nguyễn Văn A",
                    seats: ["A1", "A2"],
                    total: 200000,
                    status: "confirmed",
                  },
                  {
                    id: "BK002",
                    movie: "The Batman",
                    customer: "Trần Thị B",
                    seats: ["B5", "B6", "B7"],
                    total: 300000,
                    status: "confirmed",
                  },
                  {
                    id: "BK003",
                    movie: "Spider-Man: No Way Home",
                    customer: "Lê Văn C",
                    seats: ["C10"],
                    total: 100000,
                    status: "pending",
                  },
                ].map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{booking.id}</span>
                        <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                          {booking.status === "confirmed" ? "Đã xác nhận" : "Chờ xử lý"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.movie}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{booking.customer}</span>
                        <span>•</span>
                        <span>Ghế: {booking.seats.join(", ")}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{booking.total.toLocaleString("vi-VN")}đ</p>
                      <Button size="sm" variant="ghost" className="mt-1">
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
