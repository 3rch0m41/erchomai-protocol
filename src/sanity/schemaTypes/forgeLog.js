import { baseFields, groups } from './_shared';

const CODE_SKELETON = [
  ['h2', 'Il problema'],
  ['normal', 'Cosa mancava, perché hai costruito questo.'],
  ['h2', 'Architettura'],
  ['normal', 'Come è strutturato (aggiungi un\u2019immagine dello schema, se serve).'],
  ['h2', 'Dettagli implementativi'],
  ['normal', ''],
  ['h2', 'Utilizzo'],
  ['normal', 'Installazione ed esempi.'],
  ['h2', 'Security considerations'],
  ['normal', 'Validazione input, gestione dei segreti, usi non consentiti.'],
  ['h2', 'Risultati e limiti noti'],
  ['normal', ''],
].map(([style, text], i) => ({
  _type: 'block', _key: `sk${i}`, style, markDefs: [],
  children: [{ _type: 'span', _key: `sk${i}s`, text }],
}));

export default {
  name: 'forgeLog',
  title: 'Code development',
  type: 'document',
  groups,
  fields: baseFields({
    titleTitle: 'Nome del progetto',
    titleDesc: 'Es: subhunter. Il prefisso CODE_FORGE // lo aggiunge il sito.',
    statusList: ['ACTIVE', 'STABLE', 'BETA', 'ARCHIVED'],
    statusInitial: 'STABLE',
    extraMeta: [
      {
        name: 'projectType',
        title: 'Tipo di progetto',
        type: 'string',
        options: { list: ['CLI Tool', 'Script', 'Library', 'Web app', 'Automation', 'PoC'] },
      },
      {
        name: 'languages',
        title: 'Linguaggi',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
          layout: 'grid',
          list: ['Python', 'TypeScript', 'JavaScript', 'Go', 'Rust', 'C', 'C++', 'Bash', 'PowerShell'],
        },
      },
      { name: 'version', title: 'Versione', type: 'string', initialValue: 'v1.0.0' },
      { name: 'license', title: 'Licenza', type: 'string', description: 'Es: MIT, GPL-3.0, Apache-2.0' },
      {
        name: 'role',
        title: 'Ruolo',
        type: 'string',
        options: { list: ['Solo', 'Team'], layout: 'radio' },
      },
      {
        name: 'repoUrl',
        title: 'URL del repository',
        type: 'url',
        description: 'Mostrato come pulsante SOURCE_CODE. Deve iniziare con https://',
        validation: (Rule) => Rule.uri({ scheme: ['https', 'http'] }),
      },
      {
        name: 'demoUrl',
        title: 'URL della demo',
        type: 'url',
        description: 'Mostrato come pulsante LIVE_DEMO. Deve iniziare con https://',
        validation: (Rule) => Rule.uri({ scheme: ['https', 'http'] }),
      },
    ],
  }),
  initialValue: { content: CODE_SKELETON },
  preview: {
    select: { title: 'title', projectType: 'projectType', version: 'version' },
    prepare: ({ title, projectType, version }) => ({
      title: title || '(senza nome)',
      subtitle: `CODE · ${[projectType, version].filter(Boolean).join(' · ') || '—'}`,
    }),
  },
};
