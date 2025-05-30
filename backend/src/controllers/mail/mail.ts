
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendMail = async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!email || !subject || !message) {
    res.status(400).json({ error: 'Please fill in all required fields.' });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: `VibeTrails <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: `[Contact Form] ${subject}`,
      text: `
New message from your website contact form:

Name: ${name || 'N/A'}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `.trim(),
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
};

