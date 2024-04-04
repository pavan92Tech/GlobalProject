const mongoose = require("mongoose");

const drugSchema = mongoose.Schema(
  {
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Manufacturer",
    },
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Contract",
    },
    drugName: {
      type: String,
      required: [true, "Please add the drug name"],
    },
    drugCode: {
      type: String,
      required: [true, "Please add the drug code"],
    },
    mfdDate: { 
        type: String,
        required: [true, "Please add the mfd date"],
    },
    expDate: { 
        type: String,
        required: [true, "Please add the exp date"],
    },
    registered: {
      type: Boolean,
      default: false,
      required: [true, "Please add the registered"],
    },
    isSafeForUnderAge: {
      type: Boolean,
      default: false,
      required: [true, "Please add the drug safety"],
    },
    drugType: {
      type: String,
      required: [true, "Please add the drug type"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Drug", drugSchema);
