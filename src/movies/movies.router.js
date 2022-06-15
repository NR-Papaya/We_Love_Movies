const controller = require("./movies.controller");
const cors = require("cors");
const methodNotAllowed = require("../errors/methodNotAllowed");
const router = require("express").Router();

//routes for "/movies"
router.route("/").all(cors()).get(controller.list).all(methodNotAllowed);
router.route("/:movieId").all(cors()).get(controller.read).all(methodNotAllowed);
router
	.route("/:movieId/theaters")
	.all(cors())
	.get(controller.readMovieInTheaters)
	.all(methodNotAllowed);
router
	.route("/:movieId/reviews")
	.all(cors())
	.get(controller.readMovieReviews)
	.all(methodNotAllowed);

module.exports = router;
