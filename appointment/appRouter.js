const express = require('express');
const router = express.Router();
const {createAppointment, getAppointment, getAppointments, updateAppointment, deleteAppointment} = require('./appController')

router.post('/create/app',createAppointment);
// router.post('/add', upload.single('image'),createPrdt);
router.get('/app', getAppointments);
router.get('/app/:id', getAppointment);
router.put('/app/:id', updateAppointment);
router.delete('/app/:id', deleteAppointment);

module.exports = router;
