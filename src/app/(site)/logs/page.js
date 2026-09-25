import { client } from '@/sanity/lib/client';
import LogsClient from './LogsClient';

// Rigenera la pagina al massimo ogni 60 secondi, così i log pubblicati
// nello Studio compaiono sul sito senza dover rifare il deploy.
export const revalidate = 60;

const LOGS_QUERY = `*[ _type in ["forgeLog", "breachLog", "malwareLog"] ] | order(publishedAt desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  publishedAt,
  status
}`;

export default async function LogsPage() {
  const logs = await client.fetch(LOGS_QUERY);
  return <LogsClient initialLogs={logs} />;
}