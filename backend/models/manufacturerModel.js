const mongoose = require("mongoose");

const manufacturerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the name"],
    },
    startDate: {
      type: String,
    //   default: Date.now,
      required: [true, "Please add the start date"],
    },
    endDate: {
      type: String,
    //   default: Date.now,
      required: [true, "Please add the start date"],
    },
    address: {
      type: String,
      required: [true, "Please add the address"],
    },
    phone: {
      type: String,
      default: "",
      required: [false, "Please add the phone"],
    },
    regId: {
      type: String,
      required: [true, "Please add the regId"],
    },
    cashless: {
      type: Boolean,
      default: false,
      required: [true, "Please add the cashless"],
    },
    reimbursement: {
      type: Boolean,
      default: false,
      required: [true, "Please add the reimbursement"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Manufacturer", manufacturerSchema);
