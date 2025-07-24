"use client"

import { useContext } from "react"
import { AudioPlayerContext } from "../../context/AudioPlayerContext"
import { FavoritesContext } from "../../context/FavoritesContext"
import { formatDate } from "../../utils/formatDate"
import styles from "./FavoriteEpisodeCard.module.css" // New CSS module

/**
 * FavoriteEpisodeCard component displays a single favorited episode.
 * Includes episode details, a play button, and a remove from favorites button.
 *
 * @param {Object} props
 * @param {Object} props.episode - The favorite episode object.
 * @returns {JSX.Element} The rendered favorite episode card.
 */
export default function FavoriteEpisodeCard({ episode }) {
  const { playEpisode } = useContext(AudioPlayerContext)
  const { removeFavorite } = useContext(FavoritesContext)

  const handlePlay = () => {
    playEpisode({
      title: episode.episodeTitle,
      file: episode.episodeFile,
      showTitle: episode.showTitle,
      seasonTitle: `Season ${episode.seasonIndex + 1}`, // Reconstruct season title
      seasonImage: episode.seasonImage,
    })
  }

  const handleRemove = () => {
    removeFavorite(episode.id)
  }

  return (
    <div className={styles.card}>
      <img src={episode.seasonImage || "/placeholder.svg"} alt={episode.episodeTitle} className={styles.image} />
      <div className={styles.info}>
        <h4 className={styles.title}>{episode.episodeTitle}</h4>
        <p className={styles.meta}>
          {episode.showTitle} • Season {episode.seasonIndex + 1} • Episode {episode.episodeIndex + 1}
        </p>
        <p className={styles.description}>{episode.episodeDescription.substring(0, 150)}...</p>
        <p className={styles.addedDate}>Added on {formatDate(episode.addedDate)}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={handlePlay} className={styles.playButton} aria-label={`Play ${episode.episodeTitle}`}>
          ▶ Play
        </button>
        <button
          onClick={handleRemove}
          className={styles.favoriteButton}
          aria-label={`Remove ${episode.episodeTitle} from favorites`}
        >
          ❤️
        </button>
      </div>
    </div>
  )
}
