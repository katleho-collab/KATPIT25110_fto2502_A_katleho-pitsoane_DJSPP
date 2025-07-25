"use client"

import { useContext } from "react"
import { AudioPlayerContext } from "../../context/AudioPlayerContext.js"
import styles from "./AudioPlayer.module.css" // New CSS module

/**
 * Formats time in seconds to MM:SS format.
 * @param {number} seconds - Time in seconds.
 * @returns {string} Formatted time string.
 */
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

/**
 * Global AudioPlayer component.
 * Displays current episode, playback controls, and progress bar.
 * Fixed at the bottom of the screen.
 *
 * @returns {JSX.Element | null} The audio player component or null if no episode is loaded.
 */
export default function AudioPlayer() {
  const { isPlaying, currentEpisode, progress, currentTime, duration, togglePlayPause, seek } =
    useContext(AudioPlayerContext)

  if (!currentEpisode) {
    return null // Don't render player if no episode is loaded
  }

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration
    seek(newTime)
  }

  return (
    <div className={styles.audioPlayer} aria-live="polite" aria-atomic="true">
      <img
        src={currentEpisode.seasonImage || "/placeholder.svg"}
        alt={currentEpisode.seasonTitle}
        className={styles.episodeImage}
      />
      <div className={styles.playbackControls}>
        <div className={styles.episodeInfo}>
          <span className={styles.showTitle}>{currentEpisode.showTitle}</span>
          <span className={styles.episodeTitle}>{currentEpisode.title}</span>
        </div>
        <div className={styles.controls}>
          <button
            onClick={togglePlayPause}
            className={styles.playPauseButton}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <div className={styles.progressBarContainer}>
            <span className={styles.currentTime}>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className={styles.progressBar}
              aria-label="Playback progress"
            />
            <span className={styles.duration}>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
