
const path = require('path');
const express = require('express');
const app = express.Router();

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = app;