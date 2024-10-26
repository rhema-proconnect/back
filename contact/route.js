const {
    createMail,
    getMails,
    getMail,
    deleteMail
} = require('./controller');

const express = require('express');
const router = express.Router();

router.post('/send-message', createMail)
router.get('/message', getMails);
router.get('/message/:id', getMail);
router.delete('/del/message/:id', deleteMail)

module.exports = router;
