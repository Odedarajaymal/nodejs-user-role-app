const Role = require('../models/Role');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { roleName, accessModules } = req.body;
    const role = new Role({ roleName, accessModules });
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all roles with search functionality
exports.getRoles = async (req, res) => {
    try {
      const search = req.query.search || '';
  
      // Define the aggregation pipeline
      const pipeline = [
        {
          $match: {
            roleName: { $regex: search, $options: 'i' } // Case-insensitive search for roleName
          }
        },
        {
          $project: {
            roleName: 1,
            accessModules: 1,
            createdAt: 1,
            active: 1
          }
        }
      ];
  
      // Execute the aggregation pipeline
      const roles = await Role.aggregate(pipeline);
  
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get a single role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a role
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the entire list of accessModules
exports.updateAccessModules = async (req, res) => {
  try {
      const { roleId, newAccessModules } = req.body;

      // Update the accessModules with the provided list, ensuring uniqueness
      const updatedRole = await Role.findByIdAndUpdate(
          roleId,
          {
              $set: { accessModules: [...new Set(newAccessModules)] } // Ensure unique values
          },
          { new: true }
      );

      if (!updatedRole) {
          return res.status(404).json({ message: 'Role not found' });
      }

      res.json(updatedRole);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};



// Add a unique module to accessModules
exports.addAccessModule = async (req, res) => {
    try {
        const { roleId, moduleName } = req.body;

        // Use aggregation pipeline to add the unique module
        const result = await Role.updateOne(
            { _id: roleId },
            { 
                $addToSet: { accessModules: moduleName } // Add moduleName if it does not already exist
            }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Role not found or module already exists' });
        }

        // Retrieve the updated role
        const updatedRole = await Role.findById(roleId);

        res.json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  // Remove a module from accessModules
exports.removeAccessModule = async (req, res) => {
    try {
        const { roleId, moduleName } = req.body;

        // Use aggregation pipeline to remove the module
        const result = await Role.updateOne(
            { _id: roleId },
            { 
                $pull: { accessModules: moduleName } // Remove all occurrences of moduleName
            }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Role not found or module does not exist' });
        }

        // Retrieve the updated role
        const updatedRole = await Role.findById(roleId);

        res.json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};