const mongoose = require("mongoose");
const { Status } = require("../../config/constants");

const BrandSchema = new mongoose.Schema(
  // column definations
  {
    title: {
      type: String,
      min: 2,
      max: 100,
      unique: [true, "Brand title should be unique"],
      required: true,
    },
    slug: {
      type: String,
      unique: [true, "Brand title should be unique"],
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
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updated_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  // table(collection) properties
  {
    timestamps: true, // created_at, updated_at
    autoCreate: true,
    autoIndex: true,
  }
);

const BrandModel = mongoose.model("Brand", BrandSchema);

module.exports = BrandModel;
