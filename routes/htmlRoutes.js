const app = require('express').Router();
const path = require('path');


app.get('/notes', (req, res) => {
    res.sendfile(path.join(__dirname, '../public/notes.html'));
})