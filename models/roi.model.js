const mongoose = require("mongoose");

const roiSchema = new mongoose.Schema(
  {
    Maturity_Value: { type: Number },
    Annual_Instalment: { type: String, required: true },
    Rate_of_Interest: { type: String, required: true },
    Number_of_Years: { type: String, required: true },
    user_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ROIModel = mongoose.model("roi", roiSchema);

module.exports = {
  ROIModel,
};
