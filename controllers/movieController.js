const connection = require("../data/db");

const index = (req, res) => {
  const movieSql = "SELECT * FROM movies";

  connection.query(movieSql, (err, results) => {
    if (err) return res.status(500).json({ message: "Internal error" });

    const movies = results.map((movie) => {
      movie.image = "http://localhost:3000/movies_cover/" + movie.image;
      return movie;
    });

    res.json({
      movies,
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

    movie.image = "http://localhost:3000/movies_cover/" + movie.image;

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

const postReview = (req, res) => {
  const { id } = req.params;
  const { name, vote, text } = req.body;

  const newReviewSql = `INSERT INTO movies.reviews
  (movie_id, name, vote, text) VALUES (?, ?, ?, ?);
  `;

  const saveReviewValues = [id, name, vote, text];

  connection.query(newReviewSql, saveReviewValues, (err, results) => {
    if (err) return res.status(500).json({ message: "Internal error" });
    return res.json({
      message: "Review added!",
      reviewId: results.insertId,
    });
  });
};

const createMovie = (req, res) => {
  const { title, abstract, image, genre, director, release_year } = req.body;

  const newMovieSql = `
    INSERT INTO movies.movies (title, abstract, image, genre, director, release_year)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const newMovieValues = [
    title,
    abstract,
    image,
    genre,
    director,
    release_year,
  ];

  connection.query(newMovieSql, newMovieValues, (err, results) => {
    if (err) return res.status(500).json({ message: "Internal error" });
    return res.json({
      message: "New film added!",
      newFilmId: results.insertId,
    });
  });
};

module.exports = { index, show, postReview, createMovie };
