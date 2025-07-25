"use client"

import { useState } from "react"
import styles from "./GenreFilter.module.css"

/**
 * GenreFilter component provides genre-based filtering functionality.
 * Allows users to select multiple genres to filter the podcast list.
 *
 * @param {Object} props
 * @param {Array} props.genres - Array of available genre objects
 * @param {Array} props.selectedGenres - Array of currently selected genre IDs
 * @param {Function} props.onGenreFilter - Callback function to handle genre filter changes
 * @returns {JSX.Element} The rendered filter controls component
 */
export default function GenreFilter({ genres, selectedGenres, onGenreFilter }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  /**
   * Toggles genre selection
   * @param {number} genreId - ID of the genre to toggle
   */
  const toggleGenre = (genreId) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId]

    onGenreFilter(updatedGenres)
  }

  /**
   * Clears all selected genres
   */
  const clearAllGenres = () => {
    onGenreFilter([])
  }

  /**
   * Toggles dropdown visibility
   */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  /**
   * Gets display text for selected genres
   * @returns {string} Display text for the filter button
   */
  const getSelectedGenresText = () => {
    if (selectedGenres.length === 0) return "All Genres"
    if (selectedGenres.length === 1) {
      const genre = genres.find((g) => g.id === selectedGenres[0])
      return genre ? genre.title : "1 Genre"
    }
    return `${selectedGenres.length} Genres`
  }

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterDropdown}>
        <button
          className={`${styles.filterToggle} ${isDropdownOpen ? styles.active : ""}`}
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-label="Filter by genres"
        >
          {getSelectedGenresText()}
          <span className={styles.dropdownArrow}>{isDropdownOpen ? "▲" : "▼"}</span>
        </button>

        {isDropdownOpen && (
          <div className={styles.filterDropdownContent}>
            <div className={styles.filterHeader}>
              <span>Filter by Genre</span>
              {selectedGenres.length > 0 && (
                <button className={styles.clearGenresBtn} onClick={clearAllGenres}>
                  Clear All
                </button>
              )}
            </div>

            <div className={styles.genreList}>
              {genres.map((genre) => (
                <label key={genre.id} className={styles.genreOption}>
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => toggleGenre(genre.id)}
                    aria-label={`Filter by ${genre.title}`}
                  />
                  <span className={styles.genreTitle}>{genre.title}</span>
                  <span className={styles.genreCount}>({genre.shows.length})</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
