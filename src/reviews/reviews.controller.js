const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");

//------------MIDDLEWARE FUNCTIONS------------------

//verifies that a review exists by calling the service to perform a read operation
async function verifyReviewExists(req, res, next) {
	const reviewId = Number(req.params.reviewId);
	const review = await service.read(reviewId);
	if (review) {
		res.locals.review = review;
		return next();
	}
	res.status(404).json({ error: "Review cannot be found" });
}

//------------CRUD FUNCTIONS------------------

//removes the review from the database by reviewId
async function destroy(req, res, next) {
	const reviewId = res.locals.review.review_id;
	await service.delete(reviewId);
	res.sendStatus(204);
}

/*
 * Updates the review in the database by reviewId
 * Reads the review to to verify and provide a json response
 * calls the service.readCritic to modify the review object to include critic information
 */
async function update(req, res, next) {
	const updatedReview = { ...res.locals.review, ...req.body.data };
	await service.update(updatedReview);
	const data = await service.read(updatedReview.review_id);
	data["critic"] = await service.readCritic(data.critic_id);
	res.json({ data });
}

module.exports = {
	delete: [
		asyncErrorBoundary(verifyReviewExists),
		asyncErrorBoundary(destroy),
	],
	update: [
		asyncErrorBoundary(verifyReviewExists),
		asyncErrorBoundary(update),
	],
};
