const { appConfig } = require("../../config/config");
const { Status } = require("../../config/constants");
const { randomStringGenerate } = require("../../utils/helper");
const authSvc = require("./auth.service");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      let payload = await authSvc.registerUserTransformer(req);
      let user = await authSvc.createUser(payload);

      // SMTP server
      await authSvc.notifyUserActivation({
        name: user.fullName,
        email: user.email,
        token: user.activationToken,
      });
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

  activateUser = async (req, res, next) => {
    try {
      let token = req.params.token || null;

      if (!token) {
        throw {
          code: 422,
          status: "VALIDATION_FAILED",
          message: "Token missing",
        };
      }

      const userExists = await authSvc.getSingleUserByFilter({
        activationToken: token,
      });

      if (!userExists) {
        throw {
          code: 422,
          message: "Token doesnot exists or user already activated",
          status: "TOKEN_NOT_FOUND_ERROR",
        };
      }

      // update db
      let updateData = {
        status: "active",
        activationToken: null,
      };
      // service
      await authSvc.updateUserById(userExists._id, updateData);

      res.json({
        data: null,
        message:
          "Your account has been activated successfully. Please login to continue",
        status: "ACTIVATION_SUCCESS",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userExists = await authSvc.getSingleUserByFilter({
        email: email,
      });

      if (!userExists) {
        throw {
          code: 422,
          message: "User not found",
          status: "USER_NOT_FOUND",
        };
      }

      // password encrypt
      if (!bycrypt.compareSync(password, userExists.password)) {
        throw {
          code: 422,
          message: "Credentials does not match",
          status: "CREDENTIAL_DOES_NOT_MATCH",
        };
      }

      // claim
      // status => inactive, status => active
      if (userExists.status !== Status.ACTIVE) {
        throw {
          code: 422,
          message: "User account is not active",
          status: "USER_NOT_ACTIVE",
        };
      }

      let token = jwt.sign(
        {
          sub: userExists._id,
        },
        appConfig.jwt_secret,
        {
          expiresIn: "5hr",
        }
      );

      let refreshToken = jwt.sign(
        {
          sub: userExists._id,
        },
        appConfig.jwt_secret,
        {
          expiresIn: "3 days",
        }
      );

      res.json({
        data: {
          token: token, //JWT
          refreshToken: refreshToken,
          message: "You are logged IN",
          status: "OK",
          options: null,
        },
      });
    } catch (exception) {
      next(exception);
    }
  };

  getLoggedInUser = async(req, res, next) => {
    try{
      res.json({
        data: req.authUser,
        message: "Your profile",
        status: "OK",
        options: null
      })
    }catch(exception){
      next(exception)
    }
  }

  forgetPassword = async(req, res, next) => {
    try{
      const {email} = req.body
      const user = await authSvc.getSingleUserByFilter({
        email: email
      })
      if(!user){
        throw{
          detail: {
            email: "Email does not exists"
          },
          code: 400,
          message: "User not found",
          status: "USER_NOT_FOUND"
        }
      }

      // user exist
      let updateData = {
        forgetToken: randomStringGenerate(100),
        expiryTime: new Date(Date.now() + 60 * 60 * 1000)  //date object
      }
      await authSvc.updateUserById(user._id, updateData);

      // user notify
      await authSvc.notifyUserFogetPasswordLink({name: user.name, email: user.email, token: updateData.forgetToken})

      res.json({
        data: null,
        message: "You will receive the email about the resetting process shortly",
        status: "FORGET_PASSWORD_NOTIFY",
        options: null
      })
    
    }catch(exception){
      next(exception)
    }
  }

  verifyForgetToken = async(req, res, next) => {
    try{
      const token = req.params.token || null;
      const user = await authSvc.validateForgetToken(token)
      // verified
      // user exist
       let updateData = {
        forgetToken: randomStringGenerate(100),
        expiryTime: new Date(Date.now() + 60 * 60 * 1000)  //date object
      }
      await authSvc.updateUserById(user._id, updateData);

      res.json({
        data: updateData,
        code: 200,
        message: "Token verified",
        status: "TOKEN_VERIFIED",
        options: null
      })

    }catch(exception){
      next(exception)
    }
  }

  resetPassword = async(req, res, next) => {
    try{
      const {token, password} = req.body;
      const user = await authSvc.validateForgetToken(token);

      let updateBody = {
        password: bycrypt.hashSync(password, 10),
        forgetToken: null,
        expiryTime: null,
        status: Status.ACTIVE
      }

      await authSvc.updateUserById(user._id, updateBody)
      
      res.json({
        data: null,
        message: "Your password has been changed successfully",
        status: "PASSWORD_CHANGED_SUCCESSFULLY",
        options: null
      })

    }catch(exception){
      next(exception)
    }
  }

  changePassword = async(req, res, next) => {
    try{
      const {oldPassword, password} = req.body;
      const loggedInUser = req.authUser;

      if(oldPassword === password){
        throw {
          code: 422,
          message: "Cannot use current password",
          status: "PASSWORD_SHOULD_NOT_BE_SAME",
          options: null
        }
      }

      const user = await authSvc.getSingleUserByFilter({
        _id: loggedInUser._id
      })
      
      if(!bycrypt.compareSync(oldPassword, user.password)){
        throw{
          code: 400,
          message: "Password doesnot match",
          status: "PASSWORD_DOESNOT_MATCH",
          options: null
        }
      }

      await authSvc.updateUserById(user._id, {
        password: bycrypt.hashSync(password, 10)
      })

      res.json({
        data: null,
        message: "Your password has been changed",
        status: "PASSWORD_UPDATED",
        options: null
      })

    }catch(exception){
      next(exception)
    }
  }
}

const authCtrl = new AuthController();
module.exports = authCtrl;
