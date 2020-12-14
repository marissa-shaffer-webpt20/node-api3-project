const express = require("express")
const cors = require("cors")
const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")

const server = express()
const port = process.env.PORT || 5000

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

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})