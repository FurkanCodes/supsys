const path = require("path");

const express = require("express");
require("dotenv").config();
const colors = require("colors");

const app = express();

const port = process.env.PORT || 9000;
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../build")));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Support API" });
  });
}

app.get("/api/users", (req, res) => {
  res.json({ message: "Welcome to the Support Desk" });
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
