const fileUploadSvc = require("../../services/cloudinary.service");
const bcrypt = require("bcryptjs");
const { randomStringGenerate } = require("../../utils/helper");
const emailsvc = require("../../services/email.service");
const { appConfig, SMTPConfig } = require("../../config/config");
const UserModel = require("../user/user.model");
const { Status } = require("../../config/constants");

class AuthService {
  registerUserTransformer = async (req) => {
    try {
      let payload = req.body;
      payload.name = payload.fullName;
      payload.image = await fileUploadSvc.fileUpload(req.file.path, "users/");
      payload.password = bcrypt.hashSync(payload.password, 10);
      payload.status = Status.INACTIVE;
      payload.activationToken = randomStringGenerate(100);

      // delete payload.confirmPassword;
      // delete payload.fullName;

      return payload;
    } catch (exception) {
      throw exception;
    }
  };

  notifyUserActivation = async ({ name, email, token }) => {
    try {
      // send email
      return await emailsvc.emailSend({
        to: email,
        subject: "Activate your account",
        message: `<strong>Dear ${name}</strong>,<br>
        <p>Your account has been registered with ${email}. Please click on the below link to activate your account:</p>
        <a style="color: #003700" href="${appConfig.frontend_url}/activate/${token}">${appConfig.frontend_url}/activate/${token}</a>
        <p><strong>Regards</strong></p>
        <p><strong>${SMTPConfig.from}</strong></p>
        <p><small><em>Please do not reply to this email directly. If the link doesnot work, copy paste the url in the browser to activate your account.</em></small></p>
        `,
      });
    } catch (exception) {
      throw exception;
    }
  };

  createUser = async (data) => {
    try {
      const userObj = new UserModel(data);
      return await userObj.save(); // insert or update
    } catch (exception) {
      throw exception;
    }
  };

  getSingleUserByFilter = async (filter) => {
    try {
      const userExists = await UserModel.findOne(filter);
      return userExists;
    } catch (exception) {
      throw exception;
    }
  };

  updateUserById = async (id, data) => {
    try {
      const update = await UserModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      return update;
    } catch (exception) {
      throw exception;
    }
  };

  singleUserResponse = (user) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      address: user.address,
      role: user.role,
      phone: user.phone,
      status: user.status,
    };
  };

  notifyUserFogetPasswordLink = async ({ name, email, token }) => {
    try {
      // send email
      return await emailsvc.emailSend({
        to: email,
        subject: "Reset your password!",
        message: `<strong>Dear ${name}</strong>,<br>
        <p>If you have requested to change the password, please follow the steps by clicking the link below.</p>
        <a style="color: #003700" href="${appConfig.frontend_url}/verify-token/${token}">
        ${appConfig.frontend_url}/verify-token/${token}
        </a><br>
        <p><strong>Note:</strong>If you are not the one who requested to reset your password, please ignore this message.</p>
        <p><strong>Regards</strong></p>
        <p><strong>${SMTPConfig.from}</strong></p>
        <p><small><em>Please do not reply to this email directly. If the link doesnot work, copy paste the url in the browser to request to reset  your password.</em></small></p>
        `,
      });
    } catch (exception) {
      throw exception;
    }
  };

  validateForgetToken = async (token) => {
    if (!token) {
      throw {
        code: 422,
        message: "Token required",
        status: "TOKEN_EXPECTED",
      };
    }

    // user get
    const user = await this.getSingleUserByFilter({
      forgetToken: token,
    });

    if (!user) {
      throw {
        code: 422,
        message: "The request doesnot exists anymore",
        status: "TOKEN_NOT_EXISTS",
      };
    }

    // user exists
    // expiry of token
    let dateTime = Date.now(); // timestamp
    let tokenExpiryTime = user.expiryTime.getTime(); //timestamp
    // compare
    if (dateTime > tokenExpiryTime) {
      throw {
        code: 422,
        message: "Token expired. Please retry to reset your password",
        status: "FORGET_PASSWORD_TOKEN_EXPIRED",
      };
    }
    return user;
  };

}

const authSvc = new AuthService();
module.exports = authSvc;
