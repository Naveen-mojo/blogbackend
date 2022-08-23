var dbConn = require('../../config/db.config');

var Post = function (post, term) {
    this.ID = post.ID;
    this.PostSlug = post.PostTitle;
    this.TermId = term.TermId;
    this.TermName = term.TermName;
    this.TermSlug = term.TermName;
}

exports.getSiteMapPost = (req, res) => {
    getSitemapPost = () => {
        dbConn.query('SELECT PostSlug FROM posts WHERE is_deleted=1', (err, res) => {
            if (err) {
                result(null, err);
            } else {
                result(null, res);
            }
        })
    }
}