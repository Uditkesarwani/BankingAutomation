const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'userModels', required: true},
    SenderName: { type: String, required: true },  // Sender ka naam
    CustomerName: { type: String, required: true }, // Receiver ka naam
    Email: { type: String, required: true }, // Receiver ka email
    Amount: { type: Number, required: true }, // Transaction amount
  date: { type: Date, default: Date.now }  // Transaction date
});

const trasactionModels = mongoose.model("trasactionModels", transactionSchema);
module.exports = {trasactionModels};



