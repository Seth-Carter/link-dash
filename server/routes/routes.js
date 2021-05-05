const BacklinksController = require("../controllers/backlinks_controllers");
const UserController = require("../controllers/user_controllers.js");

module.exports = (app) => {
  app.get("/api", UserController.greeting);

  app.post("/api/user/signup", UserController.signup);

  app.post("/api/user/login", UserController.login);

  app.post("/api/backlink/new", BacklinksController.createBacklink);

  app.post("/api/backlink/fetch", BacklinksController.fetchBacklinks);

  app.post("/api/backlink/delete", BacklinksController.deleteBacklinks);

  app.post("/api/backlink/edit", BacklinksController.editBacklinks);
};
