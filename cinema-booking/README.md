# Cinema Booking System - Vue.js Version

This is a Vue.js conversion of the original Next.js cinema booking system. The application allows users to browse movies, select seats, make payments, and manage bookings.

## Features

- 🎬 Movie browsing and filtering
- 🎫 Seat selection with real-time availability
- 💳 Payment processing (simulated)
- 🎟️ Digital ticket generation with QR codes
- 👤 User authentication
- 📊 Admin dashboard for movie management
- 🌙 Dark/Light theme support
- 📱 Responsive design

## Tech Stack

- **Frontend**: Vue 3 with Composition API
- **Build Tool**: Vite
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **Icons**: Lucide Vue Next
- **QR Codes**: qrcode library

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── ui/             # UI component library
│   ├── Header.vue      # Navigation header
│   ├── Footer.vue      # Site footer
│   └── ChatbotWidget.vue
├── views/              # Page components
│   ├── Home.vue        # Landing page
│   ├── Movies.vue      # Movie listing
│   ├── Seats.vue       # Seat selection
│   ├── Payment.vue     # Payment form
│   ├── Ticket.vue      # Ticket display
│   ├── Admin.vue       # Admin dashboard
│   └── Auth.vue        # Authentication
├── stores/             # Pinia stores
│   ├── theme.ts        # Theme management
│   └── booking.ts      # Booking state
├── lib/                # Utilities and data
│   ├── mock-data.ts    # Sample data
│   └── utils.ts        # Helper functions
├── router/             # Vue Router configuration
└── style.css           # Global styles
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Key Conversions from Next.js

### Components
- React functional components → Vue 3 Composition API
- `useState` → `ref()` and `reactive()`
- `useEffect` → `onMounted()` and `watch()`
- Props → Vue props with TypeScript interfaces

### Routing
- Next.js App Router → Vue Router
- `useRouter()` → `useRouter()` from Vue Router
- `useSearchParams()` → `useRoute()` with query params

### State Management
- React Context → Pinia stores
- `useContext()` → `useStore()` from Pinia

### Styling
- Maintained Tailwind CSS classes
- Converted CSS-in-JS to Vue's class binding
- Preserved responsive design and theming

### Data Flow
- Mock data structure preserved
- API simulation maintained
- Component communication through props and events

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Modern browsers with ES6+ support
- Vue 3 requires IE11+ (with polyfills)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for demonstration purposes. Please ensure you have the appropriate licenses for any commercial use.
