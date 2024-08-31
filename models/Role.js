const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: { type: String, required: true, unique: true },
  accessModules: [{ type: String, unique: true }],
  createdAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
