"use client"

import { SearchBar, SortSelect, GenreFilter, PodcastGrid, Pagination, Loading, Error } from "../components"
import styles from "./Home.module.css"
import genres from "../data/genres.json"
import { usePodcasts } from "../context/PodcastContext"
import { useCallback } from "react" // Import useCallback
import { setPage } from "../context/PodcastContext" // Declare the setPage variable

const Home = () => {
  const {
    podcasts,
    loading,
    error,
    currentPage,
    totalPages,
    setSearch,
    setSortKey,
    setGenre,
    search,
    sortKey,
    genre,
    allPodcastsCount,
  } = usePodcasts()

  // Function to clear all filters
  const clearFilters = useCallback(() => {
    setSearch("")
    setSortKey("date-desc") // Reset to default sort
    setGenre([]) // Clear all selected genres
  }, [setSearch, setSortKey, setGenre])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} />
  }

  return (
    <main className={styles.home}>
      <section className={styles.controls}>
        <SearchBar searchTerm={search} onSearch={setSearch} />
        <GenreFilter genres={genres} selectedGenres={genre} onGenreFilter={setGenre} />
        <SortSelect sortBy={sortKey} onSort={setSortKey} />
        {/* Add a clear filters button if needed */}
        {(search || genre.length > 0 || sortKey !== "date-desc") && (
          <button onClick={clearFilters} className={styles.clearFiltersBtn}>
            Clear All Filters
          </button>
        )}
      </section>
      {allPodcastsCount > 0 && (
        <p className={styles.resultsInfo}>
          Showing {podcasts.length} of {allPodcastsCount} results
        </p>
      )}
      <PodcastGrid podcasts={podcasts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
        hasPrevPage={currentPage > 1}
        hasNextPage={currentPage < totalPages}
      />
    </main>
  )
}

export default Home
