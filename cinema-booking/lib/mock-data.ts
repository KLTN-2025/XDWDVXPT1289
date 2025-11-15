export interface Movie {
  id: string
  title: string
  genre: string
  duration: number
  rating: number
  poster: string
  description: string
  showtimes: string[]
}

export interface Seat {
  id: string
  row: string
  number: number
  type: "standard" | "vip"
  status: "available" | "booked" | "selected"
  price: number
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Avengers: Endgame",
    genre: "Hành động, Khoa học viễn tưởng",
    duration: 181,
    rating: 8.4,
    poster: "/avengers-endgame-poster.jpg",
    description: "Sau sự kiện tàn khốc của Infinity War, các siêu anh hùng tập hợp lại một lần nữa.",
    showtimes: ["10:00", "13:30", "17:00", "20:30"],
  },
  {
    id: "2",
    title: "The Batman",
    genre: "Hành động, Tội phạm",
    duration: 176,
    rating: 7.8,
    poster: "/the-batman-poster.jpg",
    description: "Batman khám phá tham nhũng ở Gotham City và mối liên hệ với gia đình mình.",
    showtimes: ["11:00", "14:30", "18:00", "21:30"],
  },
  {
    id: "3",
    title: "Spider-Man: No Way Home",
    genre: "Hành động, Phiêu lưu",
    duration: 148,
    rating: 8.2,
    poster: "/spiderman-no-way-home-poster.jpg",
    description: "Peter Parker tìm kiếm sự giúp đỡ từ Doctor Strange khi danh tính bị lộ.",
    showtimes: ["09:30", "12:00", "15:30", "19:00"],
  },
  {
    id: "4",
    title: "Dune",
    genre: "Khoa học viễn tưởng, Phiêu lưu",
    duration: 155,
    rating: 8.0,
    poster: "/dune-inspired-poster.png",
    description: "Câu chuyện về Paul Atreides trên hành tinh sa mạc Arrakis.",
    showtimes: ["10:30", "14:00", "17:30", "21:00"],
  },
  {
    id: "5",
    title: "Top Gun: Maverick",
    genre: "Hành động, Chính kịch",
    duration: 130,
    rating: 8.3,
    poster: "/top-gun-maverick-inspired-poster.png",
    description: "Maverick đối mặt với quá khứ khi huấn luyện thế hệ phi công mới.",
    showtimes: ["11:30", "15:00", "18:30", "22:00"],
  },
  {
    id: "6",
    title: "Avatar: The Way of Water",
    genre: "Khoa học viễn tưởng, Phiêu lưu",
    duration: 192,
    rating: 7.9,
    poster: "/avatar-way-of-water-poster.jpg",
    description: "Jake Sully và gia đình khám phá các vùng biển của Pandora.",
    showtimes: ["09:00", "13:00", "17:00", "21:00"],
  },
]

export const generateSeats = (): Seat[] => {
  const seats: Seat[] = []
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]
  const seatsPerRow = 12

  rows.forEach((row, rowIndex) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      const isVIP = rowIndex >= 5
      const isBooked = Math.random() > 0.7

      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        type: isVIP ? "vip" : "standard",
        status: isBooked ? "booked" : "available",
        price: isVIP ? 150000 : 100000,
      })
    }
  })

  return seats
}

export interface Booking {
  id: string
  movieId: string
  movieTitle: string
  showtime: string
  seats: string[]
  totalPrice: number
  date: string
  qrCode: string
}

export interface AdminStats {
  totalRevenue: number
  ticketsSold: number
  activeShowtimes: number
  totalMovies: number
}

export const adminStats: AdminStats = {
  totalRevenue: 125000000,
  ticketsSold: 1250,
  activeShowtimes: 48,
  totalMovies: 12,
}
