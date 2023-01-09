const path = require("path");

const express = require("express");
require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 9000;
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build")); // set static folder

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" });
  });
}
app.get("/api/users", (req, res) => {
  res.json({ message: "Welcome to the Support Desk" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
