import { Search } from 'lucide-react';
import styles from '@/app/logs/LogsPage.module.css';

export default function SearchArea({ query, setQuery }) {
  return (
    <div className={styles.searchArea}>
      <div className={styles.searchBar}>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH_DATA..." 
          className={styles.searchInput}
        />
        <div className={styles.searchIcon}><Search size={18} /></div>
      </div>
    </div>
  );
}