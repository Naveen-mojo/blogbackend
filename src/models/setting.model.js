const dbConn = require('../../config/db.config');

const Setting = function (setting) {
    this.id = setting.id;
    this.siteTitle = setting.siteTitle;
    this.fotterAbout = setting.fotterAbout;
    this.siteLogo = setting.siteLogo;
    this.favicon = setting.favicon;
    this.defaultImage = setting.defaultImage;
    this.copyRight = setting.copyRight;
    this.developer = setting.developer;
    this.seoInfo = setting.seoInfo;
    this.metaVerification = setting.metaVerification;
    this.fotterVerification = setting.fotterVerification;
    this.inPageAds = setting.inPageAds;
    this.headerAds = setting.headerAds;
    this.fotterAds = setting.fotterAds;
    this.articleAds = setting.articleAds;
    this.sidebarAds = setting.sidebarAds;
    this.customCss = setting.customCss;
    this.headMargin = setting.headMargin;
    this.fotterMargin = setting.fotterMargin;
    this.actionUrl = setting.actionUrl;
    this.created_at = new Date();
}

Setting.getAllSetting = (result) => {
    dbConn.query('SELECT * FROM settings', (err, res) => {
        if (err) {
            console.log('Error while fetching setting', err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}


// get post by ID from DB
Setting.getSettingByID = (id, result) => {
    dbConn.query('SELECT * FROM settings WHERE id=?', id, (err, res) => {
        if (err) {
            console.log('Error while fetching setting by id', err);
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

// create new post
Setting.createSetting = (settingReqData, result) => {
    dbConn.query('INSERT INTO settings SET ? ', settingReqData, (err, res) => {
        if (err) {
            console.log('Error while inserting data');
            result(null, err);
        } else {
            result(null, res)
        }
    })
}


module.exports = Setting;