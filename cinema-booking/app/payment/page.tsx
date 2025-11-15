"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { movies } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Wallet, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const movieId = searchParams.get("movie") || "1"
  const showtime = searchParams.get("time") || "10:00"
  const seats = searchParams.get("seats")?.split(",") || []
  const total = Number.parseInt(searchParams.get("total") || "0")

  const movie = movies.find((m) => m.id === movieId) || movies[0]

  const [paymentMethod, setPaymentMethod] = useState<"momo" | "vnpay">("momo")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("[v0] Payment processed:", { paymentMethod, name, email, phone })

    // Generate booking ID and redirect to ticket page
    const bookingId = `BK${Date.now()}`
    router.push(`/ticket?id=${bookingId}&movie=${movieId}&time=${showtime}&seats=${seats.join(",")}&total=${total}`)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href={`/seats?movie=${movieId}&time=${showtime}`}>
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Thanh toán</h1>
        <p className="mt-2 text-muted-foreground">Hoàn tất đặt vé của bạn</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Payment Form */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Thông tin khách hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  placeholder="Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0912345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "momo" | "vnpay")}>
                <div className="space-y-3">
                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-colors ${
                      paymentMethod === "momo" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="momo" id="momo" />
                    <Label htmlFor="momo" className="flex flex-1 cursor-pointer items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10">
                        <Wallet className="h-6 w-6 text-pink-500" />
                      </div>
                      <div>
                        <p className="font-semibold">Ví MoMo</p>
                        <p className="text-sm text-muted-foreground">Thanh toán qua ví điện tử MoMo</p>
                      </div>
                    </Label>
                  </div>

                  <div
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-colors ${
                      paymentMethod === "vnpay" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="vnpay" id="vnpay" />
                    <Label htmlFor="vnpay" className="flex flex-1 cursor-pointer items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                        <CreditCard className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-semibold">VNPAY</p>
                        <p className="text-sm text-muted-foreground">Thanh toán qua cổng VNPAY</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Button
            className="w-full gap-2"
            size="lg"
            onClick={handlePayment}
            disabled={!name || !email || !phone || isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Đang xử lý...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5" />
                Xác nhận thanh toán
              </>
            )}
          </Button>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20 border-border">
            <CardHeader>
              <CardTitle>Chi tiết đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">{movie.genre}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{movie.duration} phút</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Suất chiếu</span>
                  <span className="font-medium">{showtime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Số lượng ghế</span>
                  <span className="font-medium">{seats.length} ghế</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ghế</span>
                  <div className="flex flex-wrap justify-end gap-1">
                    {seats.map((seat) => (
                      <Badge key={seat} variant="secondary" className="text-xs">
                        {seat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Tổng cộng</span>
                  <span className="text-2xl font-bold text-primary">{total.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                <p>Vé điện tử sẽ được gửi đến email của bạn sau khi thanh toán thành công.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
