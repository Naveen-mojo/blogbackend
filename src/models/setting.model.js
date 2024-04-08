module.exports = (sequelize, Sequelize) => {
    const Setting = sequelize.define('binge_settings', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        siteTitle: {
            type: Sequelize.STRING
        },
        footerAbout: {
            type: Sequelize.STRING
        },
        siteLogo: {
            type: Sequelize.STRING
        },
        favicon: {
            type: Sequelize.STRING
        },
        defaultImage: {
            type: Sequelize.STRING
        },
        copyRight: {
            type: Sequelize.STRING
        },
        developer: {
            type: Sequelize.STRING
        },
        seoInfo: {
            type: Sequelize.STRING
        },
        metaVerification: {
            type: Sequelize.STRING
        },
        footerVerification: {
            type: Sequelize.STRING
        },
        inPageAds: {
            type: Sequelize.STRING
        },
        headerAds: {
            type: Sequelize.STRING
        },
        footerAds: {
            type: Sequelize.STRING
        },
        articleAds: {
            type: Sequelize.STRING
        },
        sidebarAds: {
            type: Sequelize.STRING
        },
        customCss: {
            type: Sequelize.STRING
        },
        headMargin: {
            type: Sequelize.STRING
        },
        footerMargin: {
            type: Sequelize.STRING
        },
        actionUrl: {
            type: Sequelize.STRING
        }
    }, { timestamps: false })

    return Setting;
}