const mapProperties = require("../utils/map-properties");
const knex = require("../db/connection");

//------------HELPER FUNCTIONS-------------

const addCritic = mapProperties({
	"c:critic_id": "critic.critic_id",
	preferred_name: "critic.preferred_name",
	surname: "critic.surname",
	organization_name: "critic.organization_name",
	"c:created": "critic.created_at",
	"c:updated": "critic.updated_at",
});

//-------------CRUD FUNCTIONS-------------

//lists all movies
function list() {
	return knex("movies").select("*");
}

//lists all movies which are showing in theaters
function listShowing() {
	return knex("movies as m")
		.join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
		.select("m.*")
		.where("mt.is_showing", true)
		.groupBy("m.movie_id");
}

//find a specific movie based on the movieId
function read(movieId) {
	return knex("movies").select("*").where("movie_id", movieId).first();
}

//provides a list of theaters which are showing the given movie based on the movieId
function readTheatersWithMovie(movieId) {
	return knex("theaters as t")
		.join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
		.select("t.*", "mt.is_showing", "mt.movie_id")
		.where("mt.movie_id", movieId)
		.andWhere("mt.is_showing", true)
		.groupBy("mt.is_showing", "t.theater_id", "mt.movie_id");
}

//provides a list of reviews for the given movie with the critic attached
function readMovieReviews(movieId) {
	return knex("reviews as r")
		.join("critics as c", "c.critic_id", "r.critic_id")
		.select(
			"r.*",
			"c.critic_id as c:critic_id",
			"c.preferred_name",
			"c.surname",
			"c.organization_name",
			"c.created_at as c:created",
			"c.updated_at as c:updated"
		)
		.where("r.movie_id", movieId)
		.andWhere(knex.raw("r.critic_id = c.critic_id"))
		.groupBy("r.review_id", "c.critic_id")
		.then((data) => data.map((review) => addCritic(review)));
}

module.exports = {
	list,
	listShowing,
	read,
	readTheatersWithMovie,
	readMovieReviews,
};
