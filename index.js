const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/guest-token', (req, res) => {
  const guestToken = jwt.sign(
    {
      resources: [
        {
          type: 'dashboard',
          id: process.env.SUPERSET_DASHBOARD_ID
        },
      ],
      user: {
        username: "",
        first_name: "",
        last_name: "",
      },
      aud: "superset",
      type: "guest",
      rls_rules: {},
    },
    process.env.GUEST_TOKEN_JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
  res.json({ token: guestToken, dashboardId: process.env.SUPERSET_DASHBOARD_ID });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
