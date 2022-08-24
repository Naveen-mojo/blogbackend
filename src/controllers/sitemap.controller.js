const db = require('../models')
const { post: Post, term: Term } = db

exports.getSitemapPost = (req, res) => {
    Post.findAll({ attributes: ["PostSlug"], where: { PostStatus: 1 } }).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send({ message: 'Error while retrieving post' + err });
    })
}

exports.getSitemapTerm = (req, res) => {
    Term.findAll({attributes: ["TermName", "TermSlug"], where: { TermStatus: 1 } }).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send({ message: 'Error while retrieving term' + err });
    })
}