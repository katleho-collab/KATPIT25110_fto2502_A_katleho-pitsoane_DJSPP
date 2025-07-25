"use client"

import { useContext, useState, useMemo } from "react"
import { FavoritesContext } from "../context/FavoritesContext"
import { FavoriteEpisodeCard } from "../components/Favourites" // Corrected import
import styles from "./Favourites.module.css"

/**
 * Sort options for the Favourites page.
 * @type {{key: string, label: string}[]}
 */
const FAVORITES_SORT_OPTIONS = [
  { key: "added-desc", label: "Newest Added" },
  { key: "added-asc", label: "Oldest Added" },
  { key: "title-asc", label: "Episode Title A → Z" },
  { key: "title-desc", label: "Episode Title Z → A" },
]

/**
 * Favourites page component.
 * Displays a list of favorited episodes, with sorting and grouping by show.
 *
 * @returns {JSX.Element} The rendered Favourites page.
 */
export default function Favourites() {
  const { favorites } = useContext(FavoritesContext)
  const [sortBy, setSortBy] = useState("added-desc") // Default sort by newest added

  /**
   * Groups and sorts favorite episodes.
   * @type {Object.<string, FavoriteEpisode[]>}
   */
  const groupedAndSortedFavorites = useMemo(() => {
    const sorted = [...favorites].sort((a, b) => {
      switch (sortBy) {
        case "added-asc":
          return new Date(a.addedDate) - new Date(b.addedDate)
        case "added-desc":
          return new Date(b.addedDate) - new Date(a.addedDate)
        case "title-asc":
          return a.episodeTitle.localeCompare(b.episodeTitle)
        case "title-desc":
          return b.episodeTitle.localeCompare(a.episodeTitle)
        default:
          return 0
      }
    })

    // Group by show title
    return sorted.reduce((acc, episode) => {
      if (!acc[episode.showTitle]) {
        acc[episode.showTitle] = []
      }
      acc[episode.showTitle].push(episode)
      return acc
    }, {})
  }, [favorites, sortBy])

  const totalEpisodes = favorites.length

  return (
    <main className={styles.favouritesPage}>
      <h1 className={styles.pageTitle}>Favourite Episodes</h1>
      <p className={styles.pageSubtitle}>Your saved episodes from all shows</p>

      <div className={styles.controls}>
        <label htmlFor="sort-select" className={styles.sortLabel}>
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.sortSelect}
        >
          {FAVORITES_SORT_OPTIONS.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {totalEpisodes === 0 ? (
        <div className={styles.noFavorites}>
          <h3>No favorite episodes yet!</h3>
          <p>Start exploring podcasts and add your favorite episodes to this list.</p>
        </div>
      ) : (
        <div className={styles.episodeGroups}>
          {Object.entries(groupedAndSortedFavorites).map(([showTitle, episodes]) => (
            <div key={showTitle} className={styles.showGroup}>
              <h2 className={styles.showGroupTitle}>
                {showTitle} <span className={styles.episodeCount}>({episodes.length} episodes)</span>
              </h2>
              <div className={styles.episodeList}>
                {episodes.map((episode) => (
                  <FavoriteEpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
