// node relies on common js modules (not ES6)
const express = require('express'),
      app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

// Dynamic port binding with heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Port 5000 Running...');
});