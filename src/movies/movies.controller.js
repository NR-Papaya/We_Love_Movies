const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//------------MIDDLEWARE FUNCTIONS------------------

//verifies that a movie exists by calling the service to perform a read operation
async function verifyMovieExists(req, res, next) {
	const movie = await service.read(Number(req.params.movieId));
	if (!movie) return next({ status: 404, message: "Movie not found" });
	res.locals.movie = movie;
	return next();
}
//------------CRUD FUNCTIONS------------------

//list all movies
async function list(req, res, next) {
	const is_showing = req.query.is_showing;
	if (is_showing) {
		return next();
	}
	const movies = await service.list();
	res.json({ data: movies });
}

//list movies showing in theaters
async function listShowing(req, res, next) {
	res.json({ data: await service.listShowing() });
}

//provides a movie based on the movieId parameter
function read(req, res, next) {
	res.json({ data: res.locals.movie });
}

//provides a list of theaters which are showing the given movie based on the movieId parameter
async function readTheatersWithMovie(req, res, next) {
	const movieId = Number(res.locals.movie.movie_id);
	res.json({ data: await service.readTheatersWithMovie(movieId) });
}

//provides a list of reviews for the given movie based on the movieId parameter
async function readMovieReviews(req, res, next) {
	const movieId = Number(res.locals.movie.movie_id);
	res.json({ data: await service.readMovieReviews(movieId) });
}

module.exports = {
	list: [asyncErrorBoundary(list), asyncErrorBoundary(listShowing)],
	read: [asyncErrorBoundary(verifyMovieExists), read],
	readMovieInTheaters: [
		asyncErrorBoundary(verifyMovieExists),
		asyncErrorBoundary(readTheatersWithMovie),
	],
	readMovieReviews: [
		asyncErrorBoundary(verifyMovieExists),
		asyncErrorBoundary(readMovieReviews),
	],
};
