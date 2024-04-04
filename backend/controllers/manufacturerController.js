const asyncHandler = require("express-async-handler");
const Manufacturer = require("../models/manufacturerModel");

//@desc Register a manufacturer
//@route POST /api/manufacturer/register
//@access public
const registerManufacturer = asyncHandler(async (req, res) => {
  const manufacturerFormData = req.body;
  const manufacturer = await Manufacturer.create(manufacturerFormData);

  console.log(`Manufacturer created ${manufacturer}`);
  if (manufacturer) {
    res.json({
      status: 201,
      manufacturer: manufacturer,
      message: "Successfully created a manufacturer",
    });
  } else {
    res.status(400);
    throw new Error("manufacturer data is not valid");
  }
});

//@desc Get all manufacturers
//@route GET /api/manufacturer
//@access public
const getAllManufacturers = asyncHandler(async (req, res) => {
  const manufacturers = await Manufacturer.find();
  res.json({
    status: 200,
    manufacturers: manufacturers,
    message: "Successfully fetched all manufacturers",
  });
});

//@desc Get a manufacturer
//@route GET /api/manufacturer/:id
//@access public
const getManufacturer = asyncHandler(async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    if (!manufacturer) {
      res.status(404);
      throw new Error("manufacturer not found");
    }
    res.json({
      status: 200,
      manufacturer: manufacturer,
      message: "Successfully fetched a manufacturer",
    });
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

//@desc Update manufacturer
//@route PUT /api/manufacturer/:id
//@access public
const updateManufacturer = asyncHandler(async (req, res) => {
  const manufacturer = await Manufacturer.findById(req.params.id);
  if (!manufacturer) {
    res.status(404);
    throw new Error("Manufacturer not found");
  }

  const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedManufacturer);
});

//@desc Delete manufacturer
//@route DELETE /api/manufacturer/:id
//@access public
const deleteManufacturer = asyncHandler(async (req, res) => {
  const manufacturer = await Manufacturer.findById(req.params.id);
  if (!manufacturer) {
    res.status(404);
    throw new Error("Manufacturer not found");
  }

  await Manufacturer.deleteOne({ _id: req.params.id });
  res.status(200).json(manufacturer);
});

module.exports = { registerManufacturer, getAllManufacturers, getManufacturer, updateManufacturer, deleteManufacturer };
