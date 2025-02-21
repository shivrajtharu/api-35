const { UserRoles } = require("../../config/constants");
const { permissionCheck } = require("../../middlewares/auth.middleware");
const uploader = require("../../middlewares/multipart-handle.middleware");
const { bodyValidator } = require("../../middlewares/validator.middleware");
const brandCtrl = require("./brand.controller");    
const { BrandCreateDTO } = require  ("./brand.validator");
const brandRouter = require("express").Router();

// public
brandRouter.get('/front/list', brandCtrl.frontList)  // list only active
brandRouter.get('/front/:slug', brandCtrl.frontListProductByBrandSlug)  // list all product of that :slug brand

// CRUD CMS
brandRouter.post('/', permissionCheck([UserRoles.ADMIN]),uploader().single('image'),bodyValidator(BrandCreateDTO), brandCtrl.create)   // create
brandRouter.get('/', permissionCheck([UserRoles.ADMIN]), brandCtrl.listAll)    // list all
brandRouter.get('/:id', permissionCheck([UserRoles.ADMIN]), brandCtrl.detailById)  // view detail
brandRouter.put('/:id', permissionCheck([UserRoles.ADMIN]), brandCtrl.updateById)  // update
brandRouter.delete('/:id', permissionCheck([UserRoles.ADMIN]), brandCtrl.deleteById) // delete

module.exports = brandRouter;