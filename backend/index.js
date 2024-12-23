const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const route = require("./routes/global_routes");

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: "GET, POST, PUT, DELETE",
  })
);

app.use("/pto", route);

app.listen(port, () => {
  console.log("Server is up and running!");
});
