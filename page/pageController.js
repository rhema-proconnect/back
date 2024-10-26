const Page = require('./pageModel');
///const asyncHandler = require('../middleware/async');

exports.createPage = async (req, res, next) => {

    const pge = new Page({
        name:req.body.name,
        description: req.body.description,
        serviceNumber: req.body.serviceNumber,
        phoneNumber: req.body.phoneNumber,
        isApprouve: req.body.isApprouve,
        cat: req.body.cat,
        user: req.body.user,
    });
    if(req.file){
        pge.image = req.file.path
    }
    pge.save()
    .then(result=>{
        // console.log(result);
        res.status(201).json({message:"A été creer avec succes",newPage:result})
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send({errMessage: "Invalide"})
    }) 
};

exports.getPages = async (req, res, next) => {
    const page = await Page.find()
    res.status(200).json({success: true, data: page});
};

exports.getPage = async (req, res, next) => {
    const page = await Page.findById(req.params.id);
    if (!page) {
        return res.status(404).send({errMessage: `Page not found with id of ${req.params.id}`})
    }
    res.status(200).json({ success: true, data: page });
};

exports.updatePage = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Page.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Cannot update Page with id=${id}. Maybe Page was not found!`
            });
            } else res.send({ message: "Page was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating Page with id=" + id
            });
        });
};

exports.deletePage = (req, res) => {
    const id = req.params.id;
    Page.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Page with id=${id}. Maybe Page was not found!`
            });
        } else {
            res.send({
                message: "Page was deleted successfully!"
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Page with id=" + id
            });
        });
};