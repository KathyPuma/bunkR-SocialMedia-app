var express = require('express');
var router = express.Router();
const db = require('../database/db');
const { loginRequired } = require('../auth/helpers')
const usersQueries = require('../database/queries/users');


router.get('/', /*loginRequired, */ async (req, res, next) => {
  try {
    let users = await usersQueries.getAllUsers()
    res.json({
      payload: users,
      msg: "Retrieved all users",
      err: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      msg: "Failed retrieving all users",
      err: true
    })
  }
});




router.get("/email/:email/:password", async(req,res) =>{
  let email = req.params.email
  let password = req.params.password
  try{
    let response = await db.one('SELECT * FROM users WHERE email = $1 AND user_password = $2', [email, password])
    res.json({
      status: "success",
      body: response
    })
  }catch(error){
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
})

router.get("/profilepic/:id", async(req,res) => {
  let id = req.params.id
  try {
    let response = await db.any(`SELECT img_url FROM users WHERE id = $1`, id)
    res.json({
      status: "success",
      body: response
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Error: something went wrong"
    })
  }
})


router.put("/profilepic/:id",  async(req,res) => {
  let id = req.params.id
  try {
    await db.none('UPDATE users SET img_url = $1 WHERE id = $2', [req.body.imgUrl, id])
    res.json({
      body: req.body,
      message: 'Profile picture changed!'
    })
  } catch (error) {
    res.json({
      message:'There was an error!'
    })
  }
})


module.exports = router;