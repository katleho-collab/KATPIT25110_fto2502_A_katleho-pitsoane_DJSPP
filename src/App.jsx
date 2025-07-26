"use client"
import { Routes, Route } from "react-router-dom"
import Header from "./components/UI/Header"
import Home from "./pages/Home"
import ShowDetail from "./pages/ShowDetail"
import Favourites from "./pages/Favourites"
import { PodcastProvider } from "./context/PodcastProvider"
import { AudioPlayerProvider } from "./context/AudioPlayerProvider"
import { FavoritesProvider } from "./context/FavoritesProvider"
import AudioPlayer from "./components/UI/AudioPlayer"
import { ErrorBoundary } from "./components/ErrorBoundary"

/**
 * Root component of the Podcast Explorer app.
 *
 * - Wraps the application in the PodcastProvider context for global state.
 * - Includes the Header component, displayed on all pages.
 * - Defines client-side routes using React Router:
 *   - "/" renders the Home page
 *   - "/show/:id" renders the ShowDetail page for a specific podcast
 * - Integrates a global audio player.
 *
 * @returns {JSX.Element} The application component with routing and context.
 */
export default function App() {
  return (
    <AudioPlayerProvider>
      <FavoritesProvider>
        <>
          <Header />
          <PodcastProvider>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/show/:id" element={<ShowDetail />} />
                <Route path="/favourites" element={<Favourites />} />
              </Routes>
            </ErrorBoundary>
          </PodcastProvider>
          <AudioPlayer />
        </>
      </FavoritesProvider>
    </AudioPlayerProvider>
  )
}
