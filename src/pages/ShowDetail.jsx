"use client"
import { useEffect, useState, useContext, useCallback } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchShowDetails } from "../api/fetchPodcasts"
import { Loading, Error, GenreTags } from "../components"
import { AudioPlayerContext } from "../context/AudioPlayerContext"
import { FavoritesContext } from "../context/FavoritesContext"
import { formatDate } from "../utils/formatDate"
import styles from "./ShowDetail.module.css"

/**
 * ShowDetail page component for displaying detailed information about a single podcast.
 *
 * - Extracts the podcast ID from the URL using React Router's useParams.
 * - Fetches podcast data from the API on mount using fetchShowDetails.
 * - Displays a loading state, error message, or the detailed podcast view.
 * - Integrates with AudioPlayerContext to allow playing episodes.
 * - Integrates with FavoritesContext to allow adding/removing episodes from favorites.
 *
 * Components used:
 * - Loading while fetching data
 * - Error if fetch fails
 * - GenreTags to display podcast genres
 *
 * @returns {JSX.Element} The detailed view of a selected podcast.
 */
export default function ShowDetail() {
  const { id } = useParams() // Using 'id' to match the route parameter ':id'
  const [podcast, setPodcast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0)
  const { playEpisode } = useContext(AudioPlayerContext)
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)

  useEffect(() => {
    /**
     * Fetches show details when the component mounts or the ID changes.
     * @async
     * @function loadShowDetails
     */
    const loadShowDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchShowDetails(id, setLoading, setError)
        if (data) {
          setPodcast(data)
          if (data.seasons && data.seasons.length > 0) {
            setSelectedSeasonIndex(0)
          }
        } else {
          setPodcast(null)
        }
      } catch (err) {
        setError(err.message)
        setPodcast(null)
      } finally {
        setLoading(false)
      }
    }
    loadShowDetails()
  }, [id])

  /**
   * Handles season selection change from dropdown.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The select change event.
   */
  const handleSeasonChange = (e) => {
    setSelectedSeasonIndex(Number(e.target.value))
  }

  /**
   * Handles playing an episode.
   * @param {Object} episode - The episode object.
   * @param {Object} season - The season object the episode belongs to.
   */
  const handlePlayEpisode = useCallback(
    (episode, season) => {
      playEpisode({
        title: episode.title,
        file: episode.file,
        showTitle: podcast.title,
        seasonTitle: season.title,
        seasonImage: season.image,
      })
    },
    [playEpisode, podcast],
  )

  /**
   * Handles adding/removing an episode from favorites.
   * @param {Object} episode - The episode object.
   * @param {Object} season - The season object.
   * @param {number} episodeIndex - The index of the episode within the season.
   */
  const handleToggleFavorite = useCallback(
    (episode, season, episodeIndex) => {
      const favoriteId = `${podcast.id}-${season.season}-${episodeIndex}`
      if (isFavorite(favoriteId)) {
        removeFavorite(favoriteId)
      } else {
        addFavorite({
          id: favoriteId,
          showId: podcast.id,
          showTitle: podcast.title,
          seasonIndex: season.season - 1,
          episodeIndex: episodeIndex,
          episodeTitle: episode.title,
          episodeDescription: episode.description,
          episodeFile: episode.file,
          seasonImage: season.image,
        })
      }
    },
    [addFavorite, isFavorite, podcast, removeFavorite],
  )

  if (loading) return <Loading message="Loading podcast..." />
  if (error) {
    return (
      <Error message={`Error occurred while fetching podcast: ${error}`}>
        <Link to="/" className={styles.backLink}>
          Back to Home
        </Link>
      </Error>
    )
  }
  if (!podcast) {
    return (
      <div className={styles.messageContainer}>
        <div className={styles.message}>
          <h3>Podcast not found.</h3>
          <p>The podcast you are looking for does not exist or has been removed.</p>
          <Link to="/" className={styles.backLink}>
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const currentSeason = podcast.seasons[selectedSeasonIndex]
  return (
    <div className={styles.detailPage}>
      <Link to="/" className={styles.backButton}>
        ← Back to Home
      </Link>
      <div className={styles.showHeader}>
        <img src={podcast.image || "/placeholder.svg"} alt={podcast.title} className={styles.showImage} />
        <div className={styles.showInfo}>
          <h1 className={styles.showTitle}>{podcast.title}</h1>
          <p className={styles.showDescription}>{podcast.description}</p>
          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>GENRES</span>
              <div className={styles.genreTagsContainer}>
                <GenreTags genres={podcast.genres} />
              </div>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>LAST UPDATED</span>
              <span className={styles.metaValue}>{formatDate(podcast.updated)}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>TOTAL SEASONS</span>
              <span className={styles.metaValue}>{podcast.seasons.length} Seasons</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>TOTAL EPISODES</span>
              <span className={styles.metaValue}>
                {podcast.seasons.reduce((acc, season) => acc + season.episodes.length, 0)} Episodes
              </span>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.seasonNavigation}>
        <h2 className={styles.currentSeasonHeading}>Current Season</h2>
        <select
          className={styles.seasonSelect}
          value={selectedSeasonIndex}
          onChange={handleSeasonChange}
          aria-label="Select Season"
        >
          {podcast.seasons.map((season, index) => (
            <option key={season.season} value={index}>
              Season {season.season}
            </option>
          ))}
        </select>
      </section>
      {currentSeason && (
        <section className={styles.episodeListSection}>
          <h3 className={styles.seasonTitle}>
            Season {currentSeason.season}: {currentSeason.title}{" "}
            <span className={styles.episodeCount}>({currentSeason.episodes.length} Episodes)</span>
          </h3>
          <div className={styles.episodesGrid}>
            {currentSeason.episodes.map((episode, index) => {
              const episodeId = `${podcast.id}-${currentSeason.season}-${index}`
              const isFav = isFavorite(episodeId)
              return (
                <div key={index} className={styles.episodeCard}>
                  <img
                    src={currentSeason.image || "/placeholder.svg"}
                    alt={`Season ${currentSeason.season} cover`}
                    className={styles.episodeImage}
                  />
                  <div className={styles.episodeInfo}>
                    <p className={styles.episodeNumber}>Episode {index + 1}</p>
                    <h4 className={styles.episodeTitle}>{episode.title}</h4>
                    <p className={styles.episodeDescription}>{episode.description.substring(0, 150)}...</p>
                    <div className={styles.episodeActions}>
                      <button
                        onClick={() => handlePlayEpisode(episode, currentSeason)}
                        className={styles.playEpisodeButton}
                        aria-label={`Play episode ${episode.title}`}
                      >
                        ▶ Play
                      </button>
                      <button
                        onClick={() => handleToggleFavorite(episode, currentSeason, index)}
                        className={`${styles.favoriteButton} ${isFav ? styles.favorited : ""}`}
                        aria-label={
                          isFav ? `Remove ${episode.title} from favorites` : `Add ${episode.title} to favorites`
                        }
                      >
                        {isFav ? "❤️ Favorited" : "🤍 Favorite"}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}