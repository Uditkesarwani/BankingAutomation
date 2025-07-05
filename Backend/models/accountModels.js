// const mongoose = require("mongoose");

// const baaccountModelshema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//     unique: true, // 🛡️ one user → one account
//   },
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     lowercase: true,
//     // ✅ unique hata do agar ek user ke multiple accounts same email se banne hain
//   },
//   phone: {
//     type: String,
//     required: true,
//     minlength: 10,
//     maxlength: 10,
//   },
//   accountNo: {
//     type: String,
//     required: true,
//     unique: true, // ✅ ye theek hai, sabka alag account number hona chahiye
//   },
//   balance: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const accountModels = mongoose.model("accountModels", baaccountModelshema);
// module.exports = { accountModels };


const mongoose = require("mongoose");

const baaccountModelshema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  accountNo: {
    type: String,
    required: true,
    unique: true,
  },
  accountType: {
    type: String,
    enum: ["Saving", "Current"],
    required: true,
    default: "Saving",
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming you have a User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const accountModels = mongoose.model("accountModels", baaccountModelshema);
module.exports = { accountModels };

