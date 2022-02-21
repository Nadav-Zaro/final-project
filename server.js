const express = require("express");
require("dotenv").config()
const app = express();
const {getUser,addUser,updateUser,getUserByEmail,addGame,updateGame,addBaller,
  removeBaller,addUserPost,deleteGame,deleteUserPost,sendMessage,updateMessage} = require("./utils/userFunctions")
  const {showPosts,getPostByEmail,addPost,updatePost,deletePost,updateBall,addComment,updateComment,deleteComment} = require("./utils/postsFunctions")
  const {getGames} = require("./utils/getGames")
  const {getTeamsStanding} = require("./utils/getTeamsStanding")
  app.use(express.json()); 
  const favicon = require('express-favicon')
  app.use(favicon(__dirname + '/client/public/favicon.png'))
// getTeamsStanding()
// setInterval(() => {
  // getGames()
// }, 1,000,000);

// user  
app.get("/UserDetails", (req, res) => {
  getUser(res)
});

app.get("/UserDetails/:id", (req,res)=>{
  getUserByEmail(req,res)
})
 
app.post("/UserDetails", (req, res) => {
  console.log("root is accessed");
  addUser(req,res)
});

app.patch("/updateUser/:email", (req, res) => {
  updateUser(req,res)
}); 

app.patch("/addGame/:id", (req, res) => {
  addGame(req,res)
});

app.patch("/updateGame/:id", (req, res) => {
  updateGame(req,res)
});

app.patch("/deleteGame/:id", (req, res) => {
  deleteGame(req,res)
});

app.patch("/addBaller/:id", (req, res) => {
  addBaller(req,res)
});

app.patch("/removeBaller/:id", (req, res) => {
  removeBaller(req,res)
});

app.patch("/userPosts/:id", (req, res) => {
  addUserPost(req,res)
});

app.patch("/deleteUserPosts/:id", (req, res) => {
  deleteUserPost(req,res)
});

app.patch("/sendMessage/:id", (req, res) => {
  sendMessage(req,res)
});

app.patch("/updateMessage/:id", (req, res) => {
  updateMessage(req,res)
});

// posts
app.get("/posts", (req,res) => {
  showPosts(req,res)
});

app.get("/posts/:email", (req,res)=>{
  getPostByEmail(req,res)
})

app.post("/addPost" ,(req,res)=>{
  addPost(req,res)
})

app.patch("/editPost/:id", (req, res) => {
  updatePost(req,res)
});

app.delete("/deletePost/:id", (req, res) => {
  deletePost(req,res)
});

app.patch("/updateBall/:id", (req, res) => {
  updateBall(req,res)
});

app.patch("/addComment/:id", (req, res) => {
  addComment(req,res)
});

app.patch("/updateComment/:id", (req, res) => {
  updateComment(req,res)
});

app.patch("/deleteComment/:id", (req, res) => {
  deleteComment(req,res)
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
