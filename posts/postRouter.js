const express = require('express');

const db = require('./postDb');
const userDb = require('../users/userDb');

const router = express.Router();



router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(() =>{
    res.status(500).json({ message: "unable to retrieve post information"})
  })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  db.getById(req.params.id)
  .then(post =>{
    res.status(200).json(post)
  })
  .catch(() =>{
    res.status(500).json({ message: "cannot find post" })
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  db.remove(req.params.id)
  .then(() =>{
    res.status(200).json({ message: 'successfully deleted'})
  })
  .catch(() => {
    res.status(500).json({ message: 'unable to delete' })
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  db.update(req.params.id, req.body)
  .then(() => {
    res.status(200).json(req.body)
  })
  .catch(() => {
    res.status(500).json({ message: "unable to update post "})
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  db.getById(req.params.id)
  .then(post => {
    if(post){
      next();
    } else {
      res.status(400).json({ message: "invalid post id"})
    }
  })
  .catch(() =>{
    res.status(500).json({ message: "failed to validate post id" })
  })
}

module.exports = router;
