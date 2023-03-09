const router = require("express").Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction } = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reaction/:reactionId
router.route("/:thoughtId/reaction/:reactionId").post(addReaction).delete(removeReaction);


module.exports = router;
