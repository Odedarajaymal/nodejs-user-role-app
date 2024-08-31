const express = require('express');
const router = express.Router();
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  updateAccessModules,
  addAccessModule,
  removeAccessModule
} = require('../controllers/roleController');

router.post('/', createRole);
router.get('/', getRoles);
router.get('/:id', getRoleById);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);
router.patch('/update-access-modules', updateAccessModules);
router.patch('/add-access-module', addAccessModule);
router.patch('/remove-access-module', removeAccessModule);

module.exports = router;
