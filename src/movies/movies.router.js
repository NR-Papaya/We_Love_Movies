const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const router = require("express").Router();

//routes for "/movies"
router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router
	.route("/:movieId/theaters")
	.get(controller.readMovieInTheaters)
	.all(methodNotAllowed);
router
	.route("/:movieId/reviews")
	.get(controller.readMovieReviews)
	.all(methodNotAllowed);

module.exports = router;
