const mongoose = require("mongoose");

const contractSchema = mongoose.Schema(
  {
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Manufacturer",
    },
    manufacturerName: {
      type: String,
      required: [true, "Please add the manufacturer name"],
    },
    contractName: {
      type: String,
      required: [true, "Please add the contract name"],
    },
    contractId: {
      type: String,
      required: [true, "Please add the contract ID"],
    },
    startDate: {
      type: String,
      required: [true, "Please add the start date"],
    },
    endDate: {
      type: String,
      required: [true, "Please add the end date"],
    },
    coveredAmount: {
      type: Number,
      required: [true, "Please add the covered amount"],
    },
    country: {
      type: String,
      required: [true, "Please add the country"],
    },
    state: {
      type: String,
      required: [true, "Please add the state"],
    },
    isRebatebaleCovered: {
      type: Boolean, default: false,
      required: [true, "Please add the Rebatebale Covered"],
    },
    isInsulinCovered: {
      type: Boolean, default: false,
      required: [true, "Please add the Insulin Covered"],
    },
    sameShipping: {
      type: Boolean, default: false,
      required: [false, "Please add the same shipping"],
    },
    saveInfo: {
      type: Boolean, default: false,
      required: [false, "Please add the save info"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contract", contractSchema);
