const router = require("express").Router(); // global routing level middleware
const authRouter = require("../modules/auth/auth.router");
const bannerRouter = require("../modules/banner/banner.router");
const brandRouter = require("../modules/brand/brand.router")
const categoryRouter = require("../modules/category/category.router");
const orderRouter = require("../modules/order/order.router");
const productRouter = require("../modules/product/product.router");


router.get("/health", (req, res) => {
  res.end("Hello world");
});
router.use('/auth', authRouter);
router.use('/brand', brandRouter);
router.use('/category', categoryRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);

module.exports = router;
