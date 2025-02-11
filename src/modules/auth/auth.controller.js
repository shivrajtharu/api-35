const authSvc = require("./auth.service");

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      let payload = await authSvc.registerUserTransformer(req);
      let user = await authSvc.createUser(payload);

      // SMTP server
      await authSvc.notifyUserActivation({fullName: user.fullName, email: user.email, token: user.activationToken});
      res.json({
        data: user,
        message: "User registered Successfully",
        status: "OK",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUser = async(req, res, next) => {
    try{
      let token = req.params.token || null;

      if(!token){
        throw{
          code: 422,
          status: "VALIDATION_FAILED",
          message: "Token missing"
        }
      }

      const userExists = await authSvc.getSingleUserByFilter({
        activationToken: token,
      });

      if(!userExists){
        throw {
          code: 422,
          message: "Token doesnot exists or user already activated",
          status: "TOKEN_NOT_FOUND_ERROR"
        }
      }

      // update db
      let updateData = {
        status: "active",
        activationToken: null,
      }
      // service
      await authSvc.updateUserById(userExists._id, updateData)

      res.json({
        data: null,
        message: "Your account has been activated successfully. Please login to continue",
        status: "ACTIVATION_SUCCESS",
        options: null
      })
      
    }catch(exception){
      next(exception)
    }
  };
}

const authCtrl = new AuthController();
module.exports = authCtrl;
