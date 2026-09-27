// Blocchi aggiuntivi della pagina di un report, diversi per ogni categoria.
// Ogni blocco compare solo se il campo corrispondente è compilato nello Studio.
import { ExternalLink, GitBranch, CheckCircle2, XCircle, CircleDot, Download, FileArchive, ShieldAlert } from 'lucide-react';
import styles from './ReportPanels.module.css';

// Mostra solo link http(s): evita che un valore errato diventi un link "javascript:"
function safeUrl(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url) ? url : null;
}

// Link alla pagina ufficiale MITRE ATT&CK, es. T1558.003 -> /techniques/T1558/003/
function mitreUrl(id) {
  return /^T\d{4}(\.\d{3})?$/.test(id)
    ? `https://attack.mitre.org/techniques/${id.replace('.', '/')}/`
    : null;
}

// ---------- SCHEDA TECNICA (sotto il titolo) ----------

// Restituisce le coppie [etichetta, valore] da mostrare per ogni categoria
export function getReportSpecs(log) {
  const specs = [];
  if (log._type === 'breachLog') {
    specs.push(
      ['PLATFORM', [log.platform, log.eventName].filter(Boolean).join(' // ')],
      ['CATEGORY', log.category || log.exploitVec],
      ['DIFFICULTY', log.difficulty],
      ['TARGET_OS', log.targetOs],
      ['TIME_SPENT', log.timeSpent],
    );
  }
  if (log._type === 'forgeLog') {
    const languages = log.languages?.length ? log.languages : [log.language].filter(Boolean);
    specs.push(
      ['PROJECT', log.projectType],
      ['STACK', languages.join(' / ')],
      ['VERSION', log.version],
      ['LICENSE', log.license],
      ['ROLE', log.role],
    );
  }
  if (log._type === 'malwareLog') {
    specs.push(
      ['EXPERIMENT', log.experimentType],
      ['PLATFORM', log.labPlatform || log.sandboxEnv],
      ['OUTCOME', log.outcome],
    );
  }
  return specs.filter(([, value]) => value);
}

