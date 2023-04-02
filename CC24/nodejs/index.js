const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const port = 4424;

app.use("/api/node", express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const credentialRouter = require("./routes/credential.js");
const presentationRouter = require("./routes/presentation.js");
app.use("/api/node/credential", credentialRouter);
app.use("/api/node/presentation", presentationRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
