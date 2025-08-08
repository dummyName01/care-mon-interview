const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/dashboard'));
app.use('/api', require('./routes/items'));

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});