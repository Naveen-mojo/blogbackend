const db = require('../models')
const { post: Post } = db

// Get All Post
exports.getAllPost = (req, res) => {
  Post.findAll({ where: { PostStatus: 1 } }).then(data => {
    res.status(200).send({ status: 200, success: true, data: data })
  }).catch(err => {
    res.status(500).send({ message: 'Error while retrieving post' + err })
  })
}

// Get Post By Id
exports.getPostById = (req, res) => {
  id = req.params.id
  Post.findByPk(id).then(data => {
    res.status(200).send({ status: 200, success: true, data: data });
  }).catch(err => {
    res.status(500).send({ message: 'Error while retrieving post' + err });
  })
}

// Create Post
exports.createPost = (req, res) => {
  if (!req.body.PostTitle || !req.body.PostSlug || !req.body.PostContent || !req.body.PostThumb) {
    res.status(400).send({
      message: "please fill all required fields"
    })
    return;
  }

  const post = {
    PostTitle: req.body.PostTitle,
    post_excerpt: req.body.post_excerpt,
    PostContent: req.body.PostContent,
    PostSlug: req.body.PostSlug,
    PostViews: req.body.PostViews,
    PostThumb: `http://localhost:5000/upload/${req.file.filename}`,
    PostThumbUrl: req.body.PostThumbUrl,
    PostStatus: req.body.PostStatus,
    MetaTitle: req.body.MetaTitle,
    MetaKey: req.body.MetaKey,
    MetaDesc: req.body.MetaDesc,
    PostTags: req.body.PostTags,
    is_deleted: req.body.is_deleted,
    Affiliate: req.body.Affiliate,
  };

  Post.create(post)
    .then(data => {
      res.send({ status: 201, success: true, message: data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the post."
      });
    });
}

// Update Post
exports.updatePost = (req, res) => {
  id = req.params.id

  if (!req.body.PostTitle || !req.body.PostSlug || !req.body.PostContent || !req.body.PostThumb) {
    res.status(400).send({
      message: "please fill all required fields"
    })
    return;
  }

  const post = {
    PostTitle: req.body.PostTitle,
    post_excerpt: req.body.post_excerpt,
    PostContent: req.body.PostContent,
    PostSlug: req.body.PostSlug,
    PostViews: req.body.PostViews,
    PostThumb: req.file ? `http://localhost:5000/upload/${req.file.filename}` : req.body.PostThumb,
    PostThumbUrl: req.body.PostThumbUrl,
    PostStatus: req.body.PostStatus,
    MetaTitle: req.body.MetaTitle,
    MetaKey: req.body.MetaKey,
    MetaDesc: req.body.MetaDesc,
    PostTags: req.body.PostTags,
    is_deleted: req.body.is_deleted,
    Affiliate: req.body.Affiliate,
  };

  Post.update(post, {
    where: { ID: id }
  }).then(num => {
    if (num == 1) {
      res.send({ message: "Post Updated successfully" })
    } else {
      res.send({
        message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating Post with id=" + id
    });
  });
}

// Delete Post 
exports.deletePost = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { ID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id
      });
    });
};

// Get Post By Pagination 
exports.findPostPagination = (req, res) => {

  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: post } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, post, totalPages, currentPage };
  };

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Post.findAndCountAll({ where: { PostStatus: 1 }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving post."
      });
    });
};

// Search In Term 
exports.searchPost = (req, res) => {
  const Op = db.Sequelize.Op;
  const q = req.query.q;
  Post.findAll({ where: { PostTitle: { [Op.like]: `%${q}%` }, PostStatus: 1 } })
    .then(data => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.send({ message: "Data not found" });
      }

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving post."
      });
    });
};


















































// const PostModel = require("../models/post.model");
// const PostTermModel = require("../models/postTerm.model");
// const TermModel = require("../models/term.model");


// exports.termData = (req, res) => {
//   TermModel.getAllTerm((err, terms) => {
//     if (err) res.send(err);
//     var result = terms.reduce(function (accum, currentVal) {
//       accum[currentVal.TermId] = {
//         termID: currentVal.TermId,
//         termName: currentVal.TermName,
//         termSlug: currentVal.TermSlug,
//         termImage: currentVal.TermImage,
//         rssFeed: currentVal.RssFeedUrl,
//       };
//       return accum;
//     }, {});

//     res.send(result);
//   });
// };

// // get all post list
// exports.getPostList = (req, res) => {
//   PostModel.getAllPosts((err, posts) => {
//     if (err) res.send(err);
//     res.send(posts);
//   });
// };

