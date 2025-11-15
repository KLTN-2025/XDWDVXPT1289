"use client"

import Link from "next/link"
import { Film, Sun, Moon, Menu } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useState } from "react"

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/movies", label: "Phim" },
    { href: "/seats", label: "Chọn ghế" },
    { href: "/payment", label: "Thanh toán" },
    { href: "/admin", label: "Quản trị" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Film className="h-6 w-6 text-primary" />
          <span>CineMax</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Link href="/auth" className="hidden sm:block">
            <Button variant="outline" size="sm">
              Đăng nhập
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-border">
              <nav className="flex flex-col gap-4 pt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Đăng nhập
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
