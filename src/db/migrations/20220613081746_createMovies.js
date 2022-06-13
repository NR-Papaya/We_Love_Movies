exports.up = function (knex) {
	return knex.schema.createTable("movies", (table) => {
		table.increments("movie_id").primary();
		table.string("title",1000);
		table.integer("runtime_in_minutes");
		table.string("rating",1000);
		table.string("description", 5000);
		table.string("image_url", 1000);
		table.timestamps(true, true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("movies");
};
