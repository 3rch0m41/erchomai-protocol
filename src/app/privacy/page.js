import React from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import styles from './privacy.module.css'; // Manteniamo il CSS della privacy

export default function PrivacyPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.gridOverlay} />
      
      <main className={styles.mainContent}>
        
        {/* HEADER */}
        <header className={styles.header}>
          <div className={styles.navigationRow}>
            <Link href="/" className={styles.returnLink}>
              RETURN_TO_CORE
            </Link>
            <span className={styles.systemNote}>STATUS: COMPLIANT_v4.1</span>
          </div>
          
          <div className={styles.titleGroup}>
            <Shield size={32} className={styles.icon} />
            <h1 className={styles.title}>PRIVACY_POLICY_PROTOCOL</h1>
          </div>
          <p className={styles.subtitle}>
            Regolamento UE 2016/679 // General Data Protection Regulation (GDPR)
          </p>
        </header>

        <div className={styles.mainDivider} />

        {/* CONTENUTO LEGALE */}
        <article className={styles.legalContent}>
          
          <section className={styles.section}>
            <h2>01 // TITOLARE DEL TRATTAMENTO</h2>
            <p>
              Il Titolare del Trattamento è l&apos;amministratore dell&apos;infrastruttura di rete 
              <span className="text-white"> erchomai-protocol</span>. Le richieste di informazioni, 
              modifica, cancellazione o revoca del consenso possono essere inoltrate direttamente 
              tramite il modulo di contatto presente nella sezione 
              <Link href="/contact" className="text-[#00f2fe] underline ml-1">
                ESTABLISH_CONNECTION
              </Link>.
            </p>
          </section>

          <section className={styles.section}>
            <h2>02 // TIPOLOGIA DI DATI RACCOLTI (PAYLOAD)</h2>
            <p>
              L&apos;infrastruttura raccoglie esclusivamente i dati minimi necessari per stabilire un flusso di comunicazione diretto su richiesta spontanea dell&apos;utente. I pacchetti informativi includono:
            </p>
            <ul>
              <li>
                <ChevronRight size={10} className="inline mr-1" /> 
                SENDER_IDENTITY: Nome o Alias fornito dall&apos;operatore.
              </li>
              <li>
                <ChevronRight size={10} className="inline mr-1" /> 
                RETURN_SIGNAL_ADDRESS: Indirizzo di posta elettronica per la risposta.
              </li>
              <li>
                <ChevronRight size={10} className="inline mr-1" /> 
                DATA_PACKAGE_CONTENT: Il testo del messaggio digitato nel modulo.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>03 // FINALITÀ E BASE GIURIDICA DEL TRATTAMENTO</h2>
            <p>
              I flussi dati estratti dal modulo contatti vengono elaborati per l&apos;unica finalità di riscontrare le richieste di interazione o di supporto professionale.
            </p>
            <p>
              <strong>Base giuridica:</strong> Il trattamento si fonda sul consenso esplicito dell&apos;interessato (Art. 6, par. 1, lett. a del GDPR), manifestato in modo vincolante tramite la selezione manuale della checkbox di validazione prima della trasmissione del segnale.
            </p>
          </section>

          <section className={styles.section}>
            <h2>04 // PROTOCOLLI DI SICUREZZA & RETENZIONE</h2>
            <p>
              Tutti i dati in transito sono protetti tramite connessioni cifrate (SSL/TLS). Non viene eseguito alcun database di persistenza a lungo termine sul server per i messaggi ricevuti: le informazioni vengono inviate direttamente su canali email blindati.
            </p>
            <p>
              I dati personali saranno conservati per il tempo strettamente necessario all&apos;adempimento delle richieste dell&apos;utente (non oltre 12 mesi dalla chiusura dell&apos;ultimo uplink comunicativo), dopodiché si procederà all&apos;epurazione atomica dei record.
            </p>
          </section>

          <section className={styles.section}>
            <h2>05 // DIRITTI DEGLI INTERESSATI</h2>
            <p>
              Ai sensi degli articoli 15 e seguenti del GDPR, l&apos;utente ha il diritto in qualsiasi momento di richiedere la verifica dei propri dati presenti in archivio, la rettifica, l&apos;integrazione o la totale cancellazione (&quot;Diritto all&apos;oblio&quot;) inviando una notifica scritta al Titolare.
            </p>
          </section>

        </article>

        {/* NOTA: Il wrapper vuoto sotto serve come cuscinetto flessibile prima del footer globale */}
        <div className={styles.footerSpacing} />

      </main>
    </div>
  );
}