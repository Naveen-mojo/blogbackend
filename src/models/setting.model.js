module.exports = (sequelize, Sequelize) => {
    const Setting = sequelize.define('settings', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        siteTitle: {
            type: Sequelize.STRING
        },
        fotterAbout: {
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
        fotterVerification: {
            type: Sequelize.STRING
        },
        inPageAds: {
            type: Sequelize.STRING
        },
        headerAds: {
            type: Sequelize.STRING
        },
        fotterAds: {
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
        fotterMargin: {
            type: Sequelize.STRING
        },
        actionUrl: {
            type: Sequelize.STRING
        },
        secondary_logo: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.DATE
        },
    }, { timestamps: false })

    return Setting;
}