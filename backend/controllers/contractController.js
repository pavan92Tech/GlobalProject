const asyncHandler = require("express-async-handler");
const Contract = require("../models/contractModel");

//@desc Register a contract
//@route POST /api/contract/register
//@access public
const registerContract = asyncHandler(async (req, res) => {
  const contactFormData = req.body;
  const contract = await Contract.create(contactFormData);

  console.log(`Contract created ${contract}`);
  if (contract) {
    res.json({
      status: 201,
      contract: contract,
      message: "Successfully created a contract",
    });
  } else {
    res.status(400);
    throw new Error("contract data is not valid");
  }
});

//@desc Get all contracts
//@route GET /api/contracts
//@access public
const getAllContracts = asyncHandler(async (req, res) => {
  const contracts = await Contract.find();
  res.json({
    status: 200,
    contracts: contracts,
    message: "Successfully fetched all contracts",
  });
});

//@desc Get a contract
//@route GET /api/contracts/:id
//@access public
const getContract = asyncHandler(async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      res.status(404);
      throw new Error("contract not found");
    }
    res.json({
      status: 200,
      contract: contract,
      message: "Successfully fetched a contract",
    });
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

module.exports = { registerContract, getAllContracts, getContract };
