const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const db = require("./models");

const PORT = process.env.PORT || 8000;
const DB_URI = process.env.MONGODB_URI || "mongodb://localhost/recipes";

const mongooseOptions = {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
};

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(DB_URI, mongooseOptions);

app.get("/search", async (req, res) => {
  const { searchTerm } = req.query;
  const data = await db.Recipe.find({ ingredients: searchTerm });
  res.json(data);
});

app.get("/recipes", async (req, res) => {
  const data = await db.Recipe.find({});
  res.json(data);
});

app.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const data = await db.Recipe.findById(id);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
