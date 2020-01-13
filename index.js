// implement your API here
const express = require("express");
const cors = require("cors");

const { find, findById, insert, update, remove } = require("./data/db");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  insert(newUser)
    .then(data => {
      if (newUser.name && newUser.bio) {
        res.status(201).json(data);
      } else {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      }
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

app.get("/api/users", (req, res) => {
  find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(404)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  remove(id)
    .then(data => {
      if (data) {
        res.json({ message: `User with id:${id} deleted successfully` });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

app.listen(5000, () => {
  console.log("API started on port 5000");
});
