const connection = require("../data/db");

const index = (req, res) => {
  const movieSql = "SELECT * FROM movies";

  connection.query(movieSql, (err, results) => {
    if (err) return res.status(500).json({ message: "Internal error" });
    res.json({
      movies: results,
    });
  });
};

const show = (req, res) => {
  const { id } = req.params;
  const movieSql = "SELECT * FROM movies WHERE id = ?";

  connection.query(movieSql, [id], (err, results) => {
    if (err) return res.status(500).json({ message: "Internal error" });
    if (results.length === 0)
      return res.status(404).json({ message: "Movie not found" });
    const movie = results[0];

    const reviewSql = "SELECT reviews.* FROM reviews WHERE movie_id = ?";

    connection.query(reviewSql, [id], (err, results) => {
      if (err) return res.status(500).json({ message: "Internal error" });
      movie.reviews = results;

      res.json({
        data: movie,
      });
    });
  });
};

module.exports = { index, show };
