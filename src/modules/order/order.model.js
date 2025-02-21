const mongoose = require("mongoose");
const { Status } = require("../../config/constants");

const OrderSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            min: 2,
            max: 100,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            unique: true,
            required: true,
          },
          status: {
            type: String,
            enum: Object.values(Status),
            default: Status.INACTIVE,
          },
          image: {
            public_url: String,
            optimized_url: String,
          },
          created_by:{
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null
          },
          updated_by: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            default: null
          }
      },
      {
        autoCreate: true,
        autoIndex: true,
        timestamps: true,
      }
)

const OrderModel = mongoose.model("Order", OrderSchema)
module.exports = OrderModel;