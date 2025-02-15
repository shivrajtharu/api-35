const authRouter = require("express").Router(); // module routing level middleware
const authCtrl = require("./auth.controller");
const { bodyValidator } = require("../../middlewares/validator.middleware");
const { RegisterUserDTO, LoginDTO, ForgetPasswordDTO, ResetPasswordDTO, ChangePasswordDTO } = require("./auth.validator");
const uploader = require("../../middlewares/multipart-handle.middleware");
const { permissionCheck } = require("../../middlewares/auth.middleware");

// uploader().non() =>if content-type is not multipart/form-data but the data doesnot have file upload
// uploader().single(fieldname) => if content-type is multipart/form-data and the data has single file upload
// uploader().array(fieldname, limit) => if content-type is multipart/form-data and the data has multiple file upload
authRouter.post('/register', uploader().single('image'), bodyValidator(RegisterUserDTO), authCtrl.registerUser,)
authRouter.get('/activate/:token', authCtrl.activateUser)
authRouter.post('/login', bodyValidator(LoginDTO), authCtrl.login)
authRouter.get('/me',permissionCheck(), authCtrl.getLoggedInUser)
authRouter.post('/forget-password',bodyValidator(ForgetPasswordDTO), authCtrl.forgetPassword)
authRouter.get('/verify-token/:token', authCtrl.verifyForgetToken)
authRouter.put('/reset-password', bodyValidator(ResetPasswordDTO), authCtrl.resetPassword)
authRouter.put('/change-password', permissionCheck(), bodyValidator(ChangePasswordDTO), authCtrl.changePassword)


module.exports = authRouter;