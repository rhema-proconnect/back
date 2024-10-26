const Appointment = require('./appModel');
// const Page = require('../page/pageModel');

exports.createAppointment = async (req, res, next) => {
    const app = new Appointment({
        name:req.body.name,
        date: req.body.date,
        hourBegin: req.body.hourBegin,
        hourEnd: req.body.hourEnd,
        objective: req.body.objective,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        serv: req.body.serv,
        user: req.body.user,
        client: req.body.client,
    });
    app.save()
    .then(result=>{
        res.status(201).json({message:"Votre rendez-vous a été creer avec succes",newService:result})
    })
    .catch(err =>{
        res.status(500).send({errMessage: "Invalide"})
    }) 
};

exports.getAppointments = async (req, res, next) => {
    const app = await Appointment.find()
    res.status(200).json({success: true, data: app});
};

exports.getAppointment = async (req, res, next) => {
    const app = await Appointment.findById(req.params.id);
    if (!app) {
        return res.status(404).send({errMessage: `Appointment not found with id of ${req.params.id}`})
    }
    res.status(200).json({ success: true, data: app });
};

exports.updateAppointment = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Appointment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found!`
            });
            } else res.send({ message: "Appointment was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating Appointment with id=" + id
            });
        });
};

// exports..post('/update', async (req, res) => {
// exports.UpdateNotification = (req, res) => {
//     try {
//         const { id, status } = req.body;
//         const updatedContact = await Appointment.findByIdAndUpdate(id, { name, email }, { new: true });
//         res.json(updatedContact);
//     } catch (error) {
//         res.status(500).json({ error: 'Error updating contact' });
//     }
// });

exports.deleteAppointment = (req, res) => {
    const id = req.params.id;
    Appointment.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`
            });
        } else {
            res.send({
                message: "Appointment was deleted successfully!"
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Appointment with id=" + id
            });
        });
};