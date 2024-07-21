const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/FormDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in connecting Database"));
db.once("open", () => console.log("Connected to Database"));

// Mongoose schema and model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  phno: String,
  gender: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Route for sign-up
app.post("/sign_up", async (req, res) => {
  const { name, age, email, phno, gender, password } = req.body;

  const newUser = new User({
    name,
    age,
    email,
    phno,
    gender,
    password,
  });

  try {
    await newUser.save();
    console.log("Record Data inserted Successfully");
    res.redirect("/signup_success.html");
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).send("Error saving data");
  }
});

// Route for home
app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return res.redirect("/index.html");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
