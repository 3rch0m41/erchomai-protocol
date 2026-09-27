"use client";

import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, User, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import styles from './contact.module.css';

// Messaggi mostrati all'utente per ciascun codice d'errore dell'API
const ERROR_MESSAGES = {
  RATE_LIMIT_EXCEEDED: 'ERR_RATE_LIMIT // Troppi invii ravvicinati: riprova tra qualche minuto.',
  INVALID_RETURN_SIGNAL_ADDRESS: "ERR_ADDRESS // L'indirizzo email non è valido.",
  DATA_PACKAGE_TOO_LARGE: 'ERR_OVERFLOW // Uno dei campi supera la lunghezza massima.',
  PRIVACY_CONSENT_REQUIRED: 'ERR_CONSENT // Devi accettare la privacy policy per inviare.',
  MISSING_DATA_PACKAGES: 'ERR_INCOMPLETE // Compila tutti i campi.',
  NETWORK: 'ERR_NETWORK // Connessione assente: controlla la rete e riprova.',
  DEFAULT: 'ERR_TRANSMISSION // Invio non riuscito: riprova più tardi.',
};

// Trova il messaggio adatto a partire dal codice restituito dall'API
function getErrorMessage(code) {
  if (typeof code !== 'string') return ERROR_MESSAGES.DEFAULT;
  const key = Object.keys(ERROR_MESSAGES).find((k) => code.includes(k));
  return key ? ERROR_MESSAGES[key] : ERROR_MESSAGES.DEFAULT;
}

// Dopo quanto tempo il form torna disponibile per un nuovo messaggio
const RESET_AFTER_MS = 6000;

export default function ContactPage() {
  // Stati per gestire lo stato dell'invio
  const [status, setStatus] = useState('READY'); // READY, SENDING, SENT, ERROR
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Stati per memorizzare i dati inseriti dall'utente
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // Honeypot: resta vuoto per gli utenti reali, i bot tendono a compilarlo
  const [website, setWebsite] = useState('');

  // Dopo un invio riuscito il form si riattiva da solo. Il consenso va
  // ridato per ogni nuovo messaggio, quindi la checkbox torna deselezionata.
  useEffect(() => {
    if (status !== 'SENT') return;
    const timer = setTimeout(() => {
      setStatus('READY');
      setPrivacyAccepted(false);
    }, RESET_AFTER_MS);
    return () => clearTimeout(timer);
  }, [status]);

  // Funzione di invio asincrona
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!privacyAccepted) return; // Blocco di sicurezza lato client

    setStatus('SENDING');
    setErrorMessage('');

    try {
      // Chiamata all'endpoint API locale di Next.js
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, privacyAccepted, website }),
      });

      if (response.ok) {
        setStatus('SENT');
        // Opzionale: svuota i campi dopo l'invio riuscito
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // Legge il codice d'errore restituito dall'API per spiegare cosa non va
        const data = await response.json().catch(() => ({}));
        setErrorMessage(getErrorMessage(data.error));
        setStatus('ERROR');
      }
    } catch (error) {
      console.error('Transmission failure:', error);
      setErrorMessage(ERROR_MESSAGES.NETWORK);
      setStatus('ERROR');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.scanline}></div>
      
      <main className={styles.mainContent}>
        <div className={styles.contactBox}>
          
          <header className={styles.header}>
            <div className={styles.titleGroup}>
              <MessageSquare size={20} className={styles.icon} />
              <h1 className={styles.title}>ESTABLISH_CONNECTION</h1>
            </div>
          </header>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Honeypot anti-spam: invisibile e fuori dalla navigazione da tastiera */}
            <div
              aria-hidden="true"
              style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}
            >
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {/* Campo Nome */}
            <div className={styles.inputGroup}>
              <label><User size={14} /> SENDER_IDENTITY</label>
              <input 
                type="text" 
                placeholder="NOME_OPERATORE" 
                required 
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Campo Email */}
            <div className={styles.inputGroup}>
              <label><Mail size={14} /> RETURN_SIGNAL_ADDRESS</label>
              <input 
                type="email" 
                placeholder="EMAIL@NETWORK.NET" 
                required 
                maxLength={254}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Campo Messaggio */}
            <div className={styles.inputGroup}>
              <label><MessageSquare size={14} /> DATA_PACKAGE_CONTENT</label>
              <textarea 
                placeholder="INSERIRE MESSAGGIO QUI..." 
                rows="5" 
                required
                maxLength={5000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            {/* SEZIONE PRIVACY COMPLIANCE // GDPR_UPLINK_VALIDATION */}
            <div className={styles.privacyGroup}>
              <input 
                type="checkbox" 
                id="gdpr_consent" 
                required
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className={styles.privacyCheckbox}
              />
              <label htmlFor="gdpr_consent" className={styles.privacyLabel}>
                {`Accetto il trattamento dei dati personali ai sensi del GDPR per la gestione della richiesta di uplink secondo le specifiche indicate nella `}
                <Link href="/privacy" className={styles.privacyLink}>
                  PRIVACY_POLICY
                </Link>
                {`.`}
              </label>
            </div>

            <button 
              type="submit" 
              className={styles.sendButton} 
              disabled={(status !== 'READY' && status !== 'ERROR') || !privacyAccepted}
            >
              {status === 'READY' && <><Send size={18} /> BROADCAST_SIGNAL</>}
              {status === 'SENDING' && <span className={styles.loading}>TRANSMITTING...</span>}
              {status === 'SENT' && <><ShieldCheck size={18} /> SIGNAL_RECEIVED</>}
              {status === 'ERROR' && <span>TRANSMISSION_FAILURE (RETRY)</span>}
            </button>

            {/* Esito dell'invio, annunciato anche ai lettori di schermo */}
            <p className={styles.statusMessage} role="status" aria-live="polite">
              {status === 'ERROR' && <span className={styles.statusError}>{errorMessage}</span>}
              {status === 'SENT' && (
                <span className={styles.statusSuccess}>
                  UPLINK_OK // Messaggio ricevuto, ti risponderò il prima possibile.
                </span>
              )}
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}