const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to Support Desk" });
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started on Port ${PORT}`);
});
