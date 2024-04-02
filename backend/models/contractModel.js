const mongoose = require("mongoose");

const contractSchema = mongoose.Schema(
  // {
  //   billing: { type: mongoose.Schema.Types.Mixed, default: {} },
  //   payment: { type: mongoose.Schema.Types.Mixed, default: {} },
  // },
  // { minimize: false },
  {
    firstName: {
      type: String,
      required: [true, "Please add the first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add the last name"],
    },
    email: {
      type: String,
      required: [true, "Please add the email address"],
    },
    address: {
      type: String,
      required: [true, "Please add the address"],
    },
    address2: {
      type: String,
      required: [false, "Please add the address 2"],
    },
    phone: {
      type: String, default: "",
      required: [false, "Please add the phone"],
    },
    country: {
      type: String,
      required: [true, "Please add the country"],
    },
    state: {
      type: String,
      required: [true, "Please add the state"],
    },
    zipCode: {
      type: String,
      required: [true, "Please add the ZipCode"],
    },
    sameShipping: {
      type: Boolean,
      default: false,
      // required: [true, "Please check the sameShipping"],
    },
    saveInfo: {
      type: Boolean,
      default: false,
      // required: [true, "Please check the saveInfo"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contract", contractSchema);
