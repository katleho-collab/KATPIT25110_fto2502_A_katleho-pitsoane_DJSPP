"use client"
import { Link } from "react-router-dom" // Import Link
import { formatDate } from "../../utils/formatDate"
import { GenreTags } from "../UI" // Import GenreTags component
import styles from "./PodcastCard.module.css"

/**
 * Renders a single podcast preview card with image, title, number of seasons,
 * genres (as styled tags), and the last updated date.
 *
 * @param {Object} props
 * @param {Object} props.podcast - The podcast data object to display.
 * @param {string} props.podcast.id - Unique ID of the podcast.
 * @param {string} props.podcast.title - Title of the podcast.
 * @param {string} props.podcast.image - URL of the podcast image.
 * @param {number} props.podcast.seasons - Number of seasons available.
 * @param {string} props.podcast.updated - ISO date string for the last update.
 * @param {Array<Object>} props.podcast.genres - Array of genre IDs for the podcast.
 *
 * @returns {JSX.Element} The rendered podcast card component.
 */
export default function PodcastCard({ podcast }) {
  return (
    // Apply the card styles directly to the Link component
    <Link to={`/show/${podcast.id}`} className={styles.card}>
      <img src={podcast.image || "/placeholder.svg"} alt={podcast.title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{podcast.title}</h3>
        <p className={styles.seasons}>{podcast.seasons} seasons</p>
        <GenreTags genres={podcast.genres} /> {/* Use GenreTags component */}
        <p className={styles.updatedText}>Updated {formatDate(podcast.updated)}</p>
      </div>
    </Link>
  )
}
