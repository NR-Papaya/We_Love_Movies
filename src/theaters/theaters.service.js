const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

//------------HELPER FUNCTIONS------------------

//reduce properties function adds the movies key to the theater object and takes in a configuration object
const addMovies = reduceProperties("theater_id", {
	title: ["movies", null, "title"],
	rating: ["movies", null, "rating"],
	runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
});

//------------CRUD FUNCTIONS------------------

//lists all theaters with movies currently showing
async function list() {
	return knex("theaters as t")
		.join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
		.join("movies as m", "m.movie_id", "mt.movie_id")
		.select("t.*", "m.title", "m.rating", "m.runtime_in_minutes")
		.where("mt.is_showing", true)
		.andWhere(knex.raw("m.movie_id = mt.movie_id"))
		.andWhere(knex.raw("mt.theater_id = t.theater_id"))
		.groupBy("mt.is_showing", "t.theater_id", "m.movie_id")
		.then((data) => addMovies(data));
}

module.exports = {
	list,
};
