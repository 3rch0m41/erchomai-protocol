import { ChevronRight } from 'lucide-react';
import styles from '@/app/logs/LogsPage.module.css';

export default function LogCard({ item }) {
  const Icon = item.icon;
  
  return (
    <div className={styles.logCard}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          <Icon size={18} className="text-white" />
        </div>
        <span className="text-[5pt] tracking-[0.2em] font-bold text-[#42cbd1] border border-[#42cbd1]/30 px-2 py-0.5 rounded">
          {item.status}
        </span>
      </div>
      
      <h3 className={styles.cardTitle}>
        {item.label}_{item.id}
        <ChevronRight size={12} className="inline-block ml-1 opacity-50" />
      </h3>
      
      <p className="text-[5pt] tracking-widest opacity-40 uppercase">
        TYPE: {item.type} | SEC: {item.sector}
      </p>
      
      <div className={styles.cardFooter}>
        <span>REF: {item.ref}</span>
        <span>ID: {item.id.padStart(3, '0')}</span>
      </div>
    </div>
  );
}