export function SpecGrid({ items }) {
  return (
    <dl className={styles.specGrid}>
      {items.map(([label, value]) => (
        <div key={label} className={styles.specItem}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

// ---------- BLOCCHI COMUNI ----------

export function TagList({ tags }) {
  if (!tags?.length) return null;
  return (
    <ul className={styles.tagList} aria-label="Tag">
      {tags.map((tag) => (
        <li key={tag} className={styles.tag}>#{tag}</li>
      ))}
    </ul>
  );
}

export function KeyTakeaways({ text }) {
  if (!text) return null;
  return (
    <aside className={styles.takeaways}>
      <div className={styles.panelLabel}>KEY_TAKEAWAYS</div>
      <p>{text}</p>
    </aside>
  );
}

// ---------- CODE DEVELOPMENT ----------

export function ProjectLinks({ repoUrl, demoUrl }) {
  const repo = safeUrl(repoUrl);
  const demo = safeUrl(demoUrl);
  if (!repo && !demo) return null;
  return (
    <div className={styles.linkRow}>
      {repo && (
        <a href={repo} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
          <GitBranch size={15} /> SOURCE_CODE
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className={`${styles.linkButton} ${styles.linkButtonAlt}`}>
          <ExternalLink size={15} /> LIVE_DEMO
        </a>
      )}
    </div>
  );
}

// ---------- VIRTUAL LAB ----------

const OUTCOME_STYLE = {
  CONFIRMED: styles.outcomeOk,
  REFUTED: styles.outcomeKo,
  PARTIAL: styles.outcomePartial,
};

export function LabObjective({ objective, outcome }) {
  if (!objective) return null;
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelLabel}>OBJECTIVE // HYPOTHESIS</span>
        {outcome && (
          <span className={`${styles.outcome} ${OUTCOME_STYLE[outcome] || ''}`}>{outcome}</span>
        )}
      </div>
      <p className={styles.panelText}>{objective}</p>
    </section>
  );
}

export function LabTopology({ nodes }) {
  if (!nodes?.length) return null;
  return (
    <section className={styles.panel}>
      <div className={styles.panelLabel}>LAB_TOPOLOGY</div>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr><th>HOST</th><th>OS</th><th>ROLE</th></tr>
          </thead>
          <tbody>
            {nodes.map((node) => (
              <tr key={node._key || node.name}>
                <td className={styles.hostCell}>{node.name}</td>
                <td>{node.os}</td>
                <td>{node.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const ISOLATION_ITEMS = [
  ['networkIsolated', 'Rete isolata (host-only / nessuna uscita verso internet)'],
  ['snapshots', 'Snapshot prima di ogni fase'],
  ['noSharedFolders', 'Nessuna cartella condivisa con l\u2019host'],
];

export function LabSafety({ isolation, mitre }) {
  const hasIsolation = isolation && ISOLATION_ITEMS.some(([key]) => key in isolation);
  const techniques = (mitre || []).filter(Boolean);
  if (!hasIsolation && !techniques.length) return null;
  return (
    <section className={styles.panelSplit}>
      {hasIsolation && (
        <div className={styles.panel}>
          <div className={styles.panelLabel}>ISOLATION_CHECKS</div>
          <ul className={styles.checkList}>
            {ISOLATION_ITEMS.map(([key, label]) => (
              <li key={key} className={isolation[key] ? styles.checkOk : styles.checkKo}>
                {isolation[key] ? <CheckCircle2 size={14} /> : <XCircle size={14} />} {label}
              </li>
            ))}
          </ul>
        </div>
      )}
      {techniques.length > 0 && (
        <div className={styles.panel}>
          <div className={styles.panelLabel}>MITRE_ATT&amp;CK</div>
          <ul className={styles.tagList}>
            {techniques.map((id) => {
              const url = mitreUrl(id);
              return (
                <li key={id}>
                  {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" className={`${styles.tag} ${styles.tagLink}`}>
                      {id}
                    </a>
                  ) : (
                    <span className={styles.tag}>{id}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

// Campione e indicatori di compromissione (solo per l'analisi malware)
export function MalwareIndicators({ family, fileHash, iocs }) {
  if (!family && !fileHash && !iocs?.length) return null;
  return (
    <section className={`${styles.panel} ${styles.iocPanel}`}>
      <div className={styles.panelLabel}>SAMPLE // INDICATORS_OF_COMPROMISE</div>
      {(family || fileHash) && (
        <dl className={styles.sampleInfo}>
          {family && (<div><dt>FAMILY</dt><dd>{family}</dd></div>)}
          {fileHash && (<div><dt>SHA-256</dt><dd className={styles.hash}>{fileHash}</dd></div>)}
        </dl>
      )}
      {iocs?.length > 0 && (
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr><th>TYPE</th><th>VALUE</th><th>NOTE</th></tr>
            </thead>
            <tbody>
              {iocs.map((ioc) => (
                <tr key={ioc._key || ioc.value}>
                  <td><CircleDot size={10} className="inline mr-1" />{ioc.type}</td>
                  <td className={styles.hash}>{ioc.value}</td>
                  <td>{ioc.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className={styles.iocNote}>
        Indicatori resi non cliccabili (&quot;defanged&quot;): hxxp:// e [.] al posto di http:// e punto.
      </p>
    </section>
  );
}

// ---------- DOWNLOADS ----------

export function Downloads({ files }) {
  if (!files?.length) return null;
  const hasZipped = files.some((f) => f.zipped);
  return (
    <section className={styles.panel}>
      <div className={styles.panelLabel}>DOWNLOADS</div>
      <ul className={styles.downloadList}>
        {files.map((f) => (
          <li key={f.sha256} className={styles.downloadItem}>
            <div className={styles.downloadMain}>
              <span className={styles.downloadName}>
                {f.zipped ? <FileArchive size={14} /> : <Download size={14} />} {f.label}
              </span>
              {f.description && <span className={styles.downloadDesc}>{f.description}</span>}
              <span className={styles.downloadMeta}>
                {f.size}
                {f.zipped && ' · ZIP protetto'}
              </span>
              <code className={styles.downloadHash} title="SHA-256 del file originale">
                SHA-256: {f.sha256}
              </code>
            </div>
            {/* download={...} fa sì che il browser salvi il file invece di aprirlo */}
            <a href={f.href} download={f.filename} className={styles.downloadButton}>
              <Download size={14} /> GET
            </a>
          </li>
        ))}
      </ul>
      {hasZipped && (
        <p className={styles.downloadWarn}>
          <ShieldAlert size={13} className="inline mr-1" />
          Gli eseguibili sono in uno ZIP protetto da password (&quot;infected&quot;). Aprili solo in un
          ambiente isolato.
        </p>
      )}
    </section>
  );
}
