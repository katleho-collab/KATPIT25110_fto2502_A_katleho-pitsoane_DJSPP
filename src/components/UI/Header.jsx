"use client"

import { Link } from "react-router-dom"
import styles from "./Header.module.css"
import ProfileIcon from "/assets/profile-icon.png" // Path is correct if assets is in public
import SearchIcon from "/assets/search-icon.png" // New import for Search Icon
import FavoriteIcon from "/assets/favorite-icon.png" // New import for Favorite Icon

/**
 * Header component for the Podcast Explorer app.
 * Displays the app title and navigation links.
 *
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.appTitleLink}>
          <h1 className={styles.appTitle}>PodcastApp</h1>
        </Link>
        <nav className={styles.mainNav}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/favourites" className={styles.navLink}>
            {" "}
            {/* New Favourites Link */}
            Favourites
          </Link>
        </nav>
        {/* Placeholder for future icons like search, favorites, user profile */}
        <div className={styles.headerIcons}>
          <button className={styles.iconButton} aria-label="Search">
            <img src={SearchIcon || "/placeholder.svg"} alt="Search" className={styles.icon} />
          </button>
          <button className={styles.iconButton} aria-label="Favorites">
            <img src={FavoriteIcon || "/placeholder.svg"} alt="Favorites" className={styles.icon} />
          </button>
          <button className={styles.iconButton} aria-label="User Profile">
            <img src={ProfileIcon || "/placeholder.svg"} alt="Profile" className={styles.profileIcon} />
          </button>
        </div>
      </div>
    </header>
  )
}
