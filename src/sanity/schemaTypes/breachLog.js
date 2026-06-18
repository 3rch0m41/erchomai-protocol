// src/sanity/schemas/breachLog.js
export default {
  name: 'breachLog',
  title: 'BREACH_REPORT // Challenge',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nome Challenge',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'platform',
      title: 'Piattaforma / Evento',
      type: 'string',
      options: {
        list: ['Hack The Box', 'TryHackMe', 'PortSwigger', 'Custom CTF'],
      },
    },
    {
      name: 'difficulty',
      title: 'Livello Difficoltà',
      type: 'string',
      options: { list: ['EASY', 'MEDIUM', 'HARD', 'INSANE'] },
    },
    {
      name: 'exploitVec',
      title: 'Vettore di Attacco Primario',
      type: 'string',
      description: 'Es: SSRF, SQLi, Buffer Overflow, PrivEsc',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['COMPLETED', 'IN_PROGRESS', 'FAILED'] },
      initialValue: 'COMPLETED',
    },
    {
      name: 'publishedAt',
      title: 'Timestamp',
      type: 'datetime',
    },
    {
      name: 'content',
      title: 'Analisi Tecnica e Flag Walkthrough',
      type: 'array',
      of: [{ type: 'block' }, { type: 'code' }],
    },
  ],
}