"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Film } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - just redirect to home
    console.log("[v0] Auth submitted:", { email, password, name, isLogin })
    router.push("/")
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Film className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">{isLogin ? "Đăng nhập" : "Đăng ký"}</CardTitle>
          <CardDescription>
            {isLogin ? "Đăng nhập để đặt vé và quản lý tài khoản" : "Tạo tài khoản mới để bắt đầu"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}

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
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-end">
                <Link href="#" className="text-sm text-primary hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
            )}

            <Button type="submit" className="w-full">
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Hoặc</span>
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full bg-transparent">
              Đăng nhập với Google
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">{isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}</span>{" "}
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
                {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
