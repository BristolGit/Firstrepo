import mongoose from "mongoose";

const DrugSchema = new mongoose.Schema({
  drug_id: String,
  username: String,
  details: {
    type: Object,
    required: true
  }
});

const Drug = mongoose.model("Drug", DrugSchema);

export default Drug;