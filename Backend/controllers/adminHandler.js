const { userModels } = require("../models/userModels");
const { trasactionModels } = require("../models/trasactionModels");
const {accountModels} = require('../models/accountModels')


const userLogin = async (req, res) => {
  // console.log("userLogin");
  
  try {
    const users = await userModels.find({}, "name email role lastLogin loginCount");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: error.message,
    });
  }
};


const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      success: true,
      message: "User successfully logged out",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const getAllAccounts = async (req, res) => {
    try {
      const accounts = await accountModels.find(); // saare accounts le raha hai
  
      res.status(200).json({
        success: true,
        accounts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch accounts",
        error: error.message,
      });
    }
  };


 
  const getAllTransactions = async (req, res) => {
    try {
      const transactions = await trasactionModels.find(); // saare transactions la raha hai
  
      // ✅ Total amount ka sum nikalna
      const totalAmount = transactions.reduce((sum, t) => sum + (t.Amount || 0), 0);
  
      // console.log("Total Amount:", totalAmount);
  
      res.status(200).json({
        success: true,
        transactions,
        totalAmount, // ✅ sum bhi response me bhej diya
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch transactions",
        error: error.message,
      });
    }
  };
  
 

  
  const getUserTransactionsById = async (req, res) => {
    try {
      const { userId } = req.params;
      //  console.log(userId);
       
      const transactions = await trasactionModels.find({ userId });
  
      res.status(200).json({
        success: true,
        transactions,
      });
    } catch (error) {
      console.error("Error fetching user transactions:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch user transactions.",
      });
    }
  };


  const getAllUserTransactions = async(req, res)=>{
    try {
      const transactions = await trasactionModels.find({});
      res.status(200).json({ success: true, transactions });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch transactions" });
    }
  }

  const deleteAccountById = async (req, res) => {
    const { id } = req.params;
    //  console.log("🗑️ Trying to delete Account ID:", id);
  
    try {
      // Step 1: Find and delete the account
      const deletedAccount = await accountModels.findByIdAndDelete(id);
  
      if (!deletedAccount) {
        return res.status(404).json({ success: false, message: "Account not found" });
      }
  
      // Step 2: Delete related transactions using SenderName and CustomerName
      const result = await trasactionModels.deleteMany({ 
        $or: [
          { SenderName: deletedAccount.name },
          { CustomerName: deletedAccount.name }
        ]
      });
  
      //  console.log(`🧾 ${result.deletedCount} related transactions deleted.`);
  
      // Step 3: Send success response
      res.json({
        success: true,
        message: "Account and related transactions deleted successfully"
      });
    } catch (err) {
      console.error("❌ Delete account error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  
  // const getUserTransactionsById = async (req, res) => {
   
  // };
  

module.exports = {userLogin ,Logout,  getAllAccounts , getAllTransactions  , getUserTransactionsById , getAllUserTransactions, deleteAccountById};
