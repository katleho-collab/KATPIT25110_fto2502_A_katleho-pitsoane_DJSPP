import { createContext } from "react"

/**
 * @typedef {Object} EpisodeForPlayer
 * @property {string} title - The title of the episode.
 * @property {string} file - The URL to the audio file.
 * @property {string} showTitle - The title of the podcast show.
 * @property {string} seasonTitle - The title of the season.
 * @property {string} seasonImage - The image URL for the season.
 */

/**
 * Context for managing global audio playback state.
 * @type {React.Context<Object>}
 */
export const AudioPlayerContext = createContext()
