const fileUploadSvc = require("../../services/cloudinary.service");
const bcrypt = require("bcryptjs");
const { randomStringGenerate } = require("../../utils/helper");
const emailsvc = require("../../services/email.service");
const { appConfig, SMTPConfig } = require("../../config/config");
const UserModel = require("../user/user.model");

class AuthService {
  registerUserTransformer = async (req) => {
    try {
      let payload = req.body;
      payload.name = payload.fullName;
      payload.image = await fileUploadSvc.fileUpload(req.file.path, "users/");
      payload.password = bcrypt.hashSync(payload.password, 10);
      payload.status = "inactive";
      payload.activationToken = randomStringGenerate(100);

      // delete payload.confirmPassword;
      // delete payload.fullName;

      return payload;
    } catch (exception) {
      throw exception;
    }
  };
  notifyUserActivation = async ({ fullName, email, token }) => {
    try {
      // send email
      return await emailsvc.emailSend({
        to: email,
        subject: "Activate your account",
        message: `<strong>Dear ${fullName}</strong>,<br>
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

  createUser = async(data) => {
    try{
      const userObj = new UserModel(data)
      return await userObj.save()   // insert or update
    }catch(exception){
      throw exception;
    }
  }

  getSingleUserByFilter = async(filter) => {
    try{
      const userExists = await UserModel.findOne(filter);
      return userExists;
    }catch(exception){
      throw exception;
    }
  }

  updateUserById = async(id, data) =>{
    try{
      const update = await UserModel.findByIdAndUpdate(id, {$set: data}, {new: true})
      return update;
    }catch(exception){
      throw exception;
    }
  }
}

const authSvc = new AuthService();
module.exports = authSvc;
