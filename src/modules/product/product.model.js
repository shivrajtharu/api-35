const mongoose = require("mongoose");
const { Status } = require("../../config/constants");

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            min: 2,
            max: 100,
            required: true,
            unique: [true, "Product title should be unique"],
        },
        slug: {
            type: String,
            unique: [true, "Product title should be unique"],
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

const ProductModel = mongoose.model("Product", ProductSchema)
module.exports = ProductModel;