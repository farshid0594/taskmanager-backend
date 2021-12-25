//import modules
const { createServer } = require("http");
const express = require("express");
const cors = require("cors");

//create server
const app = express();
const httpServer = createServer(app);

// config .env
require("dotenv").config();

// config bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

// mongoose
const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATA_BASE}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//config routes
const Router = require("./src/routes");
app.use(Router);

httpServer.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
