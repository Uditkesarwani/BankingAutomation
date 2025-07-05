const { trasactionModels } = require("../models/trasactionModels");
const {accountModels} = require('../models/accountModels')


async function transferName(req, res) {
  try {
    const email = req.user.email; // Assuming user info is in req.user
    // console.log(email);
    
    // Fetch account details from database using email
    const account = await accountModels.findOne({ email });

    if (!account) {
      return res.status(404).json({ success: false, message: "No account found" });
    }

    res.json({ success: true, account });
  } catch (error) {
    console.error("Fetch account error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function getUserBalance(req, res) {
    try {
        const userId = req.user?.id;
        // console.log(userId);
        
        // ✅ Check if userId is present
        if (!userId) {
          console.error("User ID not found in request");
          return res.status(401).json({
            success: false,
            message: "Unauthorized: User ID missing",
          });
        }
    
        // ✅ Fetch transactions from DB
        const transactions = await trasactionModels.find({ userId }).sort({ date: -1 });
    
        // ✅ Success response
        return res.status(200).json({
          success: true,
          transactions,
        });
    
      } catch (err) {
        // ✅ Detailed error logging
        console.error("Error in getUserTransactions:", {
          message: err.message,
          stack: err.stack,
        });
    
        // ✅ Fallback response
        return res.status(500).json({
          success: false,
          message: "Internal Server Error while fetching transactions",
          error: err.message,
        });
      }
    
     
   
  }
  
  
  async function transaction(req, res) {
    const userId = req.user.id;
  //  console.log("UserId:", userId);
  
    try {
      const { SenderName, CustomerName, Email, Amount } = req.body;
  
      // ✅ Basic field validation
      if (!userId || !SenderName || !CustomerName || !Email || Amount == null) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      // ✅ Amount must be a valid positive number
      if (isNaN(Amount) || Number(Amount) <= 0) {
        return res.status(400).json({
          success: false,
          message: "Amount must be a valid number greater than 0",
        });
      }
  
      // ✅ Fetch sender's account
      const existingAccount = await accountModels.findOne({ userId });
  
      if (!existingAccount) {
        return res.status(403).json({
          success: false,
          message: "Account not found. Please create an account first before transferring.",
        });
      }
  
      // ✅ Check balance
      if (existingAccount.balance < Amount) {
        return res.status(400).json({
          success: false,
          message: "Insufficient balance. Please check your account.",
        });
      }
  
      // ✅ Create and save transaction
      const newTransaction = new trasactionModels({
        userId,
        SenderName,
        CustomerName,
        Email,
        Amount,
      });
  
      await newTransaction.save();
  
      // ✅ Deduct amount from balance
      existingAccount.balance -= Amount;
      await existingAccount.save();
  
      return res.status(200).json({
        success: true,
        message: "Transaction recorded successfully",
        transaction: newTransaction,
      });
  
    } catch (error) {
      console.error("Transaction Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  }
  
    
module.exports = { transaction , getUserBalance, transferName};
