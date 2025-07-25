"use client"

import { useEffect, useState, useCallback } from "react"
import { fetchPodcasts } from "../api/fetchPodcasts"
import { PodcastContext } from "./PodcastContext" // Import the context object

/**
 * PodcastProvider component.
 *
 * Wraps child components and provides podcast-related data and control state via context.
 * Fetches podcast data on mount and enables dynamic filtering, sorting, and pagination.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components that consume the context.
 * @returns {JSX.Element} Provider wrapping the application content.
 */
export function PodcastProvider({ children }) {
  const [allPodcasts, setAllPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState("date-desc")
  const [genre, setGenre] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  /**
   * Fetch podcast data from the API when the provider mounts.
   */
  useEffect(() => {
    fetchPodcasts(setAllPodcasts, setError, setLoading)
  }, [])

  /**
   * Reset to the first page when filters change.
   */
  useEffect(() => {
    setPage(1)
  }, [search, sortKey, genre])

  /**
   * Dynamically calculate the number of items per page based on screen width.
   */
  useEffect(() => {
    const calculatePageSize = () => {
      const screenW = window.innerWidth
      if (screenW <= 1024) {
        setPageSize(10)
        return
      }
      const cardWidth = 260
      const maxRows = 2
      const columns = Math.floor(screenW / cardWidth)
      const calculatedPageSize = columns * maxRows
      setPageSize(calculatedPageSize > 0 ? calculatedPageSize : 10)
    }
    calculatePageSize()
    window.addEventListener("resize", calculatePageSize)
    return () => window.removeEventListener("resize", calculatePageSize)
  }, [])

  /**
   * Apply filtering and sorting to the full dataset based on search input,
   * selected genre, and sort option.
   *
   * @returns {Podcast[]} Filtered and sorted list of podcasts.
   */
  const applyFilters = useCallback(() => {
    let data = [...allPodcasts]
    if (search.trim()) {
      const q = search.toLowerCase()
      data = data.filter((p) => p.title.toLowerCase().includes(q))
    }
    if (genre.length > 0) {
      data = data.filter((p) => p.genres.some((gId) => genre.includes(gId)))
    }
    switch (sortKey) {
      case "title-asc":
        data.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "title-desc":
        data.sort((a, b) => b.title.localeCompare(a.title))
        break
      case "date-asc":
        data.sort((a, b) => new Date(a.updated) - new Date(b.updated))
        break
      case "date-desc":
        data.sort((a, b) => new Date(b.updated) - new Date(a.updated))
        break
      case "default":
      default:
        break
    }
    return data
  }, [allPodcasts, search, genre, sortKey])

  const filtered = applyFilters()
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  /**
   * Context value provided to consumers.
   */
  const value = {
    loading,
    error,
    search,
    setSearch,
    sortKey,
    setSortKey,
    genre,
    setGenre,
    page: currentPage,
    setPage,
    totalPages,
    podcasts: paged,
    allPodcastsCount: filtered.length,
    allPodcasts,
  }
  return <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
}
