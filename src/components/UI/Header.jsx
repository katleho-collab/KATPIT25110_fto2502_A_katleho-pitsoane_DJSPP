"use client"

import { Link } from "react-router-dom"
import styles from "./Header.module.css" // Assuming you have a Header.module.css

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
          {/* <button className={styles.iconButton} aria-label="Search"><SearchIcon /></button> */}
          {/* <button className={styles.iconButton} aria-label="Favourites"><HeartIcon /></button> */}
          {/* <button className={styles.iconButton} aria-label="User Profile"><UserIcon /></button> */}
        </div>
      </div>
    </header>
  )
}
