const router = require("express").Router();
const controller = require("./reviews.controller");
const cors = require("cors");
const methodNotAllowed = require("../errors/methodNotAllowed");

//routes for "/reviews"
router
	.route("/:reviewId")
	.all(cors())
	.delete( controller.delete)
	.put( controller.update)
	.all(methodNotAllowed);

module.exports = router;
