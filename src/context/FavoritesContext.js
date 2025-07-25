import { createContext } from "react"

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
