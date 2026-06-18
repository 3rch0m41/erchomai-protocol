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
            <h1 className={styles.title}>PRIVACY_POLICY di ERCHOMAI-PROTOCOL</h1>
          </div>
          <p className={styles.subtitle}>
            Regolamento UE 2016/679 // General Data Protection Regulation (GDPR)
          </p>
        </header>

        <div className={styles.mainDivider} />

        {/* CONTENUTO LEGALE */}
        <article className={styles.legalContent}>
          
          <section className={styles.section}>
            <h2>In vigore dal [DATA PUBBLICAZIONE SITO]</h2>
            <p>La presente Privacy Policy descrive le modalità di gestione di questo sito web in riferimento al trattamento dei dati personali degli utenti.</p>
            <br></br>
            <h2>01 // TITOLARE DEL TRATTAMENTO</h2>
            <p>
              Il Titolare del Trattamento è: Giulio Malini. 
              <br />
              Email: [EMAIL_ADDRESS]
            </p>
          </section>
          <section className={styles.section}>
            <h2>02 // TIPOLOGIA DI DATI TRATTATI</h2>
            <p>
              L&apos;infrastruttura raccoglie esclusivamente i dati minimi necessari per stabilire un flusso di comunicazione diretto su richiesta spontanea dell&apos;utente. I pacchetti informativi includono:
            </p>
            <ul>
              <li><strong>Dati forniti volontariamente dall&apos;utente</strong></li>
              <ul>
                <li>
                <ChevronRight size={10} className="inline mr-1" /> 
                  Nome o Alias fornito dall&apos;utente.
                </li>
                <li>
                  <ChevronRight size={10} className="inline mr-1" /> 
                  Indirizzo di posta elettronica per la risposta.
                </li>
                <li>
                  <ChevronRight size={10} className="inline mr-1" /> 
                  Il testo del messaggio digitato nel modulo.
                </li>
              </ul>
              <li><strong>Dati di navigazione:</strong></li>
              <ul>
                <li>
                <ChevronRight size={10} className="inline mr-1" /> 
                  Indirizzo IP;
                </li>
                <li>
                  <ChevronRight size={10} className="inline mr-1" /> 
                  Browser;
                </li>
                <li>
                  <ChevronRight size={10} className="inline mr-1" /> 
                  Altri log tecnici;
                </li>
              </ul>
          </ul>
          </section>

          <section className={styles.section}>
            <h2>03 // FINALITÀ DEL TRATTAMENTO</h2>
            <p>
              I flussi dati estratti dal modulo contatti vengono elaborati per l&apos;unica finalità di dare riscontro alle richieste di interazione o di supporto professionale.
            </p>
          </section>
          <section className={styles.section}>
            <h2>04 // BASE GIURIDICA DEL TRATTAMENTO</h2>
            <p>
              <strong>Base giuridica:</strong> Il trattamento si fonda sul consenso esplicito dell&apos;interessato (Art. 6, par. 1, lett. b del GDPR - misure precontrattuali), manifestato in modo vincolante tramite la selezione manuale della checkbox di validazione prima della trasmissione del segnale.
            </p>
          </section>

          <section className={styles.section}>
            <h2>05 // MODALITÀ DI TRATTAMENTO</h2>
            <p>
              Tutti i dati in transito sono protetti tramite connessioni cifrate (SSL/TLS). Non è presente alcun database di persistenza a lungo termine sul server per i messaggi ricevuti: i dati vengono inviati via email tramite protocollo HTTPS.
            </p>
            <p>
              I dati personali saranno conservati per il tempo strettamente necessario (non oltre 12 mesi), dopodiché si procederà alla rimozione dei record.
            </p>
          </section>

          <section className={styles.section}>
            <h2>06 // DESTINATARI</h2>
            <p>
              Tutti i dati personali non vengono venduti, ceduti o diffusi a terzi. I dati raccolti tramite il modulo contatti sono accessibili esclusivamente al Titolare del Trattamento e ai suoi collaboratori strettamente necessari per la gestione delle richieste.
              <br />
              Possono essere trattati da:
            </p>
            <ul>
              <li>Titolare del Trattamento</li>
              <li>Provider del servizio mail (es. Google, Microsoft, Libero, ProtonMail)</li>
              <li>Provider del servizio hosting (es. AWS, Google Cloud, Microsoft Azure)</li>
            </ul>
            <p>
              Tali soggetti possono agire in qualità di Responsabili del Trattamento, secondo quanto previsto dall&apos;art. 28 del GDPR.
            </p>
          </section>

          <section className={styles.section}>
            <h2>07 // TRASFERIMENTO DEI DATI EXTRA UE</h2>
            <p>
              L’utilizzo di servizi email o hosting potrebbe comportare il trasferimento di dati verso paesi al di fuori dell’Unione Europea.
              Tali trasferimenti avvengono nel rispetto delle garanzie previste dal GDPR (es. clausole contrattuali standard approvate dalla Commissione Europea).
            </p>
          </section>

          <section className={styles.section}>
            <h2>08 // COOKIES e STRUMENTI DI TRACCIAMENTO</h2>
            <p>
              Questo sito utilizza esclusivamente: <strong>Cookie tecnici necessari</strong> al funzionamento del sito
              Non vengono utilizzati cookie di profilazione o di terze parti per finalità pubblicitarie o di tracciamento.
            </p>
          </section>

          <section className={styles.section}>
            <h2>09 // DIRITTI DELL&apos;INTERESSATO</h2>
            <p>
             L&apos;ha il diritto di:
            </p>
            <ul>
              <li>Accedere ai propri dati personali;</li>
              <li>Richiedere la rettifica o la cancellazione dei dati;</li>
              <li>Opporsi al trattamento dei dati;</li>
            </ul>
            <p>
              per esercitare tali diritti, l&apos;interessato può contattare il Titolare del Trattamento tramite l&apos;indirizzo email fornito nella sezione 01.
              <br />
              L&apos;interessato ha inoltre il diritto di proporre reclamo all&apos;Autorità Garante per la protezione dei dati personali.
            </p>
          </section>




        </article>

        {/* NOTA: Il wrapper vuoto sotto serve come cuscinetto flessibile prima del footer globale */}
        <div className={styles.footerSpacing} />

      </main>
    </div>
  );
}