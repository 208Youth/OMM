const express = require("express");
const app = express();
const port = 4424;
const dotenv = require("dotenv");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

// const routes = require("./routes/");
// app.use(routes);

const credentialRouter = require("./routes/did.js");
app.use("/api/did", credentialRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
