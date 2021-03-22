const User = require('../models/user')

module.exports = {
  greeting(req, res) {
    res.send({ message: "Test message" })
  },
  signup(req, res) {
    User.findOne({ email: req.body.email})
      .then(existingUser => {
        if(existingUser) {
          return res.status(409).send(`${existingUser.email} already exists. Choose a different email address!`)
        } else {
          User.create(req.body)
          .then(newUser => res.send(newUser))
          .catch(err => res.status(422).send({ error: err.message }))
        }
      })
      .catch(err => console.error(err))

  }
}