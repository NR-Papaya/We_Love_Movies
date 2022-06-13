const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//------------MIDDLEWARE FUNCTIONS------------------
async function verifyMovieExists(req, res, next) {
    const movie = await service.read(Number(req.params.movieId));
    if (!movie) return next({ status: 404, message: "Movie not found" });
    res.locals.movie = movie;
    return next();
}
//------------CRUD FUNCTIONS------------------
async function list(req, res, next) {
    const is_showing = req.query.is_showing;
	if (is_showing){
        return next()
    }
	const movies = await service.list();
	res.json({ data: movies });
}

async function listShowing(req, res, next) {
	res.json({ data: await service.listShowing() });
}

async function read(req, res, next) {
    res.json({ data: res.locals.movie });
}

module.exports = {
	list: [asyncErrorBoundary(list),asyncErrorBoundary(listShowing)],
    read:[asyncErrorBoundary(verifyMovieExists),asyncErrorBoundary(read)],
};
