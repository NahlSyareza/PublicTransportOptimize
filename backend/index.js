const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const route = require("./routes/st_route");
const app = express();
const port = 5000;
const controller = require("./controllers/st_controller");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    methods: "GET, POST, PUT, DELETE",
  })
);

// My Home
// const fnpHome = controller.fnp([106.90631095000612, -6.257573878437469]);
// console.log(fnpHome);

// UI
// const fnpUI = controller.fnp([106.82353210759675, -6.361164675613395]);
// console.log(fnpUI);

app.use("/maret89", route);

app.listen(port, () => {
  console.log("Server is up and running!");
});
