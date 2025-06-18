// IMPORTS

const express = require("express");
const notFound = require("./middlewares/notFound");
const movieRouter = require("./routers/movieRouter");
const cors = require("cors");

// CONFIG
const app = express();
const port = 3000;
const corsConfig = {
  origin: "http://localhost:5173",
};

// MIDDLEWARES

app.use(express.json());
app.use(express.static("public"));
app.use(cors(corsConfig));

// ROUTES

app.use("/movies", movieRouter);

// ERROR HANDLER

app.use(notFound);

// LISTEN

app.listen(port, () => {
  console.log("Server collegato alla port: " + port);
});
