const {
    createSuser,
    getSusers,
    downloadFile,
    getSuser,
    deleteSuser,
    // getPage,
    // updatePage,
    // deletePage
} = require('./controller');

const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadImage');

router.post('/add/suser', upload.single('pdf'), createSuser)
router.get('/suser', getSusers);
router.get("/download/:id", downloadFile)
router.get('/suser/:id', getSuser);
router.delete('/del/suser/:id', deleteSuser)
// router.post('/add/page', createPage)
// router.put('/update/page/:id', updatePage)

module.exports = router;