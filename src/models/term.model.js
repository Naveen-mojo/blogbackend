module.exports = (sequelize, Sequelize) => {
    const Term = sequelize.define("term", {
        TermId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        TermName: {
            type: Sequelize.STRING
        },
        TermSlug: {
            type: Sequelize.STRING
        },
        TermImage: {
            type: Sequelize.STRING
        },
        ParentId: {
            type: Sequelize.INTEGER
        },
        RssFeedUrl: {
            type: Sequelize.STRING
        },
        TermStatus: {
            type: Sequelize.INTEGER
        },
    }, {
        timestamps: false
    });

    return Term
}