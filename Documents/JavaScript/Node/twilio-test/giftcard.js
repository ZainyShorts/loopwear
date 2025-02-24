const https = require('https');
const axios = require('axios');

const agent = new https.Agent({
  rejectUnauthorized: false, // Ignore invalid SSL (useful for debugging only)
});

const options = {
  method: 'GET',
  url: 'https://apipp.blackhawknetwork.com/rewardsCatalogProcessing/v1/clientProgram/byKey',
  headers: { accept: 'application/json' },
  httpsAgent: agent,
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
