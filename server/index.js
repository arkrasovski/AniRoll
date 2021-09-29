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
        res.send(error);
        return;
      }
      console.log(result);
      res.send(result);
    }
  );
});

//Route to change a post

app.post("/api/changerollsFromId/:id", (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const number = req.body.number;
  const price = req.body.price;
  const weight = req.body.weight;
  const description = req.body.description;
  const id = req.body.id;

  db.query(
    "UPDATE rolls SET name = ?, url = ? , number = ? , price = ?, weight = ?, description = ? WHERE id = ?",
    [name, url, number, price, weight, description, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(error);
        return;
      }
      console.log(result);
      res.send(result);
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
    {
      if (err) {
        console.log(err);
        res.send(error);
        return;
      }
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/api/getdrinks", (req, res) => {
  db.query("SELECT * FROM drinks", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one post

// Route for creating the post
app.post("/api/createdrinks", (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const number = req.body.number;
  const price = req.body.price;
  const weight = req.body.weight;
  const description = req.body.description;

  db.query(
    "INSERT INTO drinks (name, url, number, price, weight, description) VALUES (?,?,?,?,?,?)",
    [name, url, number, price, weight, description],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(error);
        return;
      }
      console.log(result);
      res.send(result);
    }
  );
});

// Route to delete a post

app.get("/api/getdrinksFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM drinks WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/api/changedrinksFromId/:id", (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const number = req.body.number;
  const price = req.body.price;
  const weight = req.body.weight;
  const description = req.body.description;
  const id = req.body.id;

  db.query(
    "UPDATE drinks SET name = ?, url = ? , number = ? , price = ?, weight = ?, description = ? WHERE id = ?",
    [name, url, number, price, weight, description, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(error);
        return;
      }
      console.log(result);
      res.send(result);
    }
  );
});

app.delete("/api/deletedrinks/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM drinks WHERE id= ?", id, (err, result) => {
    {
      if (err) {
        console.log(err);
        res.send(error);
        return;
      }
      console.log(result);
      res.send(result);
    }
  });
});

//Create order

app.post("/api/addOrder", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const telNumber = req.body.telNumber;
  const orderText = req.body.orderText;

  db.query(
    "INSERT INTO orders (client, address, telNumber, orderText) VALUES (?,?,?,?)",
    [name, address, telNumber, orderText],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send(error);
        return;
      }
      console.log(result);
      res.send(result);
    }
  );
  // .then((response) => {
  //   res.status(200).send(response);
  // })
  // .catch((error) => {
  //   res.status(400).send(error);
  // });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
