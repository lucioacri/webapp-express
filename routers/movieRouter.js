const express = require("express");
const { index, show, postReview } = require("../controllers/movieController");
const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/:id/reviews", postReview);

module.exports = router;
