"use client";

import React, { useState } from 'react';
import { Send, MessageSquare, User, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import styles from './contact.module.css';

export default function ContactPage() {
  // Stati per gestire lo stato dell'invio
  const [status, setStatus] = useState('READY'); // READY, SENDING, SENT, ERROR
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Stati per memorizzare i dati inseriti dall'utente
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Funzione di invio asincrona
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!privacyAccepted) return; // Blocco di sicurezza lato client

    setStatus('SENDING');

    try {
      // Chiamata all'endpoint API locale di Next.js
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('SENT');
        // Opzionale: svuota i campi dopo l'invio riuscito
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      console.error('Transmission failure:', error);
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
            {/* Campo Nome */}
            <div className={styles.inputGroup}>
              <label><User size={14} /> SENDER_IDENTITY</label>
              <input 
                type="text" 
                placeholder="NOME_OPERATORE" 
                required 
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
              {status === 'ERROR' && <span className={styles.error}>TRANSMISSION_FAILURE (RETRY)</span>}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}