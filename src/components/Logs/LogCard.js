import { ChevronRight, Shield, Database, Activity, Cpu } from 'lucide-react';
import Link from 'next/link';
import styles from '@/app/logs/LogsPage.module.css';

// Mapping delle icone basato sul campo 'type' di Sanity
const TYPE_ICONS = {
  SECURITY: Shield,
  DATA: Database,
  UPLINK: Activity,
  SYSTEM: Cpu,
};

export default function LogCard({ item }) {
  // Seleziona l'icona in base al tipo, o usa Activity come fallback
  const Icon = TYPE_ICONS[item.type] || Activity;
  
  // Sanity usa _id, lo accorciamo per l'estetica del design
  const shortId = item._id ? item._id.substring(0, 3).toUpperCase() : "000";

  return (
    <Link href={`/logs/${item.slug}`} className="block no-underline">
      <div className={styles.logCard}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapper}>
            <Icon size={18} className="text-white" />
          </div>
          <span className="text-[5pt] tracking-[0.2em] font-bold text-[#42cbd1] border border-[#42cbd1]/30 px-2 py-0.5 rounded">
            {item.status || "ACTIVE"}
          </span>
        </div>
        
        <h3 className={styles.cardTitle}>
          {item.title}_{shortId}
          <ChevronRight size={12} className="inline-block ml-1 opacity-50" />
        </h3>
        
        <p className="text-[5pt] tracking-widest opacity-40 uppercase">
          TYPE: {item.type} | SEC: {item.sector || "01"}
        </p>
        
        <div className={styles.cardFooter}>
          <span>REF: {item.ref || "CORE_SYS"}</span>
          <span>ID: {shortId}</span>
        </div>
      </div>
    </Link>
  );
}