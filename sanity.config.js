import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Il Mio Studio',
  projectId: 'qofqzwgs',
  dataset: 'production',

  basePath: '/studio', // Questo deve corrispondere al nome della cartella in app/

  plugins: [structureTool()],
  
  schema: {
    types: [], // Lascia vuoto per ora, deve caricarsi l'interfaccia grigia
  },
})