const Imap = require('imap-simple');
const { simpleParser } = require('mailparser');

const imapConfig = {
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


async function fetchInboxEmails(dateString) {
    try {
      const connection = await Imap.connect(imapConfig);
      await connection.openBox('INBOX');
  
      // Convert `mm-dd-yyyy` format to `YYYY-MM-DD`
      const [month, day, year] = dateString.split('-').map(Number);
      const formattedDate = new Date(year, month - 1, day).toISOString().split('T')[0];
  
      const searchCriteria = [['SINCE', formattedDate]];
      const fetchOptions = { bodies: [''], struct: true }; // Fetch full email body
  
      const messages = await connection.search(searchCriteria, fetchOptions);
      const emails = [];
  
      for (const message of messages) {
        const allParts = message.parts.map((part) => part.body).join('\n');
        const parsed = await simpleParser(allParts); // Properly parse the full email
  
        const from = parsed.from?.text || 'Unknown Sender';
        const subject = parsed.subject || 'No Subject';
        const emailDate = parsed.date?.toString() || 'Unknown Date';
  
        // Extract clean text body (prefer plain text over HTML)
        let emailText = parsed.text?.trim() || '';
        if (!emailText && parsed.html) {
          emailText = parsed.html.replace(/<\/?[^>]+(>|$)/g, '').trim(); // Remove HTML tags
        }
  
        emails.push({ from, subject, date: emailDate, text: emailText });
      }
  
      connection.end();
      console.log(emails)
      return emails;
    } catch (error) {
      console.error('Error fetching INBOX emails:', error);
      throw new Error('Failed to fetch emails');
    }
  }

  fetchInboxEmails("02-10-2025")
