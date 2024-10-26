const StudentM = require('./model');
// const path = require("path");
// const fs = require('fs');
// const PDFParser = require("pdf2json");
// const pdfParser = new PDFParser(this, 1);

exports.createStudentM = async (req, res, next) => {
    const stdF = new StudentM({
        fullName:req.body.fullName,
        phone: req.body.phone,
        cat: req.body.cat,
        portfolio: req.body.portfolio,
        experience: req.body.experience,
        descriptionPersonnel: req.body.descriptionPersonnel,
        insta: req.body.insta,
        facebook: req.body.facebook,
        tiktok: req.body.tiktok,
        user: req.body.user,
    });
    if(req.file){
        stdF.image = req.file.path
    }
    stdF.save()
    .then(result=>{
        // console.log(result);
        res.status(201).json({message:"A été creer avec succes",newPage:result})
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send({errMessage: "Invalide"})
    }) 
};


// exports.downloadFile1 = async (req, res) => {
//     const { id } = req.params;
//     const item = await Student.findById(id);
//     if (!item) {
//         return next(new Error("No item found"));
//     }
//     const file = item.pdf1;
//     const filePath = path.join(__dirname, `../${file}`);
//     res.download(filePath);
// };

// exports.downloadFile2 = async (req, res) => {
//     const { id } = req.params;
//     const item = await Student.findById(id);
//     if (!item) {
//         return next(new Error("No item found"));
//     }
//     const file = item.pdf2;
//     const filePath = path.join(__dirname, `../${file}`);
//     res.download(filePath);
// };

exports.getStudentsM = async (req, res, next) => {
    const sdt = await StudentM.find()
    res.status(200).json({success: true, data: sdt});
};

// exports.getSuser = async (req, res, next) => {
//     const sdt = await Student.findById(req.params.id);
//     if (!sdt) {
//         return res.status(404).send({errMessage: `Simple User not found with id of ${req.params.id}`})
//     }
//     res.status(200).json({ success: true, data: sdt });
// };

exports.getStudentM = async (req, res, next) => {
    const sdt = await StudentM.findById(req.params.id);
    if (!sdt) {
        return res.status(404).send({errMessage: `Page not found with id of ${req.params.id}`})
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
    StudentM.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
    StudentM.findByIdAndRemove(id)
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