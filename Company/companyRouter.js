const {
    createCompany,
    deleteCompany,
    getCompanies,
    getCompany,
    updateCompany
  } = require('./companyController');

const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadImage');

// router.post('/add/page', upload.single('image'), createPage)
router.post('/add/company', createCompany)
router.get('/company', getCompanies);
router.get('/company/:id', getCompany);
router.put('/update/company/:id', updateCompany)
router.delete('/del/company/:id', deleteCompany)

module.exports = router;
