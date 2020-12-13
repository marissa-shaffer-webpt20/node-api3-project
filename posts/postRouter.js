const express = require('express')

const usersDb = require("../users/userDb")
const postsDb = require("./postDb")

const router = express.Router();

router.get('/', (req, res) => {
  postsDb.get()
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      message: "Could not get posts"
    })
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  posts.getById(req.params.id)
    .then((post) => {
      if(post) {
        req.post = post
        next()
      } else {
        res.status(404).json({
          message: "post not found"
        })
      }
    })
    .catch((error) => {
        next(error)
    })
}

module.exports = router;
