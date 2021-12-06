const express = require("express");
const db = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Route to get all posts
app.get("/api/getRolls", (req, res) => {
  // db.query("SELECT * FROM rolls", (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.send(result);
  // });
  const resultsPerPage = 8;
  let sql = "SELECT * FROM rolls";
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const numOfResults = result.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;
      if (page > numberOfPages) {
        res.send({ max: numOfResults, elements: [] });
        return;
        //res.redirect("/api/getRolls/?page=" + encodeURIComponent(numberOfPages));
      } else if (page < 1) {
        res.redirect("/api/getRolls/?page=" + encodeURIComponent("1"));
      }
      //Determine the SQL LIMIT starting number
      const startingLimit = (page - 1) * resultsPerPage;
      //Get the relevant number of POSTS for this starting page
      sql = `SELECT * FROM rolls LIMIT ${startingLimit},${resultsPerPage}`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.send({ max: numOfResults, elements: result });
      });
    } else {
      res.send({ max: 0, elements: [] });
    }
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
  const measure = req.body.measure;
  const description = req.body.description;

  db.query(
    "INSERT INTO rolls (name, url, number, price, weight, measure, description) VALUES (?,?,?,?,?,?,?)",
    [name, url, number, price, weight, measure, description],
    (err, result) => {
      if (err) {
        console.log("error", err);
        throw err;
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
  const measure = req.body.measure;
  const description = req.body.description;
  const id = req.body.id;

  db.query("SELECT * FROM rolls WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    if (result.length > 0) {
      db.query(
        "UPDATE rolls SET name = ?, url = ? , number = ? , price = ?, weight = ?, measure = ?, description = ? WHERE id = ?",
        [name, url, number, price, weight, measure, description, id],
        (err, result) => {
          if (err) {
            console.log("error", err);
            throw err;
          }
          res.send(result);
        }
      );
    } else {
      res.status(404).send("something broke");
    }
  });
});

// Route to delete a post

app.get("/api/getrollsFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM rolls WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    res.send(result);
  });
});

app.delete("/api/deleterolls/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM rolls WHERE id= ?", id, (err, result) => {
    {
      if (err) {
        console.log("error", err);
        throw err;
      }
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/api/getdrinks", (req, res) => {
  // db.query("SELECT * FROM drinks", (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.send(result);
  // });
  const resultsPerPage = 8;
  let sql = "SELECT * FROM drinks";
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const numOfResults = result.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;
      if (page > numberOfPages) {
        //res.redirect("/api/getdrinks/?page=" + encodeURIComponent(numberOfPages));
        res.send({ max: numOfResults, elements: [] });
        return;
      } else if (page < 1) {
        res.redirect("/api/getdrinks/?page=" + encodeURIComponent("1"));
      }
      //Determine the SQL LIMIT starting number
      const startingLimit = (page - 1) * resultsPerPage;
      //Get the relevant number of POSTS for this starting page
      sql = `SELECT * FROM drinks LIMIT ${startingLimit},${resultsPerPage}`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.send({ max: numOfResults, elements: result });
      });
    } else {
      res.send({ max: 0, elements: [] });
    }
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
  const measure = req.body.measure;
  const description = req.body.description;

  db.query(
    "INSERT INTO drinks (name, url, number, price, weight, measure, description) VALUES (?,?,?,?,?,?,?)",
    [name, url, number, price, weight, measure, description],
    (err, result) => {
      if (err) {
        console.log("error", err);
        throw err;
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
      console.log("error", err);
      throw err;
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
  const measure = req.body.measure;
  const description = req.body.description;
  const id = req.body.id;

  db.query("SELECT * FROM drinks WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    if (result.length > 0) {
      db.query(
        "UPDATE drinks SET name = ?, url = ? , number = ? , price = ?, weight = ?, measure = ?, description = ? WHERE id = ?",
        [name, url, number, price, weight, measure, description, id],
        (err, result) => {
          if (err) {
            console.log("error", err);
            throw err;
          }
          res.send(result);
        }
      );
    } else {
      res.status(404).send("something broke");
    }
  });
});

app.delete("/api/deletedrinks/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM drinks WHERE id= ?", id, (err, result) => {
    {
      if (err) {
        console.log("error", err);
        throw err;
      }
      console.log(result);
      res.send(result);
    }
  });
});

