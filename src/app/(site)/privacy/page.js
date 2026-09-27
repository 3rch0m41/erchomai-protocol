import React from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import styles from './privacy.module.css'; // Manteniamo il CSS della privacy

// ============================================================
// DATI DA COMPILARE: modifica qui, il resto della pagina li usa
// ============================================================
const OWNER_NAME = 'Giulio Malini';
const CONTACT_EMAIL = 'EMAIL_DA_INSERIRE@esempio.com'; // <-- inserisci l'email pubblica di contatto
const EFFECTIVE_DATE = '27 settembre 2026';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sul trattamento dei dati personali di ERCHOMAI PROTOCOL.',
};

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
            <h2>In vigore dal {EFFECTIVE_DATE}</h2>
            <p>
              La presente Privacy Policy descrive come questo sito tratta i dati personali di chi lo visita
              e di chi utilizza il modulo contatti, ai sensi degli artt. 13 e 14 del Regolamento UE 2016/679 (GDPR).
            </p>
            <br />
            <h2>01 // TITOLARE DEL TRATTAMENTO</h2>
            <p>
              Il Titolare del Trattamento è: {OWNER_NAME}.
              <br />
              Email: {CONTACT_EMAIL}
            </p>
          </section>

          <section className={styles.section}>
            <h2>02 // TIPOLOGIA DI DATI TRATTATI</h2>
            <ul>
              <li><strong>Dati forniti volontariamente tramite il modulo contatti:</strong></li>
              <ul>
                <li><ChevronRight size={10} className="inline mr-1" /> Nome o alias;</li>
                <li><ChevronRight size={10} className="inline mr-1" /> Indirizzo email, usato per rispondere;</li>
                <li><ChevronRight size={10} className="inline mr-1" /> Testo del messaggio.</li>
              </ul>
              <li><strong>Dati di navigazione:</strong></li>
              <ul>
                <li><ChevronRight size={10} className="inline mr-1" /> Indirizzo IP;</li>
                <li><ChevronRight size={10} className="inline mr-1" /> Tipo di browser e sistema operativo;</li>
                <li><ChevronRight size={10} className="inline mr-1" /> Data, ora e pagina richiesta.</li>
              </ul>
            </ul>
            <p>
              I dati di navigazione sono registrati automaticamente nei log tecnici del servizio di hosting.
              Per proteggere il modulo contatti da invii automatizzati, l&apos;indirizzo IP di chi invia un
              messaggio viene inoltre conservato temporaneamente in memoria per pochi minuti.
            </p>
          </section>

          <section className={styles.section}>
            <h2>03 // FINALITÀ DEL TRATTAMENTO</h2>
            <ul>
              <li><ChevronRight size={10} className="inline mr-1" /> Rispondere ai messaggi inviati tramite il modulo contatti;</li>
              <li><ChevronRight size={10} className="inline mr-1" /> Garantire il funzionamento e la sicurezza del sito, prevenendo abusi e spam.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>04 // BASE GIURIDICA DEL TRATTAMENTO</h2>
            <p>
              <strong>Modulo contatti:</strong> consenso dell&apos;interessato (art. 6, par. 1, lett. a del GDPR),
              espresso selezionando l&apos;apposita casella prima dell&apos;invio. Il consenso può essere revocato
              in qualsiasi momento scrivendo al Titolare, senza pregiudicare la liceità del trattamento svolto prima della revoca.
            </p>
            <p>
              <strong>Dati di navigazione e misure anti-abuso:</strong> legittimo interesse del Titolare a garantire
              la sicurezza e il corretto funzionamento del sito (art. 6, par. 1, lett. f del GDPR).
            </p>
          </section>

          <section className={styles.section}>
            <h2>05 // MODALITÀ DI TRATTAMENTO E CONSERVAZIONE</h2>
            <p>
              Tutti i dati in transito sono protetti da connessioni cifrate (TLS). Il sito non dispone di un database
              in cui archiviare i messaggi: il contenuto del modulo viene inoltrato via email al Titolare.
            </p>
            <p>
              I messaggi ricevuti sono conservati per il tempo necessario a gestire la richiesta e comunque non oltre
              12 mesi, dopodiché vengono cancellati. I log tecnici sono conservati dal servizio di hosting per un periodo
              limitato, secondo le sue politiche.
            </p>
          </section>

          <section className={styles.section}>
            <h2>06 // DESTINATARI</h2>
            <p>
              I dati personali non vengono venduti, ceduti o diffusi. Per il funzionamento del sito possono essere
              trattati, in qualità di Responsabili del Trattamento ai sensi dell&apos;art. 28 del GDPR, da:
            </p>
            <ul>
              <li><ChevronRight size={10} className="inline mr-1" /> <strong>Vercel Inc.</strong> (Stati Uniti): hosting del sito e log tecnici;</li>
              <li><ChevronRight size={10} className="inline mr-1" /> <strong>Resend</strong> (Stati Uniti): invio delle email generate dal modulo contatti;</li>
              <li><ChevronRight size={10} className="inline mr-1" /> <strong>Sanity</strong> (Norvegia): gestione dei contenuti e distribuzione delle immagini degli articoli, per cui riceve l&apos;indirizzo IP del visitatore quando un&apos;immagine viene caricata;</li>
              <li><ChevronRight size={10} className="inline mr-1" /> il fornitore del servizio email su cui il Titolare riceve i messaggi.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>07 // TRASFERIMENTO DEI DATI EXTRA UE</h2>
            <p>
              Vercel e Resend hanno sede negli Stati Uniti, quindi alcuni dati possono essere trasferiti al di fuori
              dello Spazio Economico Europeo. Tali trasferimenti avvengono sulla base delle garanzie previste dagli
              artt. 45 e 46 del GDPR, come la decisione di adeguatezza EU-US Data Privacy Framework o le clausole
              contrattuali standard approvate dalla Commissione Europea.
            </p>
          </section>

          <section className={styles.section}>
            <h2>08 // COOKIE E STRUMENTI DI TRACCIAMENTO</h2>
            <p>
              Questo sito non utilizza cookie, né strumenti di analisi statistica, profilazione o tracciamento pubblicitario.
            </p>
          </section>

          <section className={styles.section}>
            <h2>09 // DIRITTI DELL&apos;INTERESSATO</h2>
            <p>Ai sensi degli artt. 15-22 del GDPR, l&apos;interessato ha il diritto di:</p>
            <ul>
              <li><ChevronRight size={10} className="inline mr-1" /> accedere ai propri dati personali;</li>
              <li><ChevronRight size={10} className="inline mr-1" /> chiederne la rettifica o la cancellazione;</li>
              <li><ChevronRight size={10} className="inline mr-1" /> chiedere la limitazione del trattamento e la portabilità dei dati;</li>
              <li><ChevronRight size={10} className="inline mr-1" /> opporsi al trattamento basato sul legittimo interesse;</li>
              <li><ChevronRight size={10} className="inline mr-1" /> revocare in qualsiasi momento il consenso prestato.</li>
            </ul>
            <p>
              Per esercitare questi diritti è sufficiente scrivere all&apos;indirizzo indicato nella sezione 01.
              <br />
              L&apos;interessato ha inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali
              (www.garanteprivacy.it).
            </p>
          </section>

          <section className={styles.section}>
            <h2>10 // MODIFICHE ALLA PRESENTE POLICY</h2>
            <p>
              Questa Privacy Policy può essere aggiornata in qualsiasi momento. La data di entrata in vigore della
              versione corrente è indicata all&apos;inizio della pagina.
            </p>
          </section>
        </article>

        {/* NOTA: Il wrapper vuoto sotto serve come cuscinetto flessibile prima del footer globale */}
        <div className={styles.footerSpacing} />

      </main>
    </div>
  );
}