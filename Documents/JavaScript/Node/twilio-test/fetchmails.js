const Imap = require('imap-simple');
const { simpleParser } = require('mailparser');

const config = {
  imap: {
    user: 'zainyshorts@gmail.com',
    password: 'txea peda xkrj cfvx',
    host: 'imap.gmail.com', // Change for your provider
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false }, // Ignore SSL error
    authTimeout: 3000,
  },
};

async function fetchInboxEmails() {
    try {
      const connection = await Imap.connect(config);
      await connection.openBox('INBOX');
  
      const today = new Date().toISOString().split('T')[0];
      const searchCriteria = [['SINCE', today]];
      const fetchOptions = { bodies: [''], struct: true }; // Fetch full email body
  
      const messages = await connection.search(searchCriteria, fetchOptions);
      const emails = [];
  
      for (const message of messages) {
        const allParts = message.parts.map((part) => part.body).join('\n');
        const parsed = await simpleParser(allParts); // Properly parse the full email
  
        const from = parsed.from?.text || 'Unknown Sender';
        const subject = parsed.subject || 'No Subject';
        const date = parsed.date?.toString() || 'Unknown Date';
  
        // Get the clean text body (prefer plain text over HTML)
        let emailText = parsed.text?.trim() || '';
        if (!emailText && parsed.html) {
          emailText = parsed.html.replace(/<\/?[^>]+(>|$)/g, '').trim(); // Remove HTML tags
        }
  
        emails.push({ from, subject, date, text: emailText });
      }
  
      console.log('Fetched INBOX emails:', emails);
      connection.end();
    } catch (error) {
      console.error('Error fetching INBOX emails:', error);
    }
  }
  
  fetchInboxEmails();
