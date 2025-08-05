# 🎙️ BombsCast Podcast App

A modern, feature-rich podcast application built with Next.js 15, TypeScript, and Tailwind CSS. BombsCast provides an immersive listening experience with a sleek dark theme, favorites management, and seamless audio playback.

**🚀 Live Site**: [https://bombscast.vercel.app/](https://bombscast.vercel.app/)

## ✨ Features

- **🎧 Audio Player**: Global audio player with play/pause, skip, and volume controls
- **❤️ Favorites**: Save and manage your favorite podcast episodes
- **🎨 Dark/Light Theme**: Seamless theme switching with system preference detection
- **📱 Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **🔍 Show Details**: Detailed view for each podcast with episode listings
- **🎯 Recommended Shows**: Curated carousel of recommended content
- **⚡ Fast Performance**: Built with Next.js 15 for optimal performance
- **🎭 Modern UI**: Beautiful interface using Radix UI components

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 15** - React framework for production
- **React 19** - Latest React features and improvements
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations and transitions

### State Management
- **React Context API** - Global state management for player and favorites
- **Zustand** - Lightweight state management (optional)

### Audio & Media
- **HTML5 Audio API** - Native audio playback
- **React Audio Player** - Custom audio player implementation

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Vercel** - Deployment platform

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bombscast-djspp.git
   cd bombscast-djspp
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Using yarn
   yarn install

   # Using pnpm
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
   ```

4. **Run the development server**
   ```bash
   # Using npm
   npm run dev

   # Using yarn
   yarn dev

   # Using pnpm
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
bombcast-djspp/
├── app/
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page
│   ├── favourites/
│   │   └── page.tsx             # Favorites page
│   └── show/[id]/
│       └── page.tsx             # Individual show details
├── components/
│   ├── global-audio-player.tsx  # Audio player component
│   ├── recommended-shows-carousel.tsx
│   ├── theme-provider.tsx       # Theme context provider
│   ├── theme-toggle.tsx         # Theme switcher
│   └── ui/                      # Reusable UI components
├── context/
│   ├── favourites-context.tsx   # Favorites state management
│   └── player-context.tsx       # Audio player state
├── hooks/
│   ├── use-mobile.tsx           # Mobile detection hook
│   └── use-toast.ts             # Toast notifications hook
├── lib/
│   ├── api.ts                   # API utilities
│   └── utils.ts                 # Helper functions
├── public/                      # Static assets
├── styles/
│   └── globals.css             # Global CSS variables
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Usage Examples

### Basic Navigation
- **Home Page**: Browse all available podcasts
- **Show Details**: Click on any podcast to view episodes
- **Favorites**: Access your saved episodes from the favorites page

### Audio Player Controls
- **Play/Pause**: Click the play button on any episode
- **Volume**: Adjust volume using the slider
- **Skip**: Navigate between episodes using next/previous buttons
- **Progress**: Seek through episodes using the progress bar

### Managing Favorites
- **Add to Favorites**: Click the heart icon on any episode
- **Remove from Favorites**: Click the filled heart icon to remove
- **View Favorites**: Navigate to the favorites page to see all saved episodes

### Theme Switching
- **Toggle Theme**: Click the theme toggle button in the header
- **System Preference**: Automatically detects and applies system theme preference

## 🎨 Customization

### Adding New Podcasts
Update the API endpoint in `lib/api.ts` to fetch from your podcast source:

```typescript
// lib/api.ts
export const fetchShows = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shows`);
  return response.json();
};
```

### Styling Customization
Modify the design tokens in `tailwind.config.ts`:

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          // ... your custom colors
        }
      }
    }
  }
}
```

### Component Customization
All UI components are built with Radix UI primitives and can be customized in the `components/ui/` directory.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Radix UI](https://radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help, please:

1. katleho.pitsoane@gmail.com
2. https://github.com/katleho-collab
