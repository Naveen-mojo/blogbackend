const { post_term } = require('../models')
const db = require('../models')
const { post: Post } = db

// Get All Post
exports.getAllPost = (req, res) => {
  Post.findAll({ where: { PostStatus: 1 }, include: [{ model: post_term, required: true }] }).then(data => {
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