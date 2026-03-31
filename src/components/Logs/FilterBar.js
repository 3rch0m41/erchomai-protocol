import styles from '@/app/logs/LogsPage.module.css';

const CATEGORIES = ["ALL", "SECURITY", "DATA", "UPLINK", "SYSTEM"];

export default function FilterBar({ activeFilter, setActiveFilter, counts }) {
  return (
    <div className={styles.filterBar}>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveFilter(cat)}
          className={`${styles.filterButton} ${activeFilter === cat ? styles.filterActive : ""}`}
        >
          {cat}
          <span className={styles.filterCount}>({counts[cat] || 0})</span>
        </button>
      ))}
    </div>
  );
}