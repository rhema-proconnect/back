const self_worker = require('./model');
const path = require("path");

exports.createSelfWork = async (req, res, next) => {
    const images = req.files['images'];
    const sw = new self_worker({
        portefolio: req.body.portefolio,
        references: req.body.references,
        register_number: req.files['register_number'][0].path,
        images: images.map(file => file.path),
        user: req.body.user,
    });
    sw.save()
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
    const item = await self_worker.findById(id);
    if (!item) {
        return next(new Error("No item found"));
    }
    const file = item.register_number;
    const filePath = path.join(__dirname, `../${file}`);
    res.download(filePath);
  };

exports.getSelfWorker = async (req, res, next) => {
    const s_emp = await self_worker.find()
    res.status(200).json({success: true, data: s_emp});
};

exports.getOneSelfWorker = async (req, res, next) => {
    const s_emp = await self_worker.findById(req.params.id);
    if (!s_emp) {
        return res.status(404).send({errMessage: `Simple User not found with id of ${req.params.id}`})
    }
    res.status(200).json({ success: true, data: s_emp });
};

exports.updateSelfWorker = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    self_worker.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Cannot update this Self worker with id=${id}. Maybe This Self worker was not found!`
            });
            } else res.send({ message: "This Self worker was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating This Self worker with id=" + id
            });
        });
};

exports.deleteSelfWorker = (req, res) => {
    const id = req.params.id;
    self_worker.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Self worker with id=${id}. Maybe Self worker was not found!`
            });
        } else {
            res.send({
                message: "Self worker was deleted successfully!"
            });
        }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Self worker with id=" + id
            });
        });
};