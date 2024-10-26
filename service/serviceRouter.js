const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadImage');
const {createService, getService, getServices, updateService, deleteService} = require('./serviceController')

// router.post('/add/service', createService);
router.post('/add/service', upload.single('image'),createService);
router.get('/service', getServices);
router.get('/service/:id', getService);
router.put('/update/service/:id', updateService);
router.delete('/del/service/:id', deleteService);

module.exports = router;
