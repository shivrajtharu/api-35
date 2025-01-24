const router = require("express").Router(); // routing level middleware

router.get("/health", (req, res) => {
  res.end("Hello world");
});

router.post("/about", (req, res) => {
  res.end("This is about page");
});

const loginHandle = (req, res, next) => {
  const customfield = req.customfield;
//   success
  res.json({
    data: { token: "", userDerails: "" },
    messsage: "login successfull",
    status: "OK",
    options: null,
  });
};

// custom middleware
const validateData = (req, res, next) => {
  req.customfield = " I am here";
  next({
    code: 400,
    messsage: "Validation failed",
    status: "BAD_REQUEST",
    detail: { email: "Email should be in a valid format" },
  });
};

router.post("/login", validateData, loginHandle);

router.put('/update-user/:userId', (req, res, next) => {
  let params = req.params;
  let query = req.query;
  console.log(params);
  res.json({
    data: {
      params, 
      query
    },
    messsage: "update user response",
    status: "OK",
    options: null,
  })
})

module.exports = router;
