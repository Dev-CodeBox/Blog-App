const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server Started At ${PORT}`);
});
app.use(express.json());

const blogRoutes = require("./routes/blogRoutes");
app.use("/api/v1", blogRoutes);

const dbConnect = require("./config/dbConnect");
dbConnect();
app.get("/", (request, response) => {
  response.send(
    `<h1 style="display:flex;justify-content:center; padding-top: 20rem"> Welcome To Blog App At localhost:${PORT}</h1>`
  );
});
