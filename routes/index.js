const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Hello World!",
  });
});

module.exports = router;
