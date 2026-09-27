import { baseFields, groups } from './_shared';

// Scheletro precompilato di un nuovo report CTF: appare già nel corpo,
// pronto da riempire. Cancella le sezioni che non ti servono.
const CTF_SKELETON = [
  ['h2', 'TL;DR'],
  ['normal', 'Riassunto in due righe: cosa era, come lo hai risolto.'],
  ['h2', 'Reconnaissance'],
  ['normal', 'Scansione iniziale, servizi trovati.'],
  ['h2', 'Enumeration'],
  ['normal', ''],
  ['h2', 'Foothold / Exploitation'],
  ['normal', ''],
  ['h2', 'Privilege Escalation'],
  ['normal', ''],
  ['h2', 'Flags'],
  ['normal', 'user: [REDACTED] — root: [REDACTED]'],
  ['h2', 'Mitigations'],
  ['normal', 'Come si sarebbe difeso o rilevato un difensore (blue team).'],
  ['h2', 'Lessons learned'],
  ['normal', ''],
].map(([style, text], i) => ({
  _type: 'block',
  _key: `sk${i}`,
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: `sk${i}s`, text }],
}));

export default {
  name: 'breachLog',
  title: 'CTF & Challenges',
  type: 'document',
  groups,
  fields: baseFields({
    titleTitle: 'Nome della challenge',
    titleDesc: 'Es: Administrator. Il prefisso CTF_REPORT // lo aggiunge il sito.',
    statusList: ['COMPLETED', 'IN_PROGRESS', 'FAILED'],
    statusInitial: 'COMPLETED',
    extraMeta: [
      {
        name: 'platform',
        title: 'Piattaforma',
        type: 'string',
        options: {
          list: ['Hack The Box', 'TryHackMe', 'PortSwigger', 'picoCTF', 'OverTheWire', 'CTF event', 'Other'],
        },
      },
      {
        name: 'eventName',
        title: 'Nome e anno dell\u2019evento',
        type: 'string',
        description: 'Solo se la piattaforma è "CTF event". Es: DEF CON CTF 2026.',
        hidden: ({ parent }) => parent?.platform !== 'CTF event',
      },
      {
        name: 'category',
        title: 'Categoria',
        type: 'string',
        options: {
          list: ['Full machine', 'Web', 'Pwn', 'Reverse', 'Crypto', 'Forensics', 'OSINT', 'Misc'],
        },
      },
      {
        name: 'difficulty',
        title: 'Difficoltà',
        type: 'string',
        options: { list: ['EASY', 'MEDIUM', 'HARD', 'INSANE'], layout: 'radio' },
      },
      {
        name: 'targetOs',
        title: 'Sistema operativo target',
        type: 'string',
        options: { list: ['Linux', 'Windows', 'Other', 'N/A'] },
      },
      { name: 'timeSpent', title: 'Tempo impiegato', type: 'string', description: 'Es: ~5h' },
      {
        name: 'writeupAllowed',
        title: 'Writeup consentito (challenge ritirata o pubblica)',
        type: 'boolean',
        initialValue: false,
        description:
          'Molte piattaforme (es. Hack The Box) vietano i writeup delle challenge ATTIVE. Spunta solo quando la pubblicazione è permessa: senza questa spunta il report non è pubblicabile.',
      },
    ],
  }),
  initialValue: { content: CTF_SKELETON },
  // Blocca la pubblicazione di un writeup non consentito
  validation: (Rule) =>
    Rule.custom((doc) =>
      doc?.writeupAllowed
        ? true
        : 'Spunta "Writeup consentito" prima di pubblicare: verifica che la challenge sia ritirata o pubblica.'
    ),
  preview: {
    select: { title: 'title', platform: 'platform', difficulty: 'difficulty' },
    prepare: ({ title, platform, difficulty }) => ({
      title: title || '(senza nome)',
      subtitle: `CTF · ${[platform, difficulty].filter(Boolean).join(' · ') || '—'}`,
    }),
  },
};
