const { UserRoles } = require("../../config/constants");
const { permissionCheck } = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/multipart-handle.middleware");
const { bodyValidator } = require("../../middlewares/validator.middleware");
const categoryCtrl = require("./category.controller");
const { CategoryCreateDTO } = require("./category.validator");
const categoryRouter = require("express").Router();

categoryRouter.get('/front/list', categoryCtrl.frontList)
categoryRouter.get('front/:slug', categoryCtrl.frontListProductByCategorySlug)

categoryRouter.post('/', permissionCheck([UserRoles.ADMIN]), uploader().single('image'), bodyValidator(CategoryCreateDTO), categoryCtrl.create)
categoryRouter.get('/', permissionCheck([UserRoles.ADMIN]), categoryCtrl.listAll)
categoryRouter.get('/:id', permissionCheck([UserRoles.ADMIN]), categoryCtrl.detailById)
categoryRouter.put('/:id', permissionCheck([UserRoles.ADMIN]), categoryCtrl.updateById)
categoryRouter.delete('/:id', permissionCheck([UserRoles.ADMIN]), categoryCtrl.deleteById)

module.exports = categoryRouter;