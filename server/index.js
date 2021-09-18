const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Route to get all posts
app.get("/api/getRolls", (req, res) => {
  db.query("SELECT * FROM rolls", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one post
app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the post
app.post("/api/createrolls", (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const number = req.body.number;
  const price = req.body.price;
  const weight = req.body.weight;
  const description = req.body.description;

  db.query(
    "INSERT INTO rolls (name, url, number, price, weight, description) VALUES (?,?,?,?,?,?)",
    [name, url, number, price, weight, description],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// Route to delete a post

app.get("/api/getrollsFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM rolls WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.delete("/api/deleterolls/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM rolls WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
