const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.resolve(__dirname, '../db/db.json');

// here we are checking the db.json to see what we already have stored for notes
router.get('/notes', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read database:', err);
      return res.status(500).json({ error: 'Failed to read notes from database.' });
    }
    try {
      const db = JSON.parse(data);
      // make sure the notes array is an array so that it can be read by json
      // we set the array in db.json to be named "notes": []
      if (!Array.isArray(db.notes)) {
        throw new Error('Notes data is not an array');
      }
      res.json(db.notes);
    } catch (err) {
      console.error('Failed to parse notes data:', err);
      res.status(500).json({ error: 'Failed to parse notes data.' });
    }
  });
});

// this is how we can add new notes. we're making sure there is a title and text because that is what is required in the client index.js
router.post('/notes', (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: 'Title and text are required.' });
  }

// then we check to see what is already saved in the db.json file
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read database:', err);
      return res.status(500).json({ error: 'Failed to read notes from database.' });
    }

    // if we dont declare notes here then we constantly get the error notes is not defined :)
    let notes;
    try {
      const db = JSON.parse(data);
      // if db.notes is not an array, we set it to an array just in case
      notes = Array.isArray(db.notes) ? db.notes : [];
    } catch (err) {
      console.error('Failed to parse database JSON:', err);
      return res.status(500).json({ error: 'Failed to parse notes data.' });
    }

    const newNote = {
      id: uuidv4(),
      title,
      text,
    };
    // add the new note to the notes array in the db.json
    notes.push(newNote);

    // rewrite the db.json to now include the new new!
    fs.writeFile(dbPath, JSON.stringify({ notes }), (err) => {
      if (err) {
        console.error('Failed to write to database:', err);
        return res.status(500).json({ error: 'Failed to write new note to database.' });
      }
      res.json(newNote);
    });
  });
});

module.exports = router;