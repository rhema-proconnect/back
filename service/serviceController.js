const Service = require('./serviceModel');
// const Page = require('../page/pageModel');

exports.createService = async (req, res, next) => {
    const srv = new Service({
        name:req.body.name,
        description: req.body.description,
        hourEnd1: req.body.hourEnd1,
        hourEnd2: req.body.hourEnd2,
        hourBegin1: req.body.hourBegin1,
        hourBegin2: req.body.hourBegin2,
        pag: req.body.pag,
        price: req.body.price,
        user: req.body.user,
    });
    if(req.file){
        srv.image =  req.file.path
    }
    srv.save()
    .then(result=>{
        res.status(201).json({message:"A été creer avec succes",newService:result})
    })
    .catch(err =>{
        res.status(500).send({errMessage: "Invalide"})
    }) 
};

exports.getServices = async (req, res, next) => {
    const srv = await Service.find()
    res.status(200).json({success: true, data: srv});
};

exports.getService = async (req, res, next) => {
    const srv = await Service.findById(req.params.id);
    if (!srv) {
        return res.status(404).send({errMessage: `Service not found with id of ${req.params.id}`})
    }
    res.status(200).json({ success: true, data: srv });
};

exports.updateService = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Service.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Cannot update Service with id=${id}. Maybe Service was not found!`
            });
            } else res.status(201).json({ message: "Service was updated successfully.",newService:data });
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating Service with id=" + id
            });
        });
};

exports.deleteService = (req, res) => {
    const id = req.params.id;
    Service.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Service with id=${id}. Maybe Service was not found!`
            });
        } else {
            res.send({
                message: "Service was deleted successfully!"
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Service with id=" + id
            });
        });
};