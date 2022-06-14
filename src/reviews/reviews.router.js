const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
	.route("/:review_id")
	.delete(controller.delete)
	.update(controller.update)
	.all(methodNotAllowed);

module.exports = router;
