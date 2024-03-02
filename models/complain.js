const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  departmentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "department",
    required:true
  },
  status:{
    type:Boolean,
    required:true
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location:{
    type:Number,
    required:true
  }
});

const complain = new mongoose.model("complain", complainSchema);

module.exports = complain;
