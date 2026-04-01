"use client";

import React, { useEffect, useRef } from 'react';
import { ShieldAlert, Check } from 'lucide-react';
import styles from './CookieBanner.module.css';

export default function CookieLogic() {
  const bannerRef = useRef(null);

  useEffect(() => {
    // Eseguito solo nel browser dopo il montaggio
    const consent = localStorage.getItem('cookie-consent');

    if (!consent && bannerRef.current) {
      // Manipolazione diretta delle classi CSS: React non vede render
      bannerRef.current.classList.add(styles.isVisible);
    }
  }, []);

  const handleAction = (choice) => {
    localStorage.setItem('cookie-consent', choice);
    if (bannerRef.current) {
      bannerRef.current.classList.remove(styles.isVisible);
    }
  };

  return (
    <div ref={bannerRef} className={styles.bannerContainer}>
      <div className={styles.glitchBox}>
        <div className={styles.content}>
          <div className={styles.iconArea}>
            <ShieldAlert size={18} className="text-[#00f2fe]" />
          </div>
          
          <div className={styles.textArea}>
            <span className={styles.title}>COOKIE_PROTOCOL</span>
            <p className={styles.desc}>
              We use essential cookies to make our site work. We&apos;d also like to use non-essential cookies to analyze traffic and show personalized ads. Accept Cookie Policy?
            </p>
          </div>

          <div className={styles.actions}>
            <button 
              onClick={() => handleAction('accepted')} 
              className={`${styles.btnBase} styles.btnAccept`}
            >
              <Check size={12} /> ACCEPT_ALL
            </button>
            <button 
              onClick={() => handleAction('declined')} 
              className={`${styles.btnBase} styles.btnDecline`}
            >
              DECLINE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}