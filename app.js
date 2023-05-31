const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const helmet = require("helmet");
const compress = require("compression");

const apiRoute = require("./routes/route");
const errorHandler = require("./routes/error");

dotEnv.config();

const app = express();

app.use(helmet());
app.use(compress());

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.use("/api", apiRoute);
app.use(errorHandler.erorr404);

app.listen(process.env.PORT, () => {
  console.log("Server is up on port " + process.env.PORT);

  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
});
