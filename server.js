// much of this is boilerplate and adapted from the CWRU mini projects/examples

const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const dbPath = path.resolve(__dirname, '../db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Any file in public (like the html/css) can be accessed by the client using the app
app.use(express.static('public'));

//
app.use('/api', apiRoutes);

// Defining the route for notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// sets the index.html as the default route so to speak, a catch-all 
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);