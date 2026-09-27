import styles from '@/app/(site)/logs/LogsPage.module.css';
import { FILTER_CATEGORIES as CATEGORIES } from '@/lib/logTypes';

// Le categorie arrivano da src/lib/logTypes.js
export default function FilterBar({ activeFilter, setActiveFilter, counts }) {
  return (
    <div className={styles.filterBar}>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveFilter(cat.id)} // ALL, CTF, CODE, LAB
          className={`${styles.filterButton} ${activeFilter === cat.id ? styles.filterActive : ""}`}
        >
          {/* Mostra il testo cyberpunk a schermo */}
          {cat.label}
          {/* Legge il contatore corretto dall'oggetto counts usando l'id */}
          <span className={styles.filterCount}>
            {` (${counts[cat.id] || 0})`}
          </span>
        </button>
      ))}
    </div>
  );
}