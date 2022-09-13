// express server
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const colors = require("colors");
const connectDB = require("./config/db");

// connect to database
connectDB();

// middleware
const errorHandler = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/practise", require("./routes/practiseRoutes"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
