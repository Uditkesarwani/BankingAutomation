const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
}, { timestamps: true });

// export default mongoose.model("Message", messageSchema);

const messageModels = mongoose.model("messageModels", messageSchema);
module.exports = { messageModels };
