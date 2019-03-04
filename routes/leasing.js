const express = require('express');
const router = express.Router();

const leasingController = require('../app/api/controllers/leasing');
router.get('/', leasingController.getAll);
router.post('/', leasingController.create);
module.exports = router;