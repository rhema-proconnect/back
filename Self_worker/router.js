const {
    createSelfWork,
    getSelfWorker,
    downloadFile,
    getOneSelfWorker,
    deleteSelfWorker,
    updateSelfWorker,
    // updatePage,
    // deletePage
} = require('./controller');

const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadManyPDF');

router.post('/add/self_work', upload.fields([{name:"register_number", maxCount: 1},{name:"images", maxCount: 10}]), createSelfWork)
router.get('/self_work', getSelfWorker);
router.get("/download/:id", downloadFile)
router.get('/self_work/:id', getOneSelfWorker);
router.delete('/del/self_work/:id', deleteSelfWorker)
// router.post('/add/page', createPage)
router.put('/update/self_work/:id', updateSelfWorker)

module.exports = router;