const PostModel = require('../models/sitemap.model');

exports.getSitemapPostList = (req, res) => {
    PostModel.getSitemapPost((err, posts) => {
        if (err)
            res.send(err);
        res.send(posts)
    })
}

exports.getSitemapTermList = (req, res) => {
    PostModel.getSitemapTerm((err, posts) => {
        if (err)
            res.send(err);
        res.send(posts)
    })
}






