import { Routes, Route } from "react-router-dom"
import Header from "./components/UI/Header"
import Home from "./pages/Home"
import ShowDetail from "./pages/ShowDetail"
import { PodcastProvider } from "./context/PodcastContext"
import { AudioPlayerProvider } from "./context/AudioPlayerContext"
import AudioPlayer from "./components/UI/AudioPlayer"
import { genres } from "./data" // Import genres here

/**
 * Root component of the Podcast Explorer app.
 *
 * - Wraps the application in the `PodcastProvider` context for global state.
 * - Includes the `Header` component, displayed on all pages.
 * - Defines client-side routes using React Router:
 *    - "/" renders the `Home` page
 *    - "/show/:id" renders the `ShowDetail` page for a specific podcast
 * - Integrates a global audio player.
 *
 * @returns {JSX.Element} The application component with routing and context.
 */
export default function App() {
  return (
    <AudioPlayerProvider>
      <>
        <Header />
        <PodcastProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Pass genres to ShowDetail */}
            <Route path={`/show/:id`} element={<ShowDetail genres={genres} />} />
          </Routes>
        </PodcastProvider>
        <AudioPlayer />
      </>
    </AudioPlayerProvider>
  )
}
