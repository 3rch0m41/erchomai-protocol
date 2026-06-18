"use client";

import React, { useState } from 'react';
import { Send, MessageSquare, User, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import styles from './contact.module.css';

export default function ContactPage() {
  const [status, setStatus] = useState('READY'); // READY, SENDING, SENT
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!privacyAccepted) return; // Blocco di sicurezza lato client

    setStatus('SENDING');
    setTimeout(() => setStatus('SENT'), 2000);
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
              <input type="text" placeholder="NOME_OPERATORE" required />
            </div>

            {/* Campo Email */}
            <div className={styles.inputGroup}>
              <label><Mail size={14} /> RETURN_SIGNAL_ADDRESS</label>
              <input type="email" placeholder="EMAIL@NETWORK.NET" required />
            </div>

            {/* Campo Messaggio */}
            <div className={styles.inputGroup}>
              <label><MessageSquare size={14} /> DATA_PACKAGE_CONTENT</label>
              <textarea placeholder="INSERIRE MESSAGGIO QUI..." rows="5" required></textarea>
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
              disabled={status !== 'READY' || !privacyAccepted}
            >
              {status === 'READY' && <><Send size={18} /> BROADCAST_SIGNAL</>}
              {status === 'SENDING' && <span className={styles.loading}>TRANSMITTING...</span>}
              {status === 'SENT' && <><ShieldCheck size={18} /> SIGNAL_RECEIVED</>}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}