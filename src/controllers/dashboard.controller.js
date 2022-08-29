const { sequelize, post_term } = require('../models')
const db = require('../models')
const { post: Post, term: Term } = db

exports.getTotalPost = (req, res) => {
    Post.findAndCountAll({ attributes: [[sequelize.fn('sum', sequelize.col('PostViews')), 'total_views']] }).then(data => {
        res.send({ "data": data })
    })
}

exports.getActivePost = (req, res) => {
    Post.findAndCountAll({ attributes: [], include: [{ model: post_term, required: true }], }).then(data => {
        res.send({ "data": data })
    })
}

exports.getTerms = (req, res) => {
    Term.findAndCountAll({ attributes: ["TermId"], where: { TermStatus: 1 } }).then(data => {
        res.send({ "data": data })
    })
}