const mongoose = require("mongoose");

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
        enum: ["admin", "customer", "seller"],
        default: "customer"
      },
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
      },
      image: {
        public_url: String,
        optimized_url: String,
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
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
