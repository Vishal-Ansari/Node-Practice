const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
// app.use(express.json())
const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const users = [
  {
    username: "komal",
    password: "komal",
  },
  
];

app.get("/", (req, res) => {
  console.log("tes");
  return res.render("signup");
});

app.get("/login", (req, res) => {
  console.log("tes");
  return res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  for (let i = 0; i < users.length; i++) {
    if (username === users[i].username) {
      if (password === users[i].password) {
        return res.render("homepage");
      } else {
        return res.render("login", {
          alert: "Password incorrect",
        });
      }
    } else {
      return res.render("login", {
        alert: "User Not Found",
      });
    }
  }
  return res.render("login");
});

app.post("/", (req, res) => {
  const { username, email, password } = req.body;
  if (username.length <= 0 || email.length <= 0 || password.length <= 0) {
    return res.render("signup", {
      alert: "Please Fill All The Field",
    });
  }
  users.push(req.body);
  console.log(users);
  return res.render("login");
});

const posts = [];

app.post("/message", (req, res) => {
  const message = req.body;
  posts.push(req.body);

  res.render("homepage", { posts });
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
