const express = require("express");
const router = require("./router.config");
const { MulterError } = require("multer");

// apllication of express
const app = express();

// json parser
app.use(express.json());
// urlencode parser
app.use(express.urlencoded(
  {
    extended: true
  }
));

// Routing config
app.use("/api/v1/", router); // application level middleware

// 404 router
app.use((req, res, next) => {
  next({ code: 404, message: "Resource not found", status: "NOT_FOUND" });
});

// error handling middleware
app.use((error, req, res, next) => {
  // console.log({ error });
  let code = error.code || 500;
  let msg = error.message || "Internal Server Error";
  let status = error.status || "SERVER_ERROR";
  let detail = error.detail || null;

// custom error handling
if (error instanceof MulterError){
    code = 400;
    msg = "File upload error";
    status = "BAD_REQUEST";

  if (error.code === "LIMIT_UNEXPECTED_FILE") {
    detail = {
      [error.field]: "image upload is not allowed"
    }
  }
  if (error.code === "LIMIT_FILE_SIZE") {
    detail = {
      [error.field]: "File size is too large"
    }
  }
}

  res.status(code).json({
    error: detail,
    message: msg,
    status: status,
    options: null,
  });
});
// export express app
module.exports = app;
