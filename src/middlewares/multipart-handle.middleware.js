const multer = require("multer");
const fs = require("node:fs");

const mystorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let filePath = "./public";
    if (!fs.existsSync(filePath)) {
      // create the directory if it doesn't exist
      fs.mkdirSync(filePath, { recursive: true });
    }
    cb(null, filePath);
  },

  filename: (req, file, cb) => {
    // a.jpg => different name
    let filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});

const uploader = (type = "image") => {
  const fileFilter = (req, file, cb) => {
    let allowedType = ["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp"];
    if (type === "doc") {
      allowedType = [
        "pdf",
        "doc",
        "docx",
        "ppt",
        "txt",
        "csv",
        "json",
      ];
    }

    // validate uploaded file extension
    const ext = file.originalname.split(".").pop();
    if (allowedType.includes(ext.toLowerCase())) {
      cb(null, true);
    } else {
      cb({
        code: 400,
        message: "Validation failed",
        status: "BAD_REQUEST",
        detail: {
          [file.fieldname]: "file formate not supported",
        },
      });
    }
  };

  return multer({
    storage: mystorage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 3000000, // 3MB
    },
  });
};

module.exports = uploader;
