const SettingModel = require('../models/setting.model');

// get all setting term list
exports.getAllSettingList = (req, res) => {
    SettingModel.getAllSetting((err, setting) => {
        if (err)
            res.send(err);
        res.send(setting)
    })
}

// get setting by ID
exports.getSettingByID = (req, res) => {
    SettingModel.getSettingByID(req.params.id, (err, setting) => {
        if (err)
            res.send(err);
        res.send(setting);
    })
}

// create new setting
exports.createNewSetting = (req, res) => {
    const settingReqData = new SettingModel(req.body);
    // check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Please fill all fields' });
    } else {
        SettingModel.createSetting(settingReqData, (err, setting) => {
            if (err)
                res.send(err);
            res.json({ status: true, message: 'setting Created Successfully', data: setting.insertId })
        })
    }
}