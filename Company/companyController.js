const Company = require('./company');
///const asyncHandler = require('../middleware/async');

exports.createCompany = async (req, res, next) => {

    const cpny = new Company({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        address: req.body.address,
        industry:req.body.industry,
        description: req.body.description,
        website: req.body.website,
        phone: req.body.phone,
        employee: req.body.employee,
        website: req.body.website,
        facebook: req.body.facebook,
        tikTok: req.body.tikTok,
        insta: req.body.insta,
        twitter: req.body.twitter,
        mapp: req.body.mapp,
        product: req.body.product,
        objectives: req.body.objectives,
        certi: req.body.certi,
        message: req.body.message,
        user : req.body.user
    });
    // if(req.file){
    //     pge.image = req.file.path
    // }
    cpny.save()
    .then(result=>{
        // console.log(result);
        res.status(201).json({message:"A été creer avec succes",newCpny:result})
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send({errMessage: "Invalide"})
    }) 
};

exports.getCompanies = async (req, res, next) => {
    const company = await Company.find()
    res.status(200).json({success: true, data: company});
};

exports.getCompany = async (req, res, next) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        return res.status(404).send({errMessage: `Company not found with id of ${req.params.id}`})
    }
    res.status(200).json({ success: true, data: company });
};

exports.updateCompany = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Company.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Cannot update Company with id=${id}. Maybe Company was not found!`
            });
            } else res.send({ message: "Company was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating Company with id=" + id
            });
        });
};

exports.deleteCompany = (req, res) => {
    const id = req.params.id;
    Company.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
            });
        } else {
            res.send({
                message: "Company was deleted successfully!"
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Company with id=" + id
            });
        });
};