// // get post by ID
// exports.getPostByID = (req, res) => {
//   PostModel.getPostByID(req.path.replace("/", ""), (err, post) => {
//     if (err) res.send(err);
//     res.send(post);
//   });
// };

// // get post by ID
// exports.getPostID = (req, res) => {
//   PostModel.getPostID(req.params.id, (err, post) => {
//     if (err) res.send(err);
//     res.send(post);
//   });
// };


// // create new post
// exports.createNewPost = (req, res) => {

//   const postReqData = new PostModel({
//     PostTitle: req.body.PostTitle,
//     post_excerpt: req.body.post_excerpt,
//     PostContent: req.body.PostContent,
//     PostSlug: req.body.PostSlug,
//     PostViews: req.body.PostViews,
//     PostThumb: `http://localhost:5000/upload/${req.file.filename}`,
//     PostThumbUrl: req.body.PostThumbUrl,
//     PostStatus: req.body.PostStatus,
//     MetaTitle: req.body.MetaTitle,
//     MetaKey: req.body.MetaKey,
//     MetaDesc: req.body.MetaDesc,
//     PostTags: req.body.PostTags,
//     is_deleted: req.body.is_deleted,
//     Affiliate: req.body.Affiliate,
//   });

//   // check null
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res.send({
//       status: 400,
//       success: false,
//       message: "Please fill all fields",
//     });
//   } else {
//     PostModel.createPost(postReqData, (err, post) => {
//       if (err) res.send(err);

//       const post_termReqData = new PostTermModel({
//         CatId: req.body.CatId,
//         SubCatId: req.body.SubCatId,
//         PostId: post.insertId,
//       });
//       PostTermModel.createPostTerm(post_termReqData, (err, post_term) => {
//         if (err) res.send(err);
//       });
//       res.json({
//         status: true,
//         message: "Post Created Successfully",
//         data: post.insertId,
//       });
//     });
//   }
// };


// // update post
// exports.updatePost = (req, res) => {

//   const postReqData = new PostModel({
//     PostTitle: req.body.PostTitle,
//     post_excerpt: req.body.post_excerpt,
//     PostContent: req.body.PostContent,
//     PostSlug: req.body.PostSlug,
//     PostViews: req.body.PostViews,
//     PostThumb: `http://localhost:5000/upload/${req.file.filename}`,
//     PostThumbUrl: req.body.PostThumbUrl,
//     PostStatus: req.body.PostStatus,
//     MetaTitle: req.body.MetaTitle,
//     MetaKey: req.body.MetaKey,
//     MetaDesc: req.body.MetaDesc,
//     PostTags: req.body.PostTags,
//     is_deleted: req.body.is_deleted,
//     Affiliate: req.body.Affiliate,
//   });

//   // check null
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res.send(400).send({ success: false, message: "Please fill all fields" });
//   } else {
//     PostModel.updatePost(req.params.id, postReqData, (err, post) => {
//       console.log("postReqData", postReqData);
//       if (err) res.send(err);

//       const post_termReqData = new PostTermModel({
//         CatId: req.body.CatId,
//         SubCatId: req.body.SubCatId,
//         PostId: req.body.PostId,
//       });

//       PostTermModel.updatePostTerm(
//         req.body.PostId,
//         post_termReqData,
//         (err, post_term) => {
//           if (err) res.send(err);
//         }
//       );

//       res.json({ status: true, message: "Post updated Successfully" });
//     });
//   }
// };

// // delete post
// exports.deletePost = (req, res) => {
//   PostModel.deletePost(req.params.id, (err, post) => {
//     if (err) res.send(err);
//     res.json({ success: true, message: "Post deleted successully!" });
//   });
// };

// exports.pageinationData = (req, res) => {
//   var numPerPage = parseInt(req.query.npp, 10) || 1;
//   var page = parseInt(req.query.page, 10) || 0;

//   PostModel.paginationDataModel(numPerPage, page, (err, posts) => {
//     if (err) res.send(err);
//     res.send(posts);
//   });
// };

// exports.CarouselHome = (req, res) => {
//   var numPerPage = parseInt(req.query.npp, 10) || 1;
//   var page = parseInt(req.query.page, 10) || 0;

//   PostModel.CarouselHomeThumbUrl(numPerPage, page, (err, posts) => {
//     if (err) res.send(err);
//     res.send(posts);
//   });
// };

// // search all post list
// exports.searchPostList = (req, res) => {
//   const post = req.query.q;
//   PostModel.searchAllPosts(post, (err, posts) => {
//     if (err) res.send(err);
//     res.send(posts);
//   });
// };
