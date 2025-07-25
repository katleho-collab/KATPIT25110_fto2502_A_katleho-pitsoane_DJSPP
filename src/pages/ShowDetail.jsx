"use client"

import { useEffect, useState, useContext, useCallback } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchShowDetails } from "../api/fetchPodcasts"
import { Loading, Error, GenreTags } from "../components"
import { AudioPlayerContext } from "../context/AudioPlayerContext.js"
import { FavoritesContext } from "../context/FavoritesContext.js"
import { formatDate } from "../utils/formatDate"
import styles from "./ShowDetail.module.css"

export default function ShowDetail() {
  const { showId } = useParams() // FIX: Changed from 'id' to 'showId'
  const [podcast, setPodcast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0)

  const { playEpisode } = useContext(AudioPlayerContext)
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext)

  useEffect(() => {
    const loadShowDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchShowDetails(showId, setLoading, setError) // FIX: Passed 'showId'
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
  }, [showId]) // FIX: Dependency changed to 'showId'

  const handleSeasonChange = (e) => {
    setSelectedSeasonIndex(Number(e.target.value))
  }

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
            Season {currentSeason.season}: {currentSeason.title}
            <span className={styles.episodeCount}> ({currentSeason.episodes.length} Episodes)</span>
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
