const db = require("../models")
const { setting: Setting } = db

// Get Term By Category
// Get All Term 
exports.getAllSetting = (req, res) => {
    Setting.findAll({ }).then(data => {
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send({ message: 'Error while retrieving Setting' + err });
    })
  };