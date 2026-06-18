import styles from '@/app/logs/LogsPage.module.css';

// 1. Definiamo le nuove categorie reali allineate con Sanity e LogsClient
const CATEGORIES = [
  { id: "ALL", label: "ALL_SYSTEMS" },
  { id: "FORGE", label: "FORGE_CRAFT" },
  { id: "BREACH", label: "BREACH_REPORT" },
  { id: "SANDBOX", label: "MALWARE_SNDBX" }
];

export default function FilterBar({ activeFilter, setActiveFilter, counts }) {
  return (
    <div className={styles.filterBar}>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveFilter(cat.id)} // Invia lo stato corretto (ALL, FORGE, BREACH, SANDBOX)
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