import PodcastCard from "./PodcastCard"
import styles from "./PodcastGrid.module.css"

/**
 * PodcastGrid component displays a grid of PodcastCard components.
 *
 * @param {Object} props
 * @param {Array<Object>} props.podcasts - An array of podcast preview objects to display.
 * @returns {JSX.Element} The rendered grid of podcast cards.
 */
const PodcastGrid = ({ podcasts }) => {
  if (!podcasts || podcasts.length === 0) {
    return (
      <div className={styles.noResults}>
        <h3>No podcasts found.</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  )
}

export default PodcastGrid
