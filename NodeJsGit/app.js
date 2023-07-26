const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());

let data = null;

const fetchOptionChainData = async () => {
  try {
    const response = await axios.get('https://www.nseindia.com/api/option-chain-indices', {
     
      params: {
        symbol: 'NIFTY'
      }
    });
    data = response.data;
    console.log('Data updated:', new Date());
  } catch (err) {
    console.error(err);
  }
};

// Initial data fetch
fetchOptionChainData();

// Fetch data every 30 seconds
setInterval(fetchOptionChainData, 30 * 1000);

app.get('/option-chain', async (req, res) => {
  if (!data) {
    return res.status(500).json({ error: 'Data not available' });
  }
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
