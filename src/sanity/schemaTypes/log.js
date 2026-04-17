import {defineField, defineType} from 'sanity'

export default {
  name: 'log',
  title: 'System Logs',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Protocol Name / Title',
      type: 'string',
      description: 'Il nome dell\'operazione o della vulnerabilità.',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Access Key (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'classification',
      title: 'Security Classification',
      type: 'string',
      options: {
        list: [
          { title: 'Level 1: Unclassified', value: 'unclassified' },
          { title: 'Level 2: Confidential', value: 'confidential' },
          { title: 'Level 3: Secret', value: 'secret' },
          { title: 'Level 4: Top Secret', value: 'top-secret' },
        ],
        layout: 'radio', // Rende la scelta più rapida nello studio
      },
    },
    {
      name: 'excerpt',
      title: 'Brief Summary',
      type: 'text',
      rows: 2,
      description: 'Questa è la descrizione che apparirà nella Blog Card azzurra.',
      validation: Rule => Rule.max(120),
    },
    {
      name: 'content',
      title: 'Data Content',
      type: 'array',
      of: [
        { type: 'block' }, // Testo normale, titoli, liste
        {
          type: 'code',
          title: 'Code Snippet',
          options: {
            withFilename: true, // Per dare un nome al file decriptato
          }
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Deployment Timestamp',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
  ],
}