"use client"

import { useSearchParams } from "next/navigation"
import { movies } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Download, Share2, Calendar, Clock, MapPin, Ticket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"

export default function TicketPage() {
  const searchParams = useSearchParams()

  const bookingId = searchParams.get("id") || "BK000000"
  const movieId = searchParams.get("movie") || "1"
  const showtime = searchParams.get("time") || "10:00"
  const seats = searchParams.get("seats")?.split(",") || []
  const total = Number.parseInt(searchParams.get("total") || "0")

  const movie = movies.find((m) => m.id === movieId) || movies[0]
  const currentDate = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Success Message */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h1 className="text-3xl font-bold">Đặt vé thành công!</h1>
        <p className="mt-2 text-muted-foreground">Vé điện tử của bạn đã sẵn sàng</p>
      </div>

      <div className="mx-auto max-w-2xl">
        <Card className="overflow-hidden border-border">
          <CardHeader className="border-b border-border bg-card/50">
            <div className="flex items-center justify-between">
              <CardTitle>Vé điện tử</CardTitle>
              <Badge variant="default" className="gap-1">
                <Ticket className="h-3 w-3" />
                {bookingId}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Movie Info */}
              <div className="flex gap-4">
                <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{movie.title}</h2>
                  <p className="mt-1 text-muted-foreground">{movie.genre}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {movie.duration} phút
                    </span>
                    <Badge variant="secondary">{movie.rating}/10</Badge>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="grid gap-4 rounded-lg border border-border bg-muted/30 p-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Ngày chiếu</p>
                      <p className="font-medium">{currentDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Giờ chiếu</p>
                      <p className="font-medium">{showtime}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Rạp chiếu</p>
                      <p className="font-medium">CineMax Hà Nội</p>
                      <p className="text-sm text-muted-foreground">Phòng 1</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seats */}
              <div>
                <p className="mb-2 text-sm text-muted-foreground">Ghế ngồi</p>
                <div className="flex flex-wrap gap-2">
                  {seats.map((seat) => (
                    <Badge key={seat} variant="default" className="px-3 py-1">
                      {seat}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center gap-4 border-t border-border pt-6">
                <div className="rounded-lg border-4 border-border bg-white p-4">
                  <QRCodeSVG value={`CINEMAX-${bookingId}-${movieId}-${seats.join(",")}`} size={200} level="H" />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  Vui lòng xuất trình mã QR này tại quầy để nhận vé
                </p>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-lg font-semibold">Tổng thanh toán</span>
                <span className="text-2xl font-bold text-primary">{total.toLocaleString("vi-VN")}đ</span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="flex-1 gap-2" onClick={() => window.print()}>
                  <Download className="h-4 w-4" />
                  Tải vé
                </Button>
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Share2 className="h-4 w-4" />
                  Chia sẻ
                </Button>
              </div>

              <Link href="/" className="block">
                <Button variant="ghost" className="w-full">
                  Quay về trang chủ
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
