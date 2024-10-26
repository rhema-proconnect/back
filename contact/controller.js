const Mailling = require('./models');
///const asyncHandler = require('../middleware/async');

exports.createMail = async (req, res, next) => {
    const mail = new Mailling({
        name:req.body.name,
        email: req.body.email,
        message: req.body.message,
    });
    mail.save()
    .then(result=>{
        // console.log(result);
        res.status(201).json({message:"Votre message a été avec succes",newMail:result})
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send({errMessage: "Invalide"})
    }) 
};

exports.getMails = async (req, res, next) => {
    const mail = await Mailling.find()
    res.status(200).json({success: true, data: mail});
};

exports.getMail = async (req, res, next) => {
    const mail = await Mailling.findById(req.params.id);
    if (!mail) {
        return res.status(404).send({errMessage: `Page not found with id of ${req.params.id}`})
    }
    res.status(200).json({ success: true, data: mail });
};


exports.deleteMail = (req, res) => {
    const id = req.params.id;
    Mailling.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Mail with id=${id}. Maybe mail was not found!`
            });
        } else {
            res.send({
                message: "Mail was deleted successfully!"
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Mail with id=" + id
            });
        });
};