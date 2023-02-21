import mongoose from "mongoose";

const rowSchema = mongoose.Schema({
  name: { type: String, required: true },
  ref_no: { type: Number, required: true },
  date: { type: String, required: true },
  column_1: { type: String, required: true },
  column_2: { type: Number, required: true },
  column_3: { type: Number, required: true },
  column_4: { type: Number, required: true },
  column_5: { type: Number, required: true },
  column_6: { type: Number, required: true },
});

export default mongoose.model("Row", rowSchema);
