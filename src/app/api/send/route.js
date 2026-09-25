import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Configurazione tramite variabili d'ambiente (.env.local / Vercel):
//   RESEND_API_KEY     chiave segreta Resend (obbligatoria)
//   CONTACT_TO_EMAIL   casella che riceve i messaggi (obbligatoria)
//   CONTACT_FROM_EMAIL mittente, es. "Web System <info@tuodominio.com>" (opzionale)
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Web System <onboarding@resend.dev>';

// Limiti sui campi del form
const LIMITS = { name: 100, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

// Rate limit: max 5 invii ogni 10 minuti per IP.
// È in memoria, quindi vale per singola istanza del server: su Vercel ferma gli
// abusi semplici ma non è globale. Per un limite condiviso serve uno store
// esterno (es. Upstash Redis + @upstash/ratelimit).
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  // Pulizia periodica per non far crescere la mappa all'infinito
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT.max;
}

// Escape di tutti i caratteri con significato in HTML
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Rimuove a capo e caratteri di controllo (per oggetto e campi su una riga)
function singleLine(str) {
  return str.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim();
}

function errorResponse(message, status) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req) {
  // 1. Solo richieste provenienti dal sito stesso
  const origin = req.headers.get('origin');
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  let sameOrigin = false;
  try {
    sameOrigin = Boolean(origin && host && new URL(origin).host === host);
  } catch {
    sameOrigin = false;
  }
  if (!sameOrigin) {
    return errorResponse('FORBIDDEN_ORIGIN', 403);
  }

  if (!req.headers.get('content-type')?.includes('application/json')) {
    return errorResponse('UNSUPPORTED_MEDIA_TYPE', 415);
  }

  // 2. Rate limit per IP
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (isRateLimited(ip)) {
    return errorResponse('RATE_LIMIT_EXCEEDED: RETRY_LATER', 429);
  }

  // 3. Parsing e validazione
  let body;
  try {
    body = await req.json();
  } catch {
    return errorResponse('MALFORMED_DATA_PACKAGE', 400);
  }
  if (!body || typeof body !== 'object') {
    return errorResponse('MALFORMED_DATA_PACKAGE', 400);
  }

  const { name, email, message, privacyAccepted, website } = body;

  // Honeypot: campo invisibile agli utenti, i bot lo compilano.
  // Rispondiamo "ok" senza inviare nulla, per non dare indizi al bot.
  if (typeof website === 'string' && website.length > 0) {
    return NextResponse.json({ success: true });
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return errorResponse('CRITICAL_ERROR: MISSING_DATA_PACKAGES', 400);
  }

  const cleanName = singleLine(name);
  const cleanEmail = singleLine(email);
  const cleanMessage = message.replace(/\r\n/g, '\n').trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return errorResponse('CRITICAL_ERROR: MISSING_DATA_PACKAGES', 400);
  }
  if (
    cleanName.length > LIMITS.name ||
    cleanEmail.length > LIMITS.email ||
    cleanMessage.length > LIMITS.message
  ) {
    return errorResponse('DATA_PACKAGE_TOO_LARGE', 400);
  }
  if (!EMAIL_RE.test(cleanEmail)) {
    return errorResponse('INVALID_RETURN_SIGNAL_ADDRESS', 400);
  }
  // Consenso GDPR verificato anche lato server
  if (privacyAccepted !== true) {
    return errorResponse('PRIVACY_CONSENT_REQUIRED', 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    console.error('SERVER_CONFIG_ERROR: RESEND_API_KEY o CONTACT_TO_EMAIL mancanti');
    return errorResponse('INTERNAL_SERVER_ERROR: SIGNAL_LOST', 500);
  }

  // 4. Composizione email: ogni dato dell'utente passa da escapeHtml
  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeMessage = escapeHtml(cleanMessage);

  const emailHtmlContent = `
      <div style="font-family: monospace; background-color: #0d1117; color: #58a6ff; padding: 20px; border: 1px solid #30363d; border-radius: 5px;">
        <h2 style="color: #238636; border-bottom: 1px solid #30363d; padding-bottom: 10px;">[UPLINK_ESTABLISHED]</h2>
        <p style="color: #c9d1d9;">Hai ricevuto un nuovo pacchetto dati dal modulo contatti del sito web.</p>

        <div style="margin: 20px 0; background-color: #161b22; padding: 15px; border-left: 4px solid #238636;">
          <p style="margin: 5px 0;"><strong>SENDER_IDENTITY:</strong> <span style="color: #ffffff;">${safeName}</span></p>
          <p style="margin: 5px 0;"><strong>RETURN_SIGNAL_ADDRESS:</strong> <span style="color: #ffffff;">${safeEmail}</span></p>
        </div>

        <h3 style="color: #58a6ff; margin-top: 20px;">DATA_PACKAGE_CONTENT:</h3>
        <pre style="background-color: #161b22; color: #ffffff; padding: 15px; border-radius: 4px; border: 1px solid #30363d; white-space: pre-wrap; font-family: monospace;">${safeMessage}</pre>

        <p style="font-size: 11px; color: #8b949e; margin-top: 30px; border-top: 1px solid #30363d; padding-top: 10px;">
          End of transmission. Reply directly to this email to contact the operator.
        </p>
      </div>
    `;

  const emailTextContent =
    `[UPLINK_ESTABLISHED]\n\nSENDER_IDENTITY: ${cleanName}\n` +
    `RETURN_SIGNAL_ADDRESS: ${cleanEmail}\n\nDATA_PACKAGE_CONTENT:\n${cleanMessage}\n`;

  // 5. Invio
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: toEmail,
      subject: `[UPLINK] Contact from: ${cleanName}`,
      replyTo: cleanEmail,
      html: emailHtmlContent,
      text: emailTextContent,
    });

    if (error) {
      console.error('SERVER_TRANSMISSION_ERROR:', error);
      return errorResponse('INTERNAL_SERVER_ERROR: SIGNAL_LOST', 502);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Il dettaglio resta nei log del server, non va al client
    console.error('SERVER_TRANSMISSION_ERROR:', error);
    return errorResponse('INTERNAL_SERVER_ERROR: SIGNAL_LOST', 500);
  }
}
