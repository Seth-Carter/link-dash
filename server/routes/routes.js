const BacklinksController = require('../controllers/backlinks_controllers')

module.exports = app => {

  app.get('/api', BacklinksController.greeting),

  app.post('/api/signup', BacklinksController.signup)

}