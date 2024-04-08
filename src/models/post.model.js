module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('binge_posts_msts', {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PostTitle: {
      type: Sequelize.STRING,
      required: true
    },
    post_excerpt: {
      type: Sequelize.STRING,
    },
    PostContent: {
      type: Sequelize.TEXT('long'),
      required: true
    },
    PostSlug: {
      type: Sequelize.STRING,
      required: true
    },
    PostViews: {
      type: Sequelize.INTEGER,
    },
    PostThumb: {
      type: Sequelize.STRING,
    },
    PostThumbUrl: {
      type: Sequelize.STRING,
    },
    PostStatus: {
      type: Sequelize.INTEGER,
    },
    MetaTitle: {
      type: Sequelize.STRING,
    },
    MetaKey: {
      type: Sequelize.STRING,
    },
    MetaDesc: {
      type: Sequelize.STRING,
    },
    PostTags: {
      type: Sequelize.STRING,
    },
    Affiliate: {
      type: Sequelize.INTEGER
    }
  }, { timestamps: false })

  return Post;
}















































// var dbConn = require("../../config/db.config");
// var Promise = require("bluebird");

// var Post = function (post) {
//   this.ID = post.ID;
//   this.PostTitle = post.PostTitle;
//   this.post_excerpt = post.post_excerpt;
//   this.PostContent = post.PostContent;
//   this.PostSlug = post.PostSlug;
//   this.CreationDate = new Date();
//   this.PostUpdated = new Date();
//   this.PostViews = post.PostViews;
//   this.PostThumb = post.PostThumb;
//   this.PostThumbUrl = post.PostThumbUrl;
//   this.PostStatus = post.PostStatus;
//   this.MetaTitle = post.MetaTitle;
//   this.MetaKey = post.MetaKey;
//   this.MetaDesc = post.MetaDesc;
//   this.PostTags = post.PostTags;
//   this.Affiliate = post.Affiliate;
//   this.is_deleted = post.is_deleted;
//   // this.CatId = post.CatId;
//   // this.SubCatId = post.SubCatId;
//   // this.PostId = post.PostId;
// };

// // get all posts
// Post.getAllPosts = (result) => {
//   dbConn.query(
//     "SELECT posts.*,post_term.CatId FROM posts INNER JOIN post_term ON post_term.PostId = posts.ID WHERE (is_deleted='0' or is_deleted='')",
//     (err, res) => {
//       if (err) {
//         console.log("Error while fetching posts", err);
//         result(null, err);
//       } else {
//         result(null, res);
//       }
//     }
//   );
// };

// // get post by ID from DB
// Post.getPostByID = (slug, result) => {
//   dbConn.query(
//     "SELECT posts.*,post_term.CatId FROM posts INNER JOIN post_term ON post_term.PostId = posts.ID WHERE (PostSlug=? and (is_deleted='0' or is_deleted=''))",
//     slug,
//     (err, res) => {
//       if (err) {
//         console.log("Error while fetching post by id", err);
//         result(null, err);
//       } else {
//         result(null, res);
//       }
//     }
//   );
// };

// Post.getPostID = (slug, result) => {
//   dbConn.query(
//     `SELECT * FROM posts INNER JOIN post_term ON posts.ID = post_term.PostId WHERE posts.ID = ${slug}`,
//     slug,
//     (err, res) => {
//       if (err) {
//         console.log("Error while fetching post by id", err);
//         result(null, err);
//       } else {
//         result(null, res);
//       }
//     }
//   );
// };

// // create new post
// Post.createPost = (postReqData, result) => {
//   dbConn.query("INSERT INTO posts SET ? ", postReqData, (err, res) => {
//     if (err) {
//       console.log("Error while inserting data", err);
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };

// // update post
// Post.updatePost = (id, postReqData, result) => {
//   dbConn.query(
//     "UPDATE posts SET PostTitle=?,PostContent=?, post_excerpt=?, PostSlug=?, PostUpdated=?, PostViews=?, PostThumb=?, PostThumbUrl=?, PostStatus=?, MetaTitle=?, MetaKey=?, MetaDesc=?, PostTags=?, Affiliate=?, is_deleted=? WHERE ID = ?",
//     [
//       postReqData.PostTitle,
//       postReqData.PostContent,
//       postReqData.post_excerpt,
//       postReqData.PostSlug,
//       postReqData.PostUpdated,
//       postReqData.PostViews,
//       postReqData.PostThumb,
//       postReqData.PostThumbUrl,
//       postReqData.PostStatus,
//       postReqData.MetaTitle,
//       postReqData.MetaKey,
//       postReqData.MetaDesc,
//       postReqData.PostTags,
//       postReqData.Affiliate,
//       postReqData.is_deleted,
//       id,
//     ],
//     (err, res) => {
//       if (err) {
//         console.log("Error while updating the post");
//         result(null, err);
//       } else {
//         // console.log("Post updated successfully");
//         result(null, res);
//       }
//     }
//   );
// };

