"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { movies, generateSeats, type Seat } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Armchair, Crown } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function SeatsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const movieId = searchParams.get("movie") || "1"
  const showtime = searchParams.get("time") || "10:00"

  const movie = movies.find((m) => m.id === movieId) || movies[0]
  const [seats, setSeats] = useState<Seat[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  useEffect(() => {
    setSeats(generateSeats())
  }, [])

  const toggleSeat = (seatId: string) => {
    const seat = seats.find((s) => s.id === seatId)
    if (!seat || seat.status === "booked") return

    setSelectedSeats((prev) => (prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]))
  }

  const totalPrice = selectedSeats.reduce((sum, seatId) => {
    const seat = seats.find((s) => s.id === seatId)
    return sum + (seat?.price || 0)
  }, 0)

  const handleContinue = () => {
    if (selectedSeats.length === 0) return
    const seatNames = selectedSeats.join(",")
    router.push(`/payment?movie=${movieId}&time=${showtime}&seats=${seatNames}&total=${totalPrice}`)
  }

  const rows = Array.from(new Set(seats.map((s) => s.row))).sort()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link href="/movies">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <p className="mt-2 text-muted-foreground">
          Suất chiếu: {showtime} - {movie.duration} phút
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Seat Map */}
        <div>
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Chọn ghế ngồi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Screen */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-1 w-full max-w-2xl rounded-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                <p className="text-sm text-muted-foreground">Màn hình</p>
              </div>

              {/* Seats Grid */}
              <div className="flex justify-center">
                <div className="space-y-2">
                  {rows.map((row) => (
                    <div key={row} className="flex items-center gap-2">
                      <span className="w-6 text-center text-sm font-semibold text-muted-foreground">{row}</span>
                      <div className="flex gap-2">
                        {seats
                          .filter((s) => s.row === row)
                          .map((seat) => {
                            const isSelected = selectedSeats.includes(seat.id)
                            const isBooked = seat.status === "booked"
                            const isVIP = seat.type === "vip"

                            return (
                              <button
                                key={seat.id}
                                onClick={() => toggleSeat(seat.id)}
                                disabled={isBooked}
                                className={cn(
                                  "relative h-8 w-8 rounded-t-lg border-2 transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100",
                                  isBooked && "border-muted bg-muted",
                                  !isBooked && !isSelected && isVIP && "border-warning/50 bg-warning/10",
                                  !isBooked && !isSelected && !isVIP && "border-border bg-secondary",
                                  isSelected && "border-primary bg-primary shadow-lg shadow-primary/50",
                                )}
                                title={`${seat.id} - ${seat.price.toLocaleString("vi-VN")}đ`}
                              >
                                {isVIP && !isBooked && (
                                  <Crown className="absolute inset-0 m-auto h-4 w-4 text-warning" />
                                )}
                              </button>
                            )
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-6 border-t border-border pt-6">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-t-lg border-2 border-border bg-secondary" />
                  <span className="text-sm text-muted-foreground">Ghế thường</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative h-6 w-6 rounded-t-lg border-2 border-warning/50 bg-warning/10">
                    <Crown className="absolute inset-0 m-auto h-3 w-3 text-warning" />
                  </div>
                  <span className="text-sm text-muted-foreground">Ghế VIP</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-t-lg border-2 border-primary bg-primary" />
                  <span className="text-sm text-muted-foreground">Đã chọn</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-t-lg border-2 border-muted bg-muted opacity-50" />
                  <span className="text-sm text-muted-foreground">Đã đặt</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20 border-border">
            <CardHeader>
              <CardTitle>Thông tin đặt vé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Phim</p>
                <p className="font-semibold">{movie.title}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Suất chiếu</p>
                <p className="font-semibold">{showtime}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Ghế đã chọn</p>
                {selectedSeats.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedSeats.map((seatId) => {
                      const seat = seats.find((s) => s.id === seatId)
                      return (
                        <Badge key={seatId} variant={seat?.type === "vip" ? "default" : "secondary"}>
                          {seatId}
                        </Badge>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Chưa chọn ghế</p>
                )}
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tổng tiền</span>
                  <span className="text-2xl font-bold text-primary">{totalPrice.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>

              <Button className="w-full gap-2" disabled={selectedSeats.length === 0} onClick={handleContinue}>
                <Armchair className="h-4 w-4" />
                Tiếp tục thanh toán
              </Button>

              {selectedSeats.length === 0 && (
                <p className="text-center text-xs text-muted-foreground">Vui lòng chọn ít nhất một ghế</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
