const mongoose = require("mongoose");
const { Status, UserRoles, Gender } = require("../../config/constants");

const UserSchema = new mongoose.Schema(
  {
    // schema design
    name: {
      type: String,
      min: [2, "Name should have atlast 2 characters"],
      max: [50, "Name should have atmost 50 characters"],
      required: true,
    },
      email: {
        type: String, 
        required: true,
        unique: [true, "Email has been already registered"],
      },
      phone: {
        type: String,
        // required: function () {
        //     return this.email ? false : true;
        // }
      },
      password: {
        type: String,
        required: true,
      },
      address: String,
      role: {
        type: String,
        enum: [UserRoles.ADMIN, UserRoles.CUSTOMER, UserRoles.SELLER],
        default: UserRoles.CUSTOMER
      },
      status: {
        type: String,
        enum: [Status.ACTIVE, Status.INACTIVE],
        default: Status.INACTIVE
      },
      image: {
        public_url: String,
        optimized_url: String,
      },
      gender: {
        type: String,
        enum: [Gender.MALE, Gender.FEMALE, Gender.OTHER],
      },
      activationToken: String,
      forgetToken: String,
      expiryTime: Date,
  },
  {
    // config
    timestamps: true,  //createdAt, updatedAt
    autoIndex: true,
    autoCreate: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
