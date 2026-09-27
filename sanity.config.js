import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { schema } from './src/sanity/schemaTypes';
import { apiVersion, dataset, projectId } from './src/sanity/env';

export default defineConfig({
  name: 'default',
  title: 'ERCHOMAI Studio',
  projectId,
  dataset,

  basePath: '/studio', // Deve corrispondere alla cartella src/app/studio

  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion }), codeInput()],

  schema: {
    types: schema.types,
  },
});
