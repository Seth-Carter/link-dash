const BacklinksController = require("../controllers/backlinks_controllers");
const UserController = require("../controllers/user_controllers");
const auth = require("../middleware/user_middleware");

module.exports = (app) => {
  app.get("/api", UserController.greeting);

  app.post("/api/user/signup", UserController.signup);

  app.post("/api/user/login", UserController.login);

  app.post("/api/backlink/new", auth, BacklinksController.createBacklink);

  app.post("/api/backlink/fetch", auth, BacklinksController.fetchBacklinks);

  app.post("/api/backlink/delete", auth, BacklinksController.deleteBacklinks);

  app.post("/api/backlink/edit", auth, BacklinksController.editBacklinks);
};
