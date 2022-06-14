const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

//routes for "/reviews"
router
	.route("/:reviewId")
	.delete(controller.delete)
	.put(controller.update)
	.all(methodNotAllowed);

module.exports = router;
