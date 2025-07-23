"use client"

import { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchSinglePodcast } from "../api/fetchPodcasts" // Corrected import path
import { Loading, Error } from "../components"
import { AudioPlayerContext } from "../context/AudioPlayerContext"
import { formatDate } from "../utils/formatDate"
import genres from "../data/genres.json" // Assuming this path is correct for your genres data
import styles from "./ShowDetail.module.css"

/**
 * ShowDetail page component for displaying detailed information about a single podcast.
 *
 * - Extracts the podcast ID from the URL using React Router's `useParams`.
 * - Fetches podcast data from the API on mount using `fetchSinglePodcast`.
 * - Displays a loading state, error message, or the detailed podcast view.
 * - Integrates with `AudioPlayerContext` to allow playing episodes.
 *
 * Components used:
 * - `Loading` while fetching data
 * - `Error` if fetch fails
 * - `PodcastDetail` when data is successfully retrieved
 *
 * @returns {JSX.Element} The detailed view of a selected podcast.
 */
export default function ShowDetail() {
  const { id } = useParams()
  const [podcast, setPodcast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0)

  const { playEpisode } = useContext(AudioPlayerContext)

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
        const data = await fetchSinglePodcast(id, setPodcast, setError, setLoading)
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
  const handlePlayEpisode = (episode, season) => {
    playEpisode({
      title: episode.title,
      file: episode.file,
      showTitle: podcast.title,
      seasonTitle: season.title,
      seasonImage: season.image,
    })
  }

  if (loading) {
    return <Loading message="Loading podcast..." />
  }

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
                {podcast.genres.map((genreId) => {
                  const genreMatch = genres.find((g) => g.id === genreId)
                  return (
                    <span key={genreId} className={styles.genreTag}>
                      {genreMatch ? genreMatch.title : `Unknown (${genreId})`}
                    </span>
                  )
                })}
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
            Season {currentSeason.season}: {currentSeason.title}
            <span className={styles.episodeCount}> ({currentSeason.episodes.length} Episodes)</span>
          </h3>
          <div className={styles.episodesGrid}>
            {currentSeason.episodes.map((episode, index) => (
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
                  <button
                    onClick={() => handlePlayEpisode(episode, currentSeason)}
                    className={styles.playEpisodeButton}
                    aria-label={`Play episode ${episode.title}`}
                  >
                    ▶ Play
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
