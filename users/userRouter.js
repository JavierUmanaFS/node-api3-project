const express = require('express');

const db = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();



router.post('/', validateUser, (req, res) => {
  // do your magic!
  const user = req.body;
  db.insert(user)
  .then(() => {
    res.status(201).json(user);
  })
  .catch(() => {
    res.status(500).json({ message: "Unable to upload "})
  })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  postDb.insert(req.body)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(() =>{
    res.status(500).json({ message: "Unable to upload" })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
  .then(posts => {
     res.status(200).json(posts);
  })
  .catch(() => {
    res.status(500).json({ message: 'The information could not be retrieved '})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  db.getUserPosts(req.params.id)
  .then(posts => {
    if(posts){
      res.status(200).json(posts)
    } else {
      res.status(404).json({ message: "There are no posts to display "})
    }
  })
  .catch(() => {
    res.status(500).json({ message: 'The post information could not be retrieved'})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  db.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: 'Success' })
  })
  .catch(() =>{
    res.status(500).json({ errorMessage: " Unable to delete the user"})
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  db.update(req.params.id, req.body)
  .then(() => {
    res.status(200).json(req.body)
  })
  .catch(() => {
    res.status(500).json({ message: "unable to update user" })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  db.getById(req.params.id)
  .then(user => {
    if(user){
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: 'invalid user id' })
    }
  })
  .catch(() => {
    res.status(500).json({ message: 'failed to validate user ID' })
  }); 
}

function validateUser(req, res, next) {
  // do your magic!
  const user = req.body;

  user === {} || !user 
  ? res.status(400).json({ message: 'missing user data '})
  : !user.name
  ? res.status(400).json({ message: "missing required text field "})
  :next();
}

function validatePost(req, res, next) {
  // do your magic!
  !req.body
  ? res.status(400).json({ message: "missing post data "})
  : req.body.text === '' || !req.body.text
  ? res.status(400).json({ message: "missing required text field" })
  : next();
}

module.exports = router;
