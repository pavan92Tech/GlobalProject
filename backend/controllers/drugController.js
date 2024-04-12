const asyncHandler = require("express-async-handler");
const Drug = require("../models/drugModel");

//@desc Register a drug
//@route POST /api/drug/register
//@access public
const registerDrug = asyncHandler(async (req, res) => {
  const drugFormData = req.body;
  const drug = await Drug.create(drugFormData);

  console.log(`Drug created ${drug}`);
  if (drug) {
    res.json({
      status: 201,
      drug: drug,
      message: "Successfully created a drug",
    });
  } else {
    res.status(400);
    throw new Error("drug data is not valid");
  }
});

//@desc Get all drugs
//@route GET /api/drug
//@access public
const getAllDrugs = asyncHandler(async (req, res) => {
  const drugs = await Drug.find().populate('manufacturerId', '_id name');
  res.json({
    status: 200,
    drugs: drugs,
    message: "Successfully fetched all drugs",
  });
});

//@desc Get a drug
//@route GET /api/drug/:id
//@access public
const getDrug = asyncHandler(async (req, res) => {
  try {
    const drug = await Drug.findById(req.params.id).populate('manufacturerId', '_id name');
    if (!drug) {
      res.status(404);
      throw new Error("drug not found");
    }
    res.json({
      status: 200,
      drug: drug,
      message: "Successfully fetched a drug",
    });
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

//@desc Update drug
//@route PUT /api/drug/:id
//@access public
const updateDrug = asyncHandler(async (req, res) => {
  const drug = await Drug.findById(req.params.id);
  if (!drug) {
    res.status(404);
    throw new Error("Drug not found");
  }

  const updatedDrug = await Drug.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedDrug);
});

//@desc Delete drug
//@route DELETE /api/drug/:id
//@access public
const deleteDrug = asyncHandler(async (req, res) => {
  const drug = await Drug.findById(req.params.id);
  if (!drug) {
    res.status(404);
    throw new Error("Drug not found");
  }

  await Drug.deleteOne({ _id: req.params.id });
  res.status(200).json(drug);
});

module.exports = { registerDrug, getAllDrugs, getDrug, updateDrug, deleteDrug };
