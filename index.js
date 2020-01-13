// implement your API here
const express = require("express");
const cors = require("cors");

const { find, findById, insert, update, remove } = require("./data/db");

const app = express();

app.use(express.json());
app.use(cors());

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

app.listen(5000, () => {
  console.log("API started on port 5000");
});
