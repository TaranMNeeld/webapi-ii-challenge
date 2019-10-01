const express = require('express');

const db = require('./db.js');

const router = express.Router();

router.post('/', (req, res) => {
  const postData = req.body;
  if (!postData.title || !postData.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  } else {
    db.insert(postData)
      .then(post => {
        res.status(201).json({ message: `Posted: ${postData.title}` });
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
      });
  }
});

router.post('/:id/comments', (req, res) => {
  const commentData = req.body;
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The post with the specified ID does not exist." });
  } else if (!commentData.text) {
    res.status(400).json({ errorMessage: "Please provide text for the comment." });
  } else {
    db.findById(id)
      .then(post => {
        res.status(201).json({ message: `Commented: ${commentData.text}` });
      })
      .catch(err => {
        res.status(500).json({ error: "There was an error while saving the comment to the database" });
      });
  }
});

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The post with the specified ID does not exist." });
  } else {
    db.findById(id)
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
      });
  }
});

router.get('/:id/comments', (req, res) => {
  const commentData = req.body;
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The post with the specified ID does not exist." });
  } else {
    db.findById(id)
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({ error: "The comments information could not be retrieved." });
      });
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The post with the specified ID does not exist." });
  } else {
    db.remove(id)
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        res.status(500).json({ error: "The post could not be removed" });
      });
  }
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!id) {
    res.status(404).json({ message: "The post with the specified ID does not exist." });
  } else if (!changes.title || !changes.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  } else {
    db.update(id, changes)
      .then(post => {
        res.status(200).json({ message: `Updated ${changes.title}` });
      })
      .catch(err => {
        res.status(500).json({ error: "The post information could not be modified." });
      });
  }
})

// export default router;
module.exports = router;
