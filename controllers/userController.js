const User = require('../models/User');
const mongoose = require('mongoose');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const user = new User({ firstName, lastName, email, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users with roleName and accessModules populated
exports.getUsersWithRolesAndSearch = async (req, res) => {
    try {
      const search = req.query.search || '';

        const users = await User.aggregate([
            {
                $lookup: {
                    from: 'roles', // The Role collection
                    localField: 'role', // Field in the User collection
                    foreignField: '_id', // Field in the Role collection
                    as: 'roleDetails' // Name for the joined data
                }
            },
            {
                $unwind: '$roleDetails' // Unwind the roleDetails array
            },
            {
                $match: {
                    $or: [
                        { firstName: { $regex: search, $options: 'i' } },
                        { lastName: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                        { 'roleDetails.roleName': { $regex: search, $options: 'i' } },
                        { 'roleDetails.accessModules': { $regex: search, $options: 'i' } }
                    ]
                }
            },
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    'roleDetails.roleName': 1,
                    'roleDetails.accessModules': 1
                }
            }
        ]);

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('role', 'roleName accessModules');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bulk update users with the same data
exports.bulkUpdateSameData = async (req, res) => {
  try {
    const { lastName } = req.body;

    const result = await User.updateMany({}, { $set: { lastName } });

    res.json({ message: `${result.modifiedCount} users updated` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Bulk update users with different data
exports.bulkUpdateDifferentData = async (req, res) => {
  try {
    const { updates } = req.body; // Expecting an array of updates

    // Construct bulk operations
    const bulkOps = updates.map(update => ({
      updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(update.userId) },
        update: { $set: update.data }
      }
    }));

    // Execute bulkWrite operation
    const result = await User.bulkWrite(bulkOps);

    res.json({ message: `${result.modifiedCount} users updated` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Check if user has access to a specific module
exports.checkUserAccess = async (req, res) => {
  try {
      const { userId, moduleName } = req.body;

      const result = await User.aggregate([
          {
              $match: { _id: new mongoose.Types.ObjectId(userId) } // Find the user by ID
          },
          {
              $lookup: {
                  from: 'roles',
                  localField: 'role',
                  foreignField: '_id',
                  as: 'roleDetails'
              }
          },
          {
              $unwind: '$roleDetails'
          },
          {
              $project: {
                  hasAccess: {
                      $in: [moduleName, '$roleDetails.accessModules'] // Check if the moduleName exists in accessModules
                  }
              }
          }
      ]);

      // If the result array is not empty, return the hasAccess value
      if (result.length > 0) {
          return res.json({ hasAccess: result[0].hasAccess });
      } else {
          return res.status(404).json({ message: 'User not found or Role not associated with user' });
      }

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
  }
};

