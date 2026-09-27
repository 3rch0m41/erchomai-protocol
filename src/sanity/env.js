// Configurazione Sanity in un unico punto, usata da sito, Studio e CLI.
// I valori si possono sovrascrivere con le variabili d'ambiente; in mancanza
// valgono quelli del progetto (projectId e dataset non sono dati segreti).
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qofqzwgs';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-26';
