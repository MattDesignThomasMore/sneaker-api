const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 5, 
  message: "Too many login attempts from this IP, please try again later.",
});

const createShoeLimiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 2, 
  message:
    "Too many new shoe creation attempts from this IP, please try again later.",
});

const express = require("express");
const app = express();

app.use((err, req, res, next) => {
  if (err instanceof rateLimit.RateLimitExceeded) {
    res.status(429).json({ error: err.message }); 
  } else {
    next(err);
  }
});

module.exports = {
  loginLimiter,
  createShoeLimiter,
};
