import { client } from '@/sanity/lib/client';
import LogsClient from './LogsClient';
import { LOG_TYPES_GROQ } from '@/lib/logTypes';

// Rigenera la pagina al massimo ogni 60 secondi, così i log pubblicati
// nello Studio compaiono sul sito senza dover rifare il deploy.
export const revalidate = 60;

export const metadata = {
  title: 'Logs',
  description: 'Archivio completo dei log: write-up di CTF, analisi di malware e progetti di sicurezza.',
};

const LOGS_QUERY = `*[ _type in ${LOG_TYPES_GROQ} ] | order(publishedAt desc) {
  _id,
  _type,
  title,
  "slug": slug.current,
  publishedAt,
  status,
  excerpt,
  tags
}`;

export default async function LogsPage() {
  const logs = await client.fetch(LOGS_QUERY);
  return <LogsClient initialLogs={logs} />;
}