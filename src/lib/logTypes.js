// Categorie dei report: UNICO punto in cui sono definite.
// La chiave è il tipo di documento in Sanity (non va cambiato: i report
// già scritti usano questi nomi); tutto il resto si può modificare qui.
export const LOG_TYPES = {
  breachLog: { id: 'CTF', label: 'CTF_REPORT', name: 'CTF & Challenges' },
  forgeLog: { id: 'CODE', label: 'CODE_FORGE', name: 'Code development' },
  malwareLog: { id: 'LAB', label: 'LAB_EXPERIMENT', name: 'Virtual Lab experiments' },
};

// Elenco dei tipi da usare nelle query GROQ: *[_type in ${LOG_TYPES_GROQ}]
export const LOG_TYPES_GROQ = JSON.stringify(Object.keys(LOG_TYPES));

// Categoria normalizzata (CTF, CODE, LAB) a partire dal tipo Sanity
export function getLogType(docType) {
  return LOG_TYPES[docType]?.id || 'SYSTEM';
}

// Prefisso del titolo, es. "CTF_REPORT // "
export function getLogPrefix(docType) {
  const type = LOG_TYPES[docType];
  return type ? `${type.label} // ` : 'SYSTEM // ';
}

// Stesso prefisso, partendo dalla categoria normalizzata (CTF, CODE, LAB)
export function getPrefixById(id) {
  const type = Object.values(LOG_TYPES).find((t) => t.id === id);
  return type ? `${type.label} // ` : 'SYSTEM // ';
}

// Pulsanti dei filtri nell'archivio
export const FILTER_CATEGORIES = [
  { id: 'ALL', label: 'ALL_SYSTEMS' },
  ...Object.values(LOG_TYPES).map(({ id, label }) => ({ id, label })),
];
