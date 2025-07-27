import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchShowDetails } from "../api/fetchPodcasts";
import { formatDate } from "../utils/formatDate";
import styles from "./ShowDetail.module.css";

const ShowDetail = () => {
  const { showId } = useParams(); // get showId from route
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    async function loadShow() {
      const data = await fetchShowDetails(showId, setLoading, setError);
      if (data) {
        setPodcast(data);
        setSelectedSeason(data.seasons[0]?.season ?? null);
      }
    }

    if (showId) loadShow();
  }, [showId]);

  const handleBack = () => navigate(-1);

  if (loading) return <div className={styles.message}>Loading...</div>;
  if (error) return <div className={styles.message}>Error: {error}</div>;
  if (!podcast) return <div className={styles.message}>Podcast not found</div>;

  const currentSeason = podcast.seasons.find(s => s.season === selectedSeason);

  return (
    <div className={styles.container}>
      <button onClick={handleBack} className={styles.backButton}>
        ← Back
      </button>
      <div className={styles.header}>
        <img src={podcast.image} alt={podcast.title} className={styles.image} />
        <div>
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
          <p className={styles.updatedText}>Last updated: {formatDate(podcast.updated)}</p>
        </div>
      </div>

      <div className={styles.seasonSelector}>
        <strong>Select Season:</strong>
        {podcast.seasons.map(season => (
          <button
            key={season.season}
            className={`${styles.seasonButton} ${
              season.season === selectedSeason ? styles.active : ""
            }`}
            onClick={() => setSelectedSeason(season.season)}
          >
            {season.title || `Season ${season.season}`}
          </button>
        ))}
      </div>

      <div className={styles.episodes}>
        <h3>Episodes</h3>
        {currentSeason?.episodes.length ? (
          currentSeason.episodes.map((ep, i) => (
            <div key={i} className={styles.episodeCard}>
              <h4>{ep.title}</h4>
              <p>{ep.description}</p>
              <audio controls src={ep.file} className={styles.audioPlayer} />
            </div>
          ))
        ) : (
          <p>No episodes available for this season.</p>
        )}
      </div>
    </div>
  );
};

export default ShowDetail;
