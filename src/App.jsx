import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";
import Favourites from "./pages/Favourites";
import { PodcastProvider } from "./context/PodcastProvider";
import { FavoritesProvider } from "./context/FavoritesProvider";
import { AudioPlayerProvider } from "./context/AudioPlayerProvider";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <PodcastProvider>
        <FavoritesProvider>
          <AudioPlayerProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/show/:showId" element={<ShowDetail />} />
              <Route path="/favourites" element={<Favourites />} />
            </Routes>
          </AudioPlayerProvider>
        </FavoritesProvider>
      </PodcastProvider>
    </ErrorBoundary>
  );
}
