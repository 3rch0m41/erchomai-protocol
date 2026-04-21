import { client } from '@/sanity/lib/client';
import LogsClient from './LogsClient';

// La query recupera tutti i campi necessari per le card e per il filtraggio
const LOGS_QUERY = `*[_type == "log"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  type,
  sector,
  ref,
  status
}`;

export default async function LogsPage() {
  // Recupero dati da Sanity
  const logs = await client.fetch(LOGS_QUERY);
  
  // Passiamo i dati al Client Component
  return <LogsClient initialLogs={logs} />;
}