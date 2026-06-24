import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inizializza l'SDK di Resend con la chiave segreta contenuta nel file .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // Estrae i dati inviati dal frontend (ContactPage)
    const { name, email, message } = await req.json();

    // Validazione dei dati lato server
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'CRITICAL_ERROR: MISSING_DATA_PACKAGES' }, 
        { status: 400 }
      );
    }

    // Struttura del testo email (HTML) che riceverai sulla tua casella privata
    const emailHtmlContent = `
      <div style="font-family: monospace; background-color: #0d1117; color: #58a6ff; padding: 20px; border: 1px solid #30363d; border-radius: 5px;">
        <h2 style="color: #238636; border-bottom: 1px solid #30363d; padding-bottom: 10px;">[UPLINK_ESTABLISHED]</h2>
        <p style="color: #c9d1d9;">Hai ricevuto un nuovo pacchetto dati dal modulo contatti del sito web.</p>
        
        <div style="margin: 20px 0; background-color: #161b22; padding: 15px; border-left: 4px solid #238636;">
          <p style="margin: 5px 0;"><strong>SENDER_IDENTITY:</strong> <span style="color: #ffffff;">${name}</span></p>
          <p style="margin: 5px 0;"><strong>RETURN_SIGNAL_ADDRESS:</strong> <span style="color: #ffffff;">${email}</span></p>
        </div>
        
        <h3 style="color: #58a6ff; margin-top: 20px;">DATA_PACKAGE_CONTENT:</h3>
        <pre style="background-color: #161b22; color: #ffffff; padding: 15px; border-radius: 4px; border: 1px solid #30363d; white-space: pre-wrap; font-family: monospace;">${message}</pre>
        
        <p style="font-size: 11px; color: #8b949e; margin-top: 30px; border-top: 1px solid #30363d; padding-top: 10px;">
          End of transmission. Reply directly to this email to contact the operator.
        </p>
      </div>
    `;

    // Esegue l'invio fisico dell'email tramite Resend
    const data = await resend.emails.send({
      from: 'Web System <onboarding@resend.dev>', // In produzione sostituisci con un'email del tuo dominio (es. info@tuosito.com)
      to: 'malinigiulio97@gmail.com',     // <-- INSERISCI QUI L'INDIRIZZO DELLA TUA EMAIL PRIVATA
      subject: '[UPLINK] Contact from: ${name}',
      reply_to: email,                          // Permette di rispondere all'utente semplicemente facendo "Rispondi" dalla tua casella postale
      html: emailHtmlContent,
    });

    // Se l'invio ha successo, restituisce una risposta positiva al client
    return NextResponse.json({ success: true, telemetry: data });

  } catch (error) {
    // Gestione degli errori in caso di problemi di rete o chiavi API non valide
    console.error('SERVER_TRANSMISSION_ERROR:', error);
    return NextResponse.json(
      { error: 'INTERNAL_SERVER_ERROR: SIGNAL_LOST', details: error.message }, 
      { status: 500 }
    );
  }
}