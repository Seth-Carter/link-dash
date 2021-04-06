const BacklinksController = require('../controllers/backlinks_controllers')
const UserController = require('../controllers/user_controllers.js')
const { validate } = require('../models/user')

module.exports = (app) => {
  app.get('/api', UserController.greeting),
  
  app.post('/api/user/signup', UserController.signup),

  app.post('/api/user/login', UserController.login),

  app.post('/api/backlink/new', BacklinksController.createBacklink)

  //TODO: This route needs pagination 
  app.post('/api/backlink/fetch', BacklinksController.fetchBacklinks)
}
