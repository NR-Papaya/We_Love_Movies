const router = require("express").Router();
const controller = require("./theaters.controller");
const cors = require("cors");
const methodNotAllowed = require("../errors/methodNotAllowed");

//routes for "/theaters"
router.route("/").all(cors()).get(controller.list).all(methodNotAllowed);

module.exports = router;
