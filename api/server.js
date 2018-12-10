const express = require('express');
const cors = require('cors');
const server = express();
const db = require('../data/dbConfig.js');

server.use(express.json());
server.use(cors());

//Sanity Check
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

//get all of the notes
server.get('/api/notes', (req, res) => {
  db('notes')
    .then(list => {
      res.status(200).json(list);
    })
    .catch(err => {
      res.status(500).json({ error: "Couldn't retrieve the notes.", err });
    });
});

//view a single note
server.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  db('notes')
    .where({ id: id })
    .then(note => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ error: "That note doesn't exist" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The requested note could not be retrieved.', err });
    });
});

module.exports = server;
