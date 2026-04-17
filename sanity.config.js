import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes' // Importa lo schema definito in src/sanity/schemaTypes/index.js
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'Il Mio Studio',
  projectId: 'qofqzwgs',
  dataset: 'production',

  basePath: '/studio', // Questo deve corrispondere al nome della cartella in app/

  plugins: [ structureTool(), visionTool(), codeInput()],

  schema: {
    types: schema.types, // Lascia vuoto per ora, deve caricarsi l'interfaccia grigia
  },
})