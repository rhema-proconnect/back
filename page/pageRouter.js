const {
    createPage,
    getPages,
    getPage,
    updatePage,
    deletePage
  } = require('./pageController');

const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadImage');

router.post('/add/page', upload.single('image'), createPage)
// router.post('/add/page', createPage)
router.get('/page', getPages);
router.get('/page/:id', getPage);
router.put('/update/page/:id', updatePage)
router.delete('/del/page/:id', deletePage)

module.exports = router;
