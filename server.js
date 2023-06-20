const express = require("express");
const helmet = require("helmet");
const axios = require("axios");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.get("/", async function (req, res) {
  try {
    const data = await axios.get("https://api.publicapis.org/random");
    //   send response 200
    res.status(200).json(data.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
