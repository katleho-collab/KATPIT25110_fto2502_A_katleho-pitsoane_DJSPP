import { createContext } from "react"

/**
 * React context for managing podcast-related state and filters.
 * Provides access to podcast data, pagination, filtering, and sorting.
 *
 * @typedef {Object} Podcast
 * @property {number} id - Unique identifier for the podcast.
 * @property {string} title - Title of the podcast.
 * @property {string} updated - ISO string of the last updated date.
 * @property {number[]} genres - Array of genre IDs.
 */

/**
 * Context object used throughout the app to consume podcast data and control logic.
 * @type {React.Context<Object>}
 */
export const PodcastContext = createContext()

/**
 * List of available sorting options used in the UI.
 * Each option includes a `key` used for internal logic and a `label` for display.
 *
 * @type {{key: string, label: string}[]}
 */
export const SORT_OPTIONS = [
  { key: "default", label: "Default" },
  { key: "date-desc", label: "Newest" },
  { key: "date-asc", label: "Oldest" },
  { key: "title-asc", label: "Title A → Z" },
  { key: "title-desc", label: "Title Z → A" },
]
