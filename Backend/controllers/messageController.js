const { messageModels } = require("../models/messageModels");

const message = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create and save message
    const savedMessage = await messageModels.create({
      name,
      email,
      message
    });

    res.status(201).json({
      success: true,
      data: savedMessage,
      message: "Message sent successfully"
    });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
};


const getAllMessages = async (req, res) => {
    try {
      const messages = await messageModels.find().sort({ createdAt: -1 }); // Latest first
      res.status(200).json(messages);
    } catch (err) {
      console.error("Error fetching messages:", err);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  };
module.exports = { message , getAllMessages };
