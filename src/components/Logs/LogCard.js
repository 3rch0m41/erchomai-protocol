import { ChevronRight, Shield, Database, Activity, Cpu } from 'lucide-react';
import Link from 'next/link';
import styles from '@/app/logs/LogsPage.module.css';

const TYPE_ICONS = {
  FORGE: Cpu,
  BREACH: Shield,
  SANDBOX: Database,
};

const PREFIX_TEXT = {
  FORGE: "FORGE_CRAFT // ",
  BREACH: "BREACH_REPORT // ",
  SANDBOX: "MALWARE_SNDBX // ",
};

export default function LogCard({ item }) {
  const Icon = TYPE_ICONS[item.type] || Activity;
  const prefix = PREFIX_TEXT[item.type] || "SYSTEM // ";
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
          {`${prefix}${item.title}_${shortId}`}
          <ChevronRight size={12} className="inline-block ml-1 opacity-50" />
        </h3>
        
        <p className="text-[5pt] tracking-widest opacity-40 uppercase">
          {`TYPE: ${item.type} | SEC: ${item.sector || "CORE_01"}`}
        </p>
        
        <div className={styles.cardFooter}>
          {/* Usiamo stringhe pulite per evitare conflitti con i caratteri speciali */}
          <span>{`REF: ${item.ref || "CORE_SYS"}`}</span>
          <span>{`ID: ${shortId}`}</span>
        </div>
      </div>
    </Link>
  );
}