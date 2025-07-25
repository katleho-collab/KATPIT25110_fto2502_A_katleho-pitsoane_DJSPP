"use client"

import styles from "./SortSelect.module.css"
import { SORT_OPTIONS } from "../../context/PodcastContext" // Import SORT_OPTIONS

/**
 * SortSelect component provides sorting options for the podcast list.
 * Allows sorting by newest first, title A-Z, and title Z-A.
 *
 * @param {Object} props
 * @param {string} props.sortBy - Current sort option
 * @param {Function} props.onSort - Callback function to handle sort changes
 * @returns {JSX.Element} The rendered sort controls component
 */
export default function SortSelect({ sortBy, onSort }) {
  /**
   * Handles sort option change
   * @param {Event} e - Select change event
   */
  const handleSortChange = (e) => {
    onSort(e.target.value)
  }

  return (
    <div className={styles.sortContainer}>
      <label htmlFor="sort-select" className={styles.sortLabel}>
        Sort by:
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={handleSortChange}
        className={styles.sortSelect}
        aria-label="Sort podcasts"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
