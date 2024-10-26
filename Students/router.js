const {
    createStudent,
    getStudents,
    downloadFile1,
    downloadFile2,
    deleteSdt,
    updateSdt,
    // getFile,
    // getPage,
    // updatePage,
    // deletePage
} = require('./controller');

const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadImage');

router.post('/add/student', upload.fields([{name:'pdf1'},{name:'pdf2'}]), createStudent)
router.get('/student', getStudents);
router.get("/download1/:id", downloadFile1)
router.get("/download2/:id", downloadFile2)
// router.get('/fileGet/:id', getFile);
router.delete('/del/sdt/:id', deleteSdt)
router.put('/update/sdt/:id', updateSdt)
// router.post('/add/page', createPage)

module.exports = router;