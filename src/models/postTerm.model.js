module.exports = (sequelize, Sequelize) => {
  const PostTerm = sequelize.define('binge_post_terms', {
    PostTermID: {
      type: Sequelize.INTEGER,
    },
    PostId: {
      type: Sequelize.INTEGER,
    },
    CatId: {
      type: Sequelize.INTEGER,
    },
    SubCatId: {
      type: Sequelize.INTEGER,
    }
  }, {timestamps:false})

  return PostTerm
}




































// var dbConn = require("../../config/db.config");

// var PostTerm = function (post_term) {
//   this.ID = post_term.ID;
//   this.PostId = post_term.PostId;
//   this.CatId = post_term.CatId;
//   this.SubCatId = post_term.SubCatId;
// };

// PostTerm.getAllPostTerm = (result) => {
//   dbConn.query(
//     "SELECT * FROM post_term JOIN posts ON posts.ID = post_term.PostId",
//     (err, res) => {
//       if (err) {
//         console.log("Error while fetching posts term", err);
//         result(null, err);
//       } else {
//         console.log("post terms fetched successfully");
//         result(null, res);
//       }
//     }
//   );
// };

// // get post by ID from DB
// PostTerm.getPostTermByID = (id, result) => {
//   dbConn.query("SELECT * FROM post_term WHERE ID=?", id, (err, res) => {
//     if (err) {
//       console.log("Error while fetching post_term by id", err);
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };

// // create new post
// PostTerm.createPostTerm = (post_termReqData, result) => {
//   dbConn.query("INSERT INTO post_term SET ? ", post_termReqData, (err, res) => {
//     if (err) {
//       console.log("Error while inserting data");
//       result(null, err);
//     } else {
//       console.log("post_term created successfully");
//       result(null, res);
//     }
//   });
// };

// // update post_term page
// PostTerm.updatePostTerm = (PostId, post_termReqData, result) => {
//   dbConn.query(
//     "UPDATE post_term SET CatId=?, SubCatId=? WHERE PostId = ?",
//     [post_termReqData.CatId, post_termReqData.SubCatId, PostId],
//     (err, res) => {
//       if (err) {
//         console.log("error in model", err);
//         result(null, err);
//       } else {
//         // console.log("Post updated successfully");
//         result(null, res);
//       }
//     }
//   );
// };



// module.exports = PostTerm;
