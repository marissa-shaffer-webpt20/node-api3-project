const express = require('express');
const cors = require("cors")

const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")

const server = express()

server.use(express.json())
server.use(cors())

server.use("/users", userRouter)
server.use("/users/:usersID/posts", postRouter)
server.use(logger("long"))

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
      message: "Error"
  })
})

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
