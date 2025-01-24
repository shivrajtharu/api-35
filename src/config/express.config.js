const express = require("express");
const router = require("./router.config");

// apllication of express
const app = express();

// Routing config
app.use("/api/v1/", router); // application level middleware

// 404 router
app.use((req, res, next) => {
  next({ code: 404, message: "Resource not found", status: "NOT_FOUND" });
});

// error handling middleware
app.use((error, req, res, next) => {
  let code = error.code || 500;
  let msg = error.message || "Internal Server Error";
  let status = error.status || "SERVER_ERROR";
  let detail = error.detail || null;
  res.status(code).json({
    error: detail,
    message: msg,
    status: status,
    options: null,
  });
});
// export express app
module.exports = app;
