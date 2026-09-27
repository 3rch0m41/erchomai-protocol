// Evidenziazione della sintassi lato server con Shiki.
// Restituisce i "token" colorati di un blocco di codice: vengono resi come
// semplici <span> colorati, senza HTML grezzo e senza JavaScript nel browser.
import {
  createHighlighter,
  createJavaScriptRegexEngine,
  bundledLanguages,
  bundledLanguagesAlias,
} from 'shiki';

// Tema dei colori (elenco completo: https://shiki.style/themes)
const THEME = 'tokyo-night';

// Un solo highlighter per tutto il server; i linguaggi si caricano quando servono
let highlighterPromise;
function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: [],
      // Motore JavaScript invece di WebAssembly: più semplice da eseguire su Vercel
      engine: createJavaScriptRegexEngine({ forgiving: true }),
    });
  }
  return highlighterPromise;
}

/**
 * @param {string} code      il codice da evidenziare
 * @param {string} language  il linguaggio scelto nello Studio (es. "python", "sh")
 * @returns {Promise<Array<Array<{content: string, color?: string, fontStyle?: number}>> | null>}
 *          una lista di righe di token, oppure null se il linguaggio non è supportato
 */
export async function highlightCode(code, language) {
  const lang = (language || '').toLowerCase();
  if (!code || !(lang in bundledLanguages || lang in bundledLanguagesAlias)) {
    return null; // Linguaggio sconosciuto o "text": il blocco resta in testo semplice
  }
  try {
    const highlighter = await getHighlighter();
    await highlighter.loadLanguage(lang);
    const { tokens } = highlighter.codeToTokens(code, { lang, theme: THEME });
    return tokens.map((line) =>
      line.map(({ content, color, fontStyle }) => ({ content, color, fontStyle }))
    );
  } catch (error) {
    console.error('HIGHLIGHT_ERROR:', error);
    return null;
  }
}
