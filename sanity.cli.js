/**
 * Configurazione per i comandi `sanity ...` eseguiti in questa cartella.
 * https://www.sanity.io/docs/cli
 **/
import { defineCliConfig } from 'sanity/cli';
import { dataset, projectId } from './src/sanity/env';

export default defineCliConfig({ api: { projectId, dataset } });
