const { UserRoles } = require("../../config/constants");
const { permissionCheck } = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/multipart-handle.middleware");
const { bodyValidator } = require("../../middlewares/validator.middleware");
const orderCtrl = require("./order.controller");
const { OrderCreateDTO } = require("./order.validator");
const orderRouter = require("express").Router();

orderRouter.post('/front/list', orderCtrl.frontList)
orderRouter.post('/front/:slug', orderCtrl.frontListProductByOrderSlug)

orderRouter.post('/', permissionCheck([UserRoles.ADMIN], uploader().single('image'), bodyValidator(OrderCreateDTO), orderCtrl.create))
orderRouter.post('/', permissionCheck([UserRoles.ADMIN],), orderCtrl.listAll)
orderRouter.post('/:id', permissionCheck([UserRoles.ADMIN], orderCtrl.detailById))
orderRouter.post('/:id', permissionCheck([UserRoles.ADMIN], orderCtrl.updateById))
orderRouter.post('/:id', permissionCheck([UserRoles.ADMIN], orderCtrl.deleteById))

module.exports = orderRouter;