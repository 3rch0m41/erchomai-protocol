// Blocchi riutilizzati dai tre tipi di report (CTF, Code, Lab).
// Tenerli qui evita di ripetere lo stesso codice in ogni schema.

// Corpo del report: testo ricco, blocchi di codice e immagini
export const contentField = {
  name: 'content',
  title: 'Report',
  type: 'array',
  of: [
    { type: 'block' },
    { type: 'code', options: { withFilename: true } },
    {
      type: 'image',
      title: 'Immagine',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Testo alternativo',
          type: 'string',
          description: "Descrive l'immagine a chi usa un lettore di schermo o quando non si carica.",
        },
        { name: 'caption', title: 'Didascalia', type: 'string' },
      ],
    },
  ],
};

// Campi presenti in tutti i report. `extraMeta` inserisce i campi
// specifici della categoria subito dopo lo slug.
export function baseFields({ titleTitle, titleDesc, extraMeta = [], statusList, statusInitial }) {
  return [
    {
      name: 'title',
      title: titleTitle,
      type: 'string',
      description: titleDesc,
      validation: (Rule) => Rule.required(),
      group: 'meta',
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: 'meta',
    },
    {
      name: 'excerpt',
      title: 'Estratto',
      type: 'text',
      rows: 2,
      description: 'Riassunto mostrato nelle card e nelle anteprime dei link (max 160 caratteri).',
      validation: (Rule) => Rule.max(160),
      group: 'meta',
    },
    {
      name: 'tags',
      title: 'Tag',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Tecniche, strumenti, tecnologie. Alimentano la ricerca del sito. Es: SQLi, BloodHound, asyncio.',
      group: 'meta',
    },
    ...extraMeta.map((f) => ({ ...f, group: f.group || 'meta' })),
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: statusList, layout: 'radio' },
      initialValue: statusInitial,
      group: 'meta',
    },
    {
      name: 'publishedAt',
      title: 'Data di pubblicazione',
      type: 'datetime',
      description: 'Ordina i report. Lascia vuoto e premi "Set to current time" alla pubblicazione.',
      group: 'meta',
    },
    {
      name: 'downloads',
      title: 'File scaricabili',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'file', title: 'File', type: 'file' },
            {
              name: 'label',
              title: 'Nome mostrato',
              type: 'string',
              description: 'Opzionale. Se vuoto, viene usato il nome originale del file.',
            },
            {
              name: 'description',
              title: 'Descrizione',
              type: 'string',
              description: 'Es: "Regola YARA per la famiglia X" o "Script di enumerazione".',
            },
          ],
          preview: {
            select: { title: 'label', fname: 'file.asset.originalFilename', subtitle: 'description' },
            prepare: ({ title, fname, subtitle }) => ({ title: title || fname || '(file)', subtitle }),
          },
        },
      ],
      description:
        'Allegati offerti in download. Gli eseguibili (.exe, .dll, ecc.) vengono serviti solo dentro uno zip protetto da password ("infected").',
      group: 'report',
    },
    {
      name: 'keyTakeaways',
      title: 'Key takeaways',
      type: 'text',
      rows: 3,
      description: 'La lezione principale, mostrata evidenziata a inizio report. È spesso la prima cosa che si legge.',
      group: 'meta',
    },
    { ...contentField, group: 'report' },
  ];
}

// Le due schede (tab) in cui è diviso il form nello Studio
export const groups = [
  { name: 'meta', title: 'Metadata', default: true },
  { name: 'report', title: 'Report' },
];
