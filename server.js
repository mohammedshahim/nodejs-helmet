const express = require("express");
const helmet = require("helmet");
const axios = require("axios");
const winston = require("winston");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);

app.get("/", async function (req, res) {
  try {
    const data = await axios.get("https://api.publicapis.org/random");
    // Mannully log the response
    logger.info("info", data.data);
    logger.error("error", data.data);

    //   send response 200
    res.status(200).json(data.data);
  } catch (error) {
    res.status(error.response.status).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
