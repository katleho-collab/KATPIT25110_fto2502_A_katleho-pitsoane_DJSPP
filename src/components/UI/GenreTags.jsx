import genresData from "../../data/genres.json"
import styles from "./GenreTags.module.css"

/**
 * GenreTags component displays a list of genre tags for a podcast.
 * It maps genre IDs to their titles using the global genres data.
 *
 * @param {Object} props
 * @param {number[]} props.genres - An array of genre IDs associated with the podcast.
 * @returns {JSX.Element} The rendered genre tags.
 */
export default function GenreTags({ genres }) {
  return (
    <div className={styles.tags}>
      {genres.map((genreId) => {
        const genreMatch = genresData.find((g) => g.id === genreId)
        return (
          <span key={genreId} className={styles.tag}>
            {genreMatch ? genreMatch.title : `Unknown (${genreId})`}
          </span>
        )
      })}
    </div>
  )
}
