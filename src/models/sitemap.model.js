var dbConn = require('../../config/db.config');


var Post = function (post, term) {
    this.ID = post.ID;
    this.PostSlug = post.PostTitle;
    this.TermId = term.TermId;
    this.TermName = term.TermName;
    this.TermSlug = term.TermName;
}

// get all posts
Post.getSitemapPost = (result) => {
    dbConn.query("SELECT PostSlug FROM posts WHERE (is_deleted='0' or is_deleted='')", (err, res) => {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    })
}



Post.getSitemapTerm = (result) => {
    dbConn.query('SELECT TermName, TermSlug FROM term WHERE TermStatus=1', (err, res) => {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    })
}

module.exports = Post;
