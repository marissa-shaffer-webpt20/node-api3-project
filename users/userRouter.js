const express = require('express');
const usersDb = require("./userDb")
const postsDb = require("../posts/postDb")

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  res.status(200).json(req.newUser)
});

router.post('/:usersID/posts', validatePost(), (req, res) => {
  res.status(200).json(req.newPost)
});

router.get('/', (req, res) => {
  usersDb.get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(next)
});

router.get('/:usersID', validateUserId(), (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:usersID/posts', validateUserId(), (req, res) => {
  usersDb.getUserPosts(req.params.id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(next)
});

router.delete('/:usersID', validateUserId(), (req, res) => {
  usersDb.remove(req.params.id)
  .then(() => {
    res.status(200).json({
      message: "The user has been deleted"
    })
  })
  .catch(next)
});

router.put('/:usersID', validateUserId(), (req, res) => {
  if(!req.body.name){
    res.status(404).json({
      message: "Please enter the name"
    })
  } else {
    usersDb.update(req.params.id, {name: req.body.name})
    .then(user => {
      res.status(200).json("You have updated the user")
    })
    .catch(next)
  }
});

//custom middleware

function validateUserId() {
  return (req, res, next) => {
    usersDb.getById(req.params.id)
      .then((user) => {
        if(user) {
          req.user = user
          next()
        } else {
          res.status(404).json({
            message: "User not found"
          })
        }
      })
      .catch(next)
  }
}

function validateUser() {
  return (req,res,next) => {
    if(!req.body.name){
      return res.status(400).json({
        message:"missing user data"
      })
    } else {
      usersDb.insert({ name: req.body.name})
      .then(user => {
        req.newUser = user
        next()
      })
      .catch(next)
    }
  }
}

function validatePost() {
  return (req, res, next) => {
    if(!req.body.text){
      res.status(400).json({
        message: "missing require text field in body"
      })
    } else {
      usersDb.getById(req.params.id)
      .then(user =>{
        postsDb.insert({ text: req.body.text, user_id: req.params.id})
        .then(post =>{
          req.newPost = post
          next()
        })
      })
      .catch(next)
    }
  }
}

module.exports = router;
