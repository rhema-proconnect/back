const Student = require('./model');
const path = require("path");
const fs = require('fs');
const PDFParser = require("pdf2json");
const pdfParser = new PDFParser(this, 1);

exports.createStudent = async (req, res, next) => {
    const std = new Student({
        email: req.body.email,
        user: req.body.user,
        pdf1: req.files['pdf1'][0].path,
        pdf2: req.files['pdf2'][0].path,
        // pdf2: req.file.path,
    });
    // if(req.file){
    //     std.pdf = req.file.path
    //     // std.pdf2 = req.file.path
    // }
    std.save()
    .then(result=>{
        // console.log(result);
        res.status(201).json({message:"A été creer avec succes",newPage:result})
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send({errMessage: "Invalide"})
    }) 
};


exports.downloadFile1 = async (req, res) => {
    const { id } = req.params;
    const item = await Student.findById(id);
    if (!item) {
        return next(new Error("No item found"));
    }
    const file = item.pdf1;
    const filePath = path.join(__dirname, `../${file}`);
    res.download(filePath);
};

exports.downloadFile2 = async (req, res) => {
    const { id } = req.params;
    const item = await Student.findById(id);
    if (!item) {
        return next(new Error("No item found"));
    }
    const file = item.pdf2;
    const filePath = path.join(__dirname, `../${file}`);
    res.download(filePath);
};

exports.getStudents = async (req, res, next) => {
    const sdt = await Student.find()
    res.status(200).json({success: true, data: sdt});
};

exports.getSuser = async (req, res, next) => {
    const sdt = await Student.findById(req.params.id);
    if (!sdt) {
        return res.status(404).send({errMessage: `Simple User not found with id of ${req.params.id}`})
    }
    res.status(200).json({ success: true, data: sdt });
};

exports.updateSdt = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Student.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Cannot update this Student with id=${id}. Maybe This Student was not found!`
            });
            } else res.send({ message: "This Student was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating This Student with id=" + id
            });
        });
};

exports.deleteSdt = (req, res) => {
    const id = req.params.id;
    Student.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
            });
        } else {
            res.send({
                message: "Student was deleted successfully!"
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Student with id=" + id
            });
        });
};