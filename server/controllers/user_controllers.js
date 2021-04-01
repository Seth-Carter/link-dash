const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = {

  greeting(req, res) {
    res.send({ message: "What's up, man?" })
  },

  signup(req, res) {
    const saltRounds = 10

    User.findOne({ email: req.body.email })
      .then((existingUser) => {
        if (existingUser) {
          return res
            .status(409)
            .send(
              `${existingUser.email} is taken. Choose a different email address!`
            )
        } else {
          let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          })
          bcrypt
            .hash(user.password, saltRounds)
            .then((hash) => {
              user.password = hash
              user.save().then((newUser) => res.send(newUser))
            })
            .catch((err) => res.status(422).send({ error: err.message }))
        }
      })
      .catch((err) => console.error(err))
  },

  login(req, res) {
    let userData = {}
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .send(
              `${req.body.email} is not associated with any registered account.`
            )
        }
        userData.user = user
        return bcrypt.compare(req.body.password, user.password)
      })
      .then((validPassword) => {
        if (!validPassword) {
          return res
            .status(401)
            .send('The email or password entered is incorrect.')
        }
        const token = jwt.sign(
          { _id: userData.user._id },
          config.get('PrivateKey')
        )
        res.header('Authorization', `Bearer ${token}`).send({
          _id: userData.user._id,
          name: userData.user.name,
          email: userData.user.email
        })
      })
      .catch((err) => console.error(err))
  }
}
