const cors = require('cors');

const corsMiddleware = cors({
  // Allows requests from your local machine and your live GitHub Pages site
  origin: [/localhost/, /\.github\.io$/] 
});

module.exports = async (req, res) => {
  return new Promise((resolve, reject) => {
    corsMiddleware(req, res, async (result) => {
      if (result instanceof Error) return reject(result);

      try {
        const { city, state, country, lat, lon } = req.query;
        
        const apiKey = process.env.APIKEY; 
        const units = 'imperial';
        const cnt = 5;

        let apiUrl = '';

        if (city || state || country) {
          apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city || ''},${state || ''},${country || ''}&appid=${apiKey}&units=${units}&cnt=${cnt}`;
        } else if (lat && lon) {
          apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&cnt=${cnt}`;
        } else {
          return res.status(400).json({ error: 'Missing search parameters' });
        }

        const apiResponse = await fetch(apiUrl);
        
        if (!apiResponse.ok) {
          return res.status(apiResponse.status).json({ error: 'OpenWeather API error' });
        }

        const data = await apiResponse.json();
        
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: 'Proxy server failure' });
      }
      resolve();
    });
  });
};
