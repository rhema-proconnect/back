const {
    createStudentM,
    getStudentsM,
    deleteSdt,
    updateSdt,
    getStudentM,
    // getFile,
    // getPage,
    // updatePage,
    // deletePage
} = require('./controller');

const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadImage');

router.post('/add/studentM', upload.single('image'), createStudentM)
router.get('/studentM', getStudentsM);
// router.get("/download1/:id", downloadFile1)
// router.get("/download2/:id", downloadFile2)
// router.get('/fileGet/:id', getFile);
router.get('/studentM/:id', getStudentM);
router.delete('/del/sdt/:id', deleteSdt)
router.put('/update/sdt/:id', updateSdt)
// router.post('/add/page', createPage)

module.exports = router;