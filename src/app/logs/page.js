import { client } from '@/sanity/lib/client';
import LogsClient from './LogsClient';

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