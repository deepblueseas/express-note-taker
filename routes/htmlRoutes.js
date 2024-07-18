const app = require('express').Router();
const path = require('path');
const express = require('express');


app.get('/notes', (req, res) => {
    res.sendfile(path.join(__dirname, '../public/notes.html'));
});

module.exports = app;