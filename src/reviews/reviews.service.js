const knex = require("../db/connection");

//-----------------HELPER FUNCTIONS------------------
//returns a critic object to be used with reviews.controller.update function to update the review object
function readCritic(critic_id) {
    return knex("critics")
        .select("*")
        .where("critic_id", Number(critic_id))
        .first();
}
//-----------------CRUD FUNCTIONS------------------

//Verifies that the review exists in the database by reviewId
function read(reviewId) {
	return knex("reviews")
		.select("*")
		.where("review_id", Number(reviewId))
		.first();
}
//removes the review from the database by reviewId
function destroy(reviewId) {
	return knex("reviews").where("review_id", reviewId).del();
}

//updates the review in the database by reviewId
async function update(updatedReview) {
	return knex("reviews")
		.select("*")
		.where("review_id", updatedReview.review_id)
		.update(updatedReview);
}

module.exports = {
	read,
	delete: destroy,
	update,
    readCritic
};
