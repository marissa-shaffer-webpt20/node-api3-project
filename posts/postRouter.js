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

router.get('/:postsID', validatePostId(), (req, res) => {
  res.status(200).json(req.newPost)
});

router.delete('/:postsID', (req, res) => {
  postsDb.remove(req.params.id)
  .then(() => {
    res.status(200).json("The post has been deleted")
  })
  .catch(err => {
    res.status(500).json({
      message: "Couldnt delete the post"
    })
  })
});

router.put('/:postsID', (req, res) => {
  if(!req.body.text){
    res.status(404).json({
      message: "Please enter the post to update"
    })
  } else {
    postsDb.update(req.params.id, {text: req.body.text})
    .then(() => {
      res.status(200).json("The post has been updated")
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Couldn't update the post, please try later"
      })
    })
  }
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
  postsDb.getById(req.params.id)
    .then((post) => {
      if(post) {
        req.newPost = post
        next()
      } else {
        res.status(404).json({
          message: "post not found"
        })
      }
    })
    .catch(next)
}
}

module.exports = router;
