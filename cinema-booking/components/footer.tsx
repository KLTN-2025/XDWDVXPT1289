import { Film, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Film className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">CineMax</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Hệ thống đặt vé xem phim hiện đại, mang đến trải nghiệm giải trí tuyệt vời.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Liên kết</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/movies" className="hover:text-foreground">
                  Phim đang chiếu
                </Link>
              </li>
              <li>
                <Link href="/movies" className="hover:text-foreground">
                  Phim sắp chiếu
                </Link>
              </li>
              <li>
                <Link href="/seats" className="hover:text-foreground">
                  Đặt vé
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Hỗ trợ</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Chính sách
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Điều khoản
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Liên hệ</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1900 1234</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@cinemax.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CineMax. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
