const { request } = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = {
  greeting(req, res) {
    res.send({ message: "Test message" })
  },
  signup(req, res) {
    
    const saltRounds = 10

    User.findOne({ email: req.body.email})
      .then(existingUser => {
        if(existingUser) {
          return res.status(409).send(`${existingUser.email} is taken. Choose a different email address!`)
        } else {
          let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          })
          bcrypt.hash(user.password, saltRounds)
            .then(hash => {
              user.password = hash
              user.save()
                .then((newUser) => res.send(newUser))
            })
            .catch(err => res.status(422).send({ error: err.message }))
        }
      })
      .catch(err => console.error(err))

  }
}