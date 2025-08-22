require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwtLoginRoutes = require("./routes/routeAuth");
const verifyToken = require("./middleware/jwtUserAuth");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: "",
    credentials: true,
  })
);

//routes and token verify
app.use("/routeAuth", jwtLoginRoutes);
app.use("/jwtUserAuth", verifyToken);

//connecting to mongodb
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb Connected");
});

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
