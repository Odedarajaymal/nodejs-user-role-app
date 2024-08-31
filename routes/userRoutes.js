const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsersWithRolesAndSearch,
  getUserById,
  updateUser,
  deleteUser,
  bulkUpdateSameData,
  bulkUpdateDifferentData,
  checkUserAccess
} = require('../controllers/userController');

router.post('/', createUser);
router.get('/', getUsersWithRolesAndSearch);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/bulk/same', bulkUpdateSameData);
router.put('/bulk/different', bulkUpdateDifferentData);
router.post('/check-access', checkUserAccess);

module.exports = router;
