const router = require("express").Router(); // global routing level middleware
const authRouter = require("../modules/auth/auth.router");
const bannerRouter = require("../modules/banner/banner.router");

router.get("/health", (req, res) => {
  res.end("Hello world");
});
router.use('/auth', authRouter);

module.exports = router;
