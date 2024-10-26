const sUser = require('./model');
const path = require("path");
exports.createSuser = async (req, res, next) => {
    const s_user = new sUser({
        user: req.body.user,
    });
    if(req.file){
        s_user.pdf = req.file.path
    }
    s_user.save()
    .then(result=>{
        // console.log(result);
        res.status(201).json({message:"A été creer avec succes",newPage:result})
    })
    .catch(err =>{
        console.log(err);
        res.status(500).send({errMessage: "Invalide"})
    }) 
};

exports.downloadFile = async (req, res) => {
    const { id } = req.params;
    const item = await sUser.findById(id);
    if (!item) {
        return next(new Error("No item found"));
    }
    const file = item.pdf;
    const filePath = path.join(__dirname, `../${file}`);
    res.download(filePath);
  };

exports.getSusers = async (req, res, next) => {
    const s_user = await sUser.find()
    res.status(200).json({success: true, data: s_user});
};

exports.getSuser = async (req, res, next) => {
    const s_user = await sUser.findById(req.params.id);
    if (!s_user) {
        return res.status(404).send({errMessage: `Simple User not found with id of ${req.params.id}`})
    }
    res.status(200).json({ success: true, data: s_user });
};

exports.updateSuser = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    sUser.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Cannot update this Simple user with id=${id}. Maybe This Simple user was not found!`
            });
            } else res.send({ message: "This Simple user was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating This simple user with id=" + id
            });
        });
};

exports.deleteSuser = (req, res) => {
    const id = req.params.id;
    sUser.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Simple User with id=${id}. Maybe Simple User was not found!`
            });
        } else {
            res.send({
                message: "Simple User was deleted successfully!"
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Simple User with id=" + id
            });
        });
};