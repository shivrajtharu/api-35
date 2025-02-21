const { UserRoles } = require("../../config/constants");
const { permissionCheck } = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/multipart-handle.middleware");
const { bodyValidator } = require("../../middlewares/validator.middleware");
const productCtrl = require("./product.controller");
const { ProductCreateDTO } = require("./product.validator");
const productRouter = require("express").Router();

productRouter.get('/front/list', productCtrl.frontList)
productRouter.get('/front/:slug', productCtrl.frontListProductBySlug)

productRouter.post('/', permissionCheck([UserRoles.ADMIN], uploader().single('image'), bodyValidator(ProductCreateDTO)), productCtrl.create)
productRouter.get('/', permissionCheck([UserRoles.ADMIN],), productCtrl.listAll)
productRouter.get('/:id', permissionCheck([UserRoles.ADMIN],), productCtrl.detailById)
productRouter.put('/:id', permissionCheck([UserRoles.ADMIN],), productCtrl.updateById)
productRouter.delete('/:id', permissionCheck([UserRoles.ADMIN], productCtrl.deleteById))

module.exports = productRouter;