//create sushi
app.get("/api/getsushi", (req, res) => {
  // db.query("SELECT * FROM sushi", (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.send(result);
  // });
  const resultsPerPage = 8;
  let sql = "SELECT * FROM sushi";
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const numOfResults = result.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;
      if (page > numberOfPages) {
        //res.redirect("/api/getsushi/?page=" + encodeURIComponent(numberOfPages));
        res.send({ max: numOfResults, elements: [] });
      } else if (page < 1) {
        res.redirect("/api/getsushi/?page=" + encodeURIComponent("1"));
      }
      //Determine the SQL LIMIT starting number
      const startingLimit = (page - 1) * resultsPerPage;
      //Get the relevant number of POSTS for this starting page
      sql = `SELECT * FROM sushi LIMIT ${startingLimit},${resultsPerPage}`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.send({ max: numOfResults, elements: result });
      });
    } else {
      res.send({ max: 0, elements: [] });
    }
  });
});

// Route to get one post

// Route for creating the post
app.post("/api/createsushi", (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const number = req.body.number;
  const price = req.body.price;
  const weight = req.body.weight;
  const measure = req.body.measure;
  const description = req.body.description;

  db.query(
    "INSERT INTO sushi (name, url, number, price, weight, measure, description) VALUES (?,?,?,?,?,?,?)",
    [name, url, number, price, weight, measure, description],
    (err, result) => {
      if (err) {
        console.log("error", err);
        throw err;
      }
      console.log(result);
      res.send(result);
    }
  );
});

// Route to delete a post

app.get("/api/getsushiFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM sushi WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    res.send(result);
  });
});

app.post("/api/changesushiFromId/:id", (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const number = req.body.number;
  const price = req.body.price;
  const weight = req.body.weight;
  const measure = req.body.measure;
  const description = req.body.description;
  const id = req.body.id;

  db.query("SELECT * FROM sushi WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    if (result.length > 0) {
      db.query(
        "UPDATE sushi SET name = ?, url = ? , number = ? , price = ?, weight = ?, measure = ?, description = ? WHERE id = ?",
        [name, url, number, price, weight, measure, description, id],
        (err, result) => {
          if (err) {
            console.log("error", err);
            throw err;
          }
          res.send(result);
        }
      );
    } else {
      res.status(404).send("something broke");
    }
  });
});

app.delete("/api/deletesushi/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM sushi WHERE id= ?", id, (err, result) => {
    {
      if (err) {
        console.log("error", err);
        throw err;
      }
      console.log(result);
      res.send(result);
    }
  });
});

//sets
app.get("/api/getsets", (req, res) => {
  // db.query("SELECT * FROM sets", (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.send(result);
  // });
  const resultsPerPage = 8;
  let sql = "SELECT * FROM sets";
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const numOfResults = result.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;
      if (page > numberOfPages) {
        res.send({ max: numOfResults, elements: [] });
        //res.redirect("/api/getsets/?page=" + encodeURIComponent(numberOfPages));
      } else if (page < 1) {
        res.redirect("/api/getsets/?page=" + encodeURIComponent("1"));
      }
      //Determine the SQL LIMIT starting number
      const startingLimit = (page - 1) * resultsPerPage;
      //Get the relevant number of POSTS for this starting page
      sql = `SELECT * FROM sets LIMIT ${startingLimit},${resultsPerPage}`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.send({ max: numOfResults, elements: result });
      });
    } else {
      res.send({ max: 0, elements: [] });
    }
  });
});

// Route for creating the card
app.post("/api/createsets", (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const number = req.body.number;
  const price = req.body.price;
  const weight = req.body.weight;
  const measure = req.body.measure;
  const description = req.body.description;

  db.query(
    "INSERT INTO sets (name, url, number, price, weight, measure, description) VALUES (?,?,?,?,?,?,?)",
    [name, url, number, price, weight, measure, description],
    (err, result) => {
      if (err) {
        console.log("error", err);
        throw err;
      }
      console.log(result);
      res.send(result);
    }
  );
});

// Route to delete a card

app.get("/api/getsetsFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM sets WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    res.send(result);
  });
});

app.post("/api/changesetsFromId/:id", (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const number = req.body.number;
  const price = req.body.price;
  const weight = req.body.weight;
  const measure = req.body.measure;
  const description = req.body.description;
  const id = req.body.id;

  db.query("SELECT * FROM sets WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    if (result.length > 0) {
      db.query(
        "UPDATE sets SET name = ?, url = ? , number = ? , price = ?, weight = ?, measure = ?, description = ? WHERE id = ?",
        [name, url, number, price, weight, measure, description, id],
        (err, result) => {
          if (err) {
            console.log("error", err);
            throw err;
          }
          res.send(result);
        }
      );
    } else {
      res.status(404).send("something broke");
    }
  });
});

app.delete("/api/deletesets/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM sets WHERE id= ?", id, (err, result) => {
    {
      if (err) {
        console.log("error", err);
        throw err;
      }
      console.log(result);
      res.send(result);
    }
  });
});

//sauces
app.get("/api/getsauces", (req, res) => {
  // db.query("SELECT * FROM sauces", (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.send(result);
  // });
  const resultsPerPage = 8;
  let sql = "SELECT * FROM sauces";
  db.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      const numOfResults = result.length;
      const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
      let page = req.query.page ? Number(req.query.page) : 1;
      if (page > numberOfPages) {
        res.send({ max: numOfResults, elements: [] });
        //res.redirect("/api/getsauces/?page=" + encodeURIComponent(numberOfPages));
      } else if (page < 1) {
        res.redirect("/api/getsauces/?page=" + encodeURIComponent("1"));
      }
      //Determine the SQL LIMIT starting number
      const startingLimit = (page - 1) * resultsPerPage;
      //Get the relevant number of POSTS for this starting page
      sql = `SELECT * FROM sauces LIMIT ${startingLimit},${resultsPerPage}`;
      db.query(sql, (err, result) => {
        if (err) throw err;
        res.send({ max: numOfResults, elements: result });
      });
    } else {
      res.send({ max: 0, elements: [] });
    }
  });
});

// Route for creating the card
app.post("/api/createsauces", (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const number = req.body.number;
  const price = req.body.price;
  const weight = req.body.weight;
  const measure = req.body.measure;
  const description = req.body.description;

  db.query(
    "INSERT INTO sauces (name, url, number, price, weight, measure, description) VALUES (?,?,?,?,?,?,?)",
    [name, url, number, price, weight, measure, description],
    (err, result) => {
      if (err) {
        console.log("error", err);
        throw err;
      }
      console.log(result);
      res.send(result);
    }
  );
});

// Route to delete a card

app.get("/api/getsaucesFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM sauces WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    res.send(result);
  });
});

app.post("/api/changesaucesFromId/:id", (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const number = req.body.number;
  const price = req.body.price;
  const weight = req.body.weight;
  const measure = req.body.measure;
  const description = req.body.description;
  const id = req.body.id;

  db.query("SELECT * FROM sauces WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    if (result.length > 0) {
      db.query(
        "UPDATE sauces SET name = ?, url = ? , number = ? , price = ?, weight = ?, measure = ?, description = ? WHERE id = ?",
        [name, url, number, price, weight, measure, description, id],
        (err, result) => {
          if (err) {
            console.log("error", err);
            throw err;
          }
          res.send(result);
        }
      );
    } else {
      res.status(404).send("something broke");
    }
  });
});

app.delete("/api/deletesauces/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM sauces WHERE id= ?", id, (err, result) => {
    {
      if (err) {
        console.log("error", err);
        throw err;
      }
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/api/lastOrder", (req, res) => {
  db.query("SELECT MAX(id) as ID from orders", (err, result) => {
    if (err) {
      console.log("error", err);
      throw err;
    }
    console.log(result);
    res.send(result);
  });
});

//Create order

app.post("/api/addOrder", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const telNumber = req.body.telNumber;
  const orderText = req.body.orderText;
  const total = req.body.total;
  const deliveryDate = req.body.deliveryDate;

  db.query(
    "INSERT INTO orders (client, address, telNumber, orderText, total, deliveryDate) VALUES (?,?,?,?,?,?)",
    [name, address, telNumber, orderText, total, deliveryDate],
    (err, result) => {
      if (err) {
        console.log("error", err);
        throw err;
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
