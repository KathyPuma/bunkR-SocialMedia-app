const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users')
const authHelpers = require('../auth/helpers')
const passport = require('../auth/passport');
const { loginRequired } = require('../auth/helpers')

router.post("/signup", async (req, res, next) => {
  console.log('body', req.body)

  try {
    const passwordDigest = await authHelpers.hashPassword(req.body.password)

    const userInfo = {
      email: req.body.email,
      password: passwordDigest
    }

    let newUser = await userQueries.addNewUser(userInfo)
    res.json({
      payload: newUser,
      msg: "Success adding a new user",
      err: false
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      payload: null,
      msg: "Failure adding a new user",
      err: true
    })
  }
})

router.post("/login", passport.authenticate('local'), (req, res, next) => {
  console.log(req.body)
  res.json({
    payload: req.user,
    msg: "User successfully logged in",
    err: false
  })
})

router.get("/logout", loginRequired, (req, res, next) => {
  req.logOut()
  res.json({
    payload: null,
    msg: "User logged out successfully",
    err: false
  })
})

router.get("/isUserLoggedIn", loginRequired, (req, res) => {
  res.json({
    payload: req.email,
    msg: "User is logged in. Session active",
    err: false
  })
})

module.exports = router;
