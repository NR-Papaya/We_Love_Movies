const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
//-----LIST-----
function list() {
	return knex("movies").select("*");
}

function listShowing() {
	return knex("movies as m")
		.join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
		.select("m.*")
		.where("mt.is_showing", true)
		.groupBy("m.movie_id");
}
//-----READ-----
function read(movieId) {
	return knex("movies").select("*").where("movie_id", movieId).first();
}

function readTheatersWithMovie(movieId) {
	return knex("theaters as t")
		.join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
		.select("t.*", "mt.is_showing", "mt.movie_id")
		.where("mt.movie_id", movieId)
		.andWhere("mt.is_showing", true)
		.groupBy("mt.is_showing", "t.theater_id","mt.movie_id");
}

function readMovieReviews(movieId) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*","c.*")
        .where("r.movie_id", movieId)
        .andWhere(knex.raw("r.critic_id = c.critic_id"))
        .groupBy("r.review_id","c.critic_id");
}


module.exports = {
	list,
	listShowing,
	read,
	readTheatersWithMovie,
    readMovieReviews
};
