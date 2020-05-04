const express = require("express");
const mongoose = require("mongoose");
const customer = require("./routes/api/customer");
const business = require("./routes/api/business");

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
//db config
const db = require("./config/keys").mongoURI;

//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MONGO CONNECTED"))
  .catch((err) => console.log(`ERROR ERROR: ${err}`));

//Use Routes
app.use("/api/customer/", customer);
app.use("/api/business/", business);

//Serve the static assets if in production
if (process.env.NODE_ENV === "production") {
  //set a static folder
  app.use(express.static("client/build"));
  app.use("*", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
