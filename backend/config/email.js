const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000
});

// Send email function
const sendEmail = async (to, subject, html) => {
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  // Prefer HTTPS-based provider in production to avoid SMTP port timeout issues.
  if (process.env.RESEND_API_KEY) {
    if (!from) {
      throw new Error('Email configuration is missing. Please set EMAIL_FROM (or EMAIL_USER).');
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(`Resend API error: ${response.status} ${errorText}`);
      error.code = 'RESEND_API_ERROR';
      throw error;
    }

    const result = await response.json();
    console.log('Email sent via Resend:', result.id);
    return { success: true, message: 'Email sent successfully' };
  }

  // Brevo HTTP API avoids SMTP connectivity issues on some cloud platforms.
  if (process.env.BREVO_API_KEY) {
    if (!from) {
      throw new Error('Email configuration is missing. Please set EMAIL_FROM (or EMAIL_USER).');
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          email: from.match(/<([^>]+)>/) ? from.match(/<([^>]+)>/)[1] : from,
          name: from.match(/^\s*([^<]+)\s*</) ? from.match(/^\s*([^<]+)\s*</)[1].trim() : undefined
        },
        to: [{ email: to }],
        subject,
        htmlContent: html
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      const error = new Error(`Brevo API error: ${response.status} ${errorText}`);
      error.code = 'BREVO_API_ERROR';
      throw error;
    }

    const result = await response.json();
    console.log('Email sent via Brevo API:', result.messageId || 'ok');
    return { success: true, message: 'Email sent successfully' };
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email configuration is missing. Please set EMAIL_USER and EMAIL_PASSWORD.');
  }

  const mailOptions = {
    from,
    to,
    subject,
    html
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.response);
  return { success: true, message: 'Email sent successfully' };
};

module.exports = { sendEmail };