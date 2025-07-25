"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { AudioPlayerContext } from "./AudioPlayerContext" // Import the context object

/**
 * AudioPlayerProvider component.
 * Provides global audio playback state and controls to its children.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that consume the context.
 * @returns {JSX.Element} Provider wrapping the application content.
 */
export function AudioPlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentEpisode, setCurrentEpisode] = useState(null) // EpisodeForPlayer
  const [progress, setProgress] = useState(0) // 0 to 100
  const [currentTime, setCurrentTime] = useState(0) // seconds
  const [duration, setDuration] = useState(0) // seconds

  /**
   * Plays a given episode.
   * @param {EpisodeForPlayer} episode - The episode to play.
   */
  const playEpisode = useCallback((episode) => {
    setCurrentEpisode(episode)
    setIsPlaying(true)
  }, [])

  /**
   * Toggles play/pause state of the current episode.
   */
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  /**
   * Seeks to a specific position in the audio.
   * @param {number} time - The time in seconds to seek to.
   */
  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }, [])

  /**
   * Handles audio element's play/pause state.
   */
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.error("Error playing audio:", e))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  /**
   * Handles setting the audio source when a new episode is selected.
   */
  useEffect(() => {
    if (audioRef.current && currentEpisode) {
      audioRef.current.src = currentEpisode.file
      audioRef.current.load() // Load the new source
      audioRef.current.play().catch((e) => console.error("Error playing new episode:", e))
      setIsPlaying(true)
    }
  }, [currentEpisode])

  /**
   * Event listeners for audio element.
   */
  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / audio.duration) * 100 || 0)
    }

    const updateProgress = () => {
      setCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / audio.duration) * 100 || 0)
    }

    const onEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime(0)
    }

    audio.addEventListener("loadedmetadata", setAudioData)
    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("ended", onEnded)

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData)
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("ended", onEnded)
    }
  }, [])

  /**
   * Confirmation prompt on page reload/close during playback.
   */
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isPlaying) {
        event.preventDefault()
        event.returnValue = "" // Required for Chrome
        return "Audio is currently playing. Are you sure you want to leave?"
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isPlaying])

  const value = {
    isPlaying,
    currentEpisode,
    progress,
    currentTime,
    duration,
    playEpisode,
    togglePlayPause,
    seek,
  }

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} /> {/* Hidden audio element */}
    </AudioPlayerContext.Provider>
  )
}
