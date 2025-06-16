// IMPORTS

const express = require("express");
const notFound = require("./middlewares/notFound");
const movieRouter = require("./routers/movieRouter");

// CONFIG
const app = express();
const port = 3000;

// MIDDLEWARES

app.use(express.json());

// ROUTES

app.use("/movies", movieRouter);

// ERROR HANDLER

app.use(notFound);

// LISTEN

app.listen(port, () => {
  console.log("Server collegato alla port: " + port);
});