// // delete post
// Post.deletePost = (id, result) => {
//   // dbConn.query('DELETE FROM posts WHERE id=?', [id], (err, res)=>{
//   //     if(err){
//   // console.log('Error while deleting the post');
//   //         result(null, err);
//   //     }else{
//   //         result(null, res);
//   //     }
//   // })
//   dbConn.query(
//     "UPDATE posts SET is_deleted=? WHERE ID = ?",
//     [1, id],
//     (err, res) => {
//       if (err) {
//         console.log("Error while deleting the post");
//         result(null, err);
//       } else {
//         // console.log("Post deleted successfully");
//         result(null, res);
//       }
//     }
//   );
// };

// // get all posts
// // Post.getAllPostsPagination = (prodsQuery, result) => {
// //     dbConn.query(prodsQuery, (err, res) => {
// //         if (err) {
// //             result(null, err);
// //         } else {
// //             result(null, res);
// //         }
// //     })
// // }

// Post.paginationDataModel = (numPerPage, page, result) => {
//   var queryAsync = Promise.promisify(dbConn.query.bind(dbConn));

//   var numRows;
//   // var queryPagination;
//   var numPages;
//   var skip = page * numPerPage;
//   // Here we compute the LIMIT parameter for MySQL query
//   var limit = skip + "," + numPerPage;

//   queryAsync(
//     "SELECT COUNT(*) AS numRows FROM posts WHERE (is_deleted='0' or is_deleted='')"
//   )
//     .then(function (results) {
//       numRows = results[0].numRows;
//       numPages = Math.ceil(numRows / numPerPage);
//     })
//     .then(() =>
//       queryAsync(
//         "SELECT posts.*,post_term.CatId FROM posts INNER JOIN post_term ON post_term.PostId = posts.ID WHERE (is_deleted='0' or is_deleted='') LIMIT " +
//           limit
//       )
//     )
//     .then(function (results) {
//       var responsePayload = {
//         results: results,
//       };
//       if (page < numPages) {
//         responsePayload.pagination = {
//           total: numRows,
//           total_pages: numPages,
//           page: page,
//           per_page: numPerPage,
//           previous: page > 0 ? page - 1 : undefined,
//           next: page < numPages - 1 ? page + 1 : undefined,
//         };
//       } else
//         responsePayload.pagination = {
//           err:
//             "queried page " +
//             page +
//             " is >= to maximum page number " +
//             numPages,
//         };
//       result(null, responsePayload);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.json({ err: err });
//     });
// };

// Post.CarouselHomeThumbUrl = (numPerPage, page, result) => {
//   var queryAsync = Promise.promisify(dbConn.query.bind(dbConn));

//   var numRows;
//   var queryPagination;
//   var numPages;
//   var skip = page * numPerPage;
//   // Here we compute the LIMIT parameter for MySQL query
//   var limit = skip + "," + numPerPage;

//   queryAsync(
//     "SELECT COUNT(*) AS numRows FROM posts WHERE (is_deleted='0' or is_deleted='')"
//   )
//     .then(function (results) {
//       numRows = results[0].numRows;
//       numPages = Math.ceil(numRows / numPerPage);
//     })
//     .then(() =>
//       queryAsync(
//         "SELECT posts.ID, PostThumbUrl, PostTitle, CreationDate, PostSlug, PostContent,post_term.CatId FROM posts INNER JOIN post_term ON post_term.PostId = posts.ID WHERE (is_deleted='0' or is_deleted='') LIMIT " +
//           limit
//       )
//     )
//     .then(function (results) {
//       var responsePayload = {
//         results: results,
//       };
//       if (page < numPages) {
//         responsePayload.pagination = {
//           total: numRows,
//           total_pages: numPages,
//           page: page,
//           per_page: numPerPage,
//           previous: page > 0 ? page - 1 : undefined,
//           next: page < numPages - 1 ? page + 1 : undefined,
//         };
//       } else
//         responsePayload.pagination = {
//           err:
//             "queried page " +
//             page +
//             " is >= to maximum page number " +
//             numPages,
//         };
//       result(null, responsePayload);
//     })
//     .catch(function (err) {
//       console.error(err);
//       res.json({ err: err });
//     });
// };

// // serach all posts
// Post.searchAllPosts = (post, result) => {
//   dbConn.query(
//     `SELECT posts.*,post_term.CatId FROM posts INNER JOIN post_term ON post_term.PostId = posts.ID WHERE (PostTitle LIKE '%${post}%' and (is_deleted='0' or is_deleted='') ) `,
//     (err, res) => {
//       if (err) {
//         result(null, err);
//       } else {
//         result(null, res);
//       }
//     }
//   );
// };

// module.exports = Post;
