"use client"

import { createContext, useState, useEffect, useCallback } from "react"

/**
 * @typedef {Object} FavoriteEpisode
 * @property {string} id - Unique ID of the episode (e.g., combination of showId-seasonIndex-episodeIndex).
 * @property {string} showId - ID of the podcast show.
 * @property {string} showTitle - Title of the podcast show.
 * @property {number} seasonIndex - Index of the season (0-based).
 * @property {number} episodeIndex - Index of the episode within the season (0-based).
 * @property {string} episodeTitle - Title of the episode.
 * @property {string} episodeDescription - Description of the episode.
 * @property {string} episodeFile - URL to the episode audio file.
 * @property {string} seasonImage - Image URL for the season.
 * @property {string} addedDate - ISO date string when the episode was favorited.
 */

/**
 * Context for managing global favorite episodes state.
 * @type {React.Context<Object>}
 */
export const FavoritesContext = createContext()

/**
 * FavoritesProvider component.
 * Provides global favorite episodes state and controls to its children.
 * Persists favorites to localStorage.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that consume the context.
 * @returns {JSX.Element} Provider wrapping the application content.
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Load favorites from localStorage on initial mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("podcast_favorites")
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage:", error)
      // Optionally clear corrupted storage or handle gracefully
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("podcast_favorites", JSON.stringify(favorites))
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error)
    }
  }, [favorites])

  /**
   * Adds an episode to favorites.
   * @param {FavoriteEpisode} episode - The episode object to add.
   */
  const addFavorite = useCallback((episode) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === episode.id)) {
        return [...prevFavorites, { ...episode, addedDate: new Date().toISOString() }]
      }
      return prevFavorites
    })
  }, [])

  /**
   * Removes an episode from favorites.
   * @param {string} episodeId - The unique ID of the episode to remove.
   */
  const removeFavorite = useCallback((episodeId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== episodeId))
  }, [])

  /**
   * Checks if an episode is favorited.
   * @param {string} episodeId - The unique ID of the episode to check.
   * @returns {boolean} True if the episode is favorited, false otherwise.
   */
  const isFavorite = useCallback(
    (episodeId) => {
      return favorites.some((fav) => fav.id === episodeId)
    },
    [favorites],
  )

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
