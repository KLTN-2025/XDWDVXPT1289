import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Booking, Seat } from '@/lib/mock-data'

export const useBookingStore = defineStore('booking', () => {
  const selectedMovie = ref<string | null>(null)
  const selectedShowtime = ref<string | null>(null)
  const selectedSeats = ref<Seat[]>([])
  const currentBooking = ref<Booking | null>(null)

  const addSeat = (seat: Seat) => {
    if (seat.status === 'available') {
      seat.status = 'selected'
      selectedSeats.value.push(seat)
    }
  }

  const removeSeat = (seatId: string) => {
    const index = selectedSeats.value.findIndex(seat => seat.id === seatId)
    if (index > -1) {
      selectedSeats.value[index].status = 'available'
      selectedSeats.value.splice(index, 1)
    }
  }

  const clearBooking = () => {
    selectedMovie.value = null
    selectedShowtime.value = null
    selectedSeats.value.forEach(seat => {
      seat.status = 'available'
    })
    selectedSeats.value = []
    currentBooking.value = null
  }

  const calculateTotal = () => {
    return selectedSeats.value.reduce((total, seat) => total + seat.price, 0)
  }

  return {
    selectedMovie,
    selectedShowtime,
    selectedSeats,
    currentBooking,
    addSeat,
    removeSeat,
    clearBooking,
    calculateTotal
  }
})
