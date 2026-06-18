// src/sanity/schemas/forgeLog.js
export default {
  name: 'forgeLog',
  title: 'FORGE_CRAFT // Tooling',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nome Tool / Script',
      type: 'string',
      description: 'Es: PY_PDF_TABLE_EXTRACTOR (Il prefisso FORGE_CRAFT // verrà gestito dal codice)',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'version',
      title: 'Build Version',
      type: 'string',
      initialValue: 'v1.0.0',
    },
    {
      name: 'language',
      title: 'Linguaggio Principale',
      type: 'string',
      options: {
        list: ['Python', 'TypeScript', 'Go', 'Rust', 'Bash', 'Next.js'],
      },
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['STABLE', 'BETA', 'DEGRADED'] },
      initialValue: 'STABLE',
    },
    {
      name: 'publishedAt',
      title: 'Timestamp',
      type: 'datetime',
    },
    {
      name: 'content',
      title: 'Corpo del Report (Code, Matrix, Text)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'code' }], // Richiede il plugin @sanity/code-input
    },
  ],
}