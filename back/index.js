const express = require("express");
const app = express();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const authUser = require("./routes/users");
 const product = require("./routes/products");

const port = process.env.PORT || 3010;
dotenv.config();

// Connect to DB

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  console.log("connected to database")
);

app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: ["GET", "POST","DELETE","PUT"],
  })
);

//Middleware

app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// Route Middleware

app.use("/api/user", authUser);
 app.use("/api/product", product);




//export {io};
server.listen(port, () => console.log(`server is runing in ${port}`));

