// express server
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// middleware
const errorHandler = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

app.use("/api/tasks", require("./routes/taskRoutes"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
