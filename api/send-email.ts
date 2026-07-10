import type { VercelRequest, VercelResponse } from '@vercel/node';
import multer from 'multer';
import nodemailer from 'nodemailer';

// Disable default Vercel body parser to allow multer to handle the raw stream
export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({ storage: multer.memoryStorage() });

// Helper function to run middleware in Vercel API
function runMiddleware(req: VercelRequest, res: VercelResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await runMiddleware(req, res, upload.single('attachment'));
  } catch (error) {
    console.error('Multer parsing error:', error);
    return res.status(500).json({ error: 'Error parsing form data' });
  }

  const { name, email, message } = req.body as { name: string; email: string; message: string };
  // @ts-ignore
  const file = req.file;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email,
  };

  if (file) {
    mailOptions.attachments = [
      {
        filename: file.originalname,
        content: file.buffer,
      },
    ];
  }

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
}
