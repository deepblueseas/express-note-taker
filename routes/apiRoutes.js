const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.resolve(__dirname, '../db/db.json');

router.get('/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read notes from database.' });
      }
      try {
        const notes = JSON.parse(data);
        res.json(notes);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to parse notes data.' });
      }
    });
  });

  router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (!title || !text) {
      return res.status(400).json({ error: 'Title and text are required.' });
    }
  
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to read notes from database.' });
      }
      try {
        const notes = JSON.parse(data);
        const newNote = {
          id: uuidv4(),
          title,
          text,
        };
        notes.push(newNote);
        fs.writeFile(dbPath, JSON.stringify(notes), (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to write new note to database.' });
          }
          res.json(newNote);
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to parse notes data.' });
      }
    });
  });

module.exports = router;