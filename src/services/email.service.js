const nodemailer = require("nodemailer");
const { SMTPConfig } = require("../config/config");

class EmailService {
  // node app ===> SMTP server(Queue) ===> Receiver
  #transport;
  constructor() {
    try {
      const config = {
        host: SMTPConfig.host,
        port: SMTPConfig.port,
        auth: {
          user: SMTPConfig.username,
          pass: SMTPConfig.password,
        },
      };
      if (SMTPConfig.provider === "gmail"){
        config["service"] = SMTPConfig.provider;
      }
      this.#transport = nodemailer.createTransport(config);
    } catch (exception) {
      console.log("Error in SMTP  Server Connection");
      throw {
        code: 500,
        detail: exception,
        message: "SMTP Server Connection Failed",
        status: "SMTP_SERVER_ERROR_CONNECTION",
      };
    }
  }

  emailSend = async ({to, subject, message, attachments =[]}) => {
    try {
      return await this.#transport.sendMail({
        to: to,
        // cc: "",
        // bcc: "",
        from: SMTPConfig.from,
        subject: subject,
        html: message,
        attachments: attachments,
      });
    } catch (exception) {
      throw {
        code: 500,
        detail: exception,
        message: "Email send Failed",
        status: "EMAIL_SEND_FAILED",
      };
    }
  };
}

const emailSvc = new EmailService();

module.exports = emailSvc;
