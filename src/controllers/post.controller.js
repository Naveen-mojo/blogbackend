const { post_term } = require("../models");
const db = require("../models");
const { post: Post, post_term: PostTerm } = db;

// Get All Post
exports.getAllPost = (req, res) => {
  Post.findAll({
    where: { PostStatus: 1 },
    include: [{ model: post_term, required: true }],
  })
    .then((data) => {
      res.status(200).send({ status: 200, success: true, data: data });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error while retrieving post" + err });
    });
};

// Get Post By Id
exports.getPostById = (req, res) => {
  id = req.params.id;
  Post.findOne({ where: { ID: id }, include: [{ model: post_term, required: true }] })
    .then((data) => {
      res.status(200).send({ status: 200, success: true, data: data });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error while retrieving post" + err });
    });
};

// get post by ID
exports.getPostBySlug = (req, res) => {
  slug = req.path.replace("/", "")
  Post.findOne({ where: { PostSlug: slug }, include: [{ model: post_term, required: true }] })
    .then((data) => {
      res.status(200).send({ status: 200, success: true, data: [data] });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error while retrieving post" + err });
    });
};

// Create Post
exports.createPost = (req, res) => {
  if (
    !req.body.PostTitle ||
    !req.body.PostSlug ||
    !req.body.PostContent
  ) {
    res.status(400).send({
      message: "please fill all required fields",
    });
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
    .then((data) => {

      const post_term = {
        PostId: data.ID,
        CatId: req.body.CatId,
        SubCatId: req.body.SubCatId,
      }

      PostTerm.create(post_term)

      res.status(201).send({ status: 201, success: true, message: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the post.",
      });
    });

};

// Update Post
exports.updatePost = (req, res) => {
  id = req.params.id;

  if (
    !req.body.PostTitle ||
    !req.body.PostSlug ||
    !req.body.PostContent
  ) {
    res.status(400).send({
      message: "please fill all required fields",
    });
    return;
  }

  const post = {
    PostTitle: req.body.PostTitle,
    post_excerpt: req.body.post_excerpt,
    PostContent: req.body.PostContent,
    PostSlug: req.body.PostSlug,
    PostViews: req.body.PostViews,
    PostThumb: req.file
      ? `http://localhost:5000/upload/${req.file.filename}`
      : req.body.PostThumb,
    PostThumbUrl: req.body.PostThumbUrl,
    PostStatus: req.body.PostStatus,
    MetaTitle: req.body.MetaTitle,
    MetaKey: req.body.MetaKey,
    MetaDesc: req.body.MetaDesc,
    PostTags: req.body.PostTags,
    is_deleted: req.body.is_deleted,
    Affiliate: req.body.Affiliate,
  };

  const post_term = {
    PostId: req.body.PostId,
    CatId: req.body.CatId,
    SubCatId: req.body.SubCatId,
  }

  PostTerm.update(post_term, { where: { PostId: id } })

  Post.update(post, {
    where: { ID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({ message: "Post Updated successfully" });
      } else {
        res.status(400).send({
          message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Post with id=" + id,
      });
    });
};

// Delete Post
exports.deletePost = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { ID: id },
  })

  PostTerm.destroy({
    where: { PostId: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post Term was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Post Term with id=${id}. Maybe Post was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post Term with id=" + id,
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
    const { count: total, rows: results } = data;
    const currentPage = page ? +page : 0;
    const total_pages = Math.ceil(total / limit);
    return { results, pagination: { total, total_pages, currentPage } };
  };

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Post.findAndCountAll({ where: { PostStatus: 1 }, include: [{ model: post_term, required: true }], limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      if (response.pagination.currentPage < response.pagination.total_pages) {
        res.send(response);
      } else {
        res.send({ "results": response.results, "pagination": response.pagination = { err: `queried page ${response.pagination.currentPage} is >= to maximum page number ${response.pagination.total_pages}` } });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving post.",
      });
    });
};

exports.findPostcarouselPagination = (req, res) => {
  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };

  const getPagingData = (data, page, limit) => {
    const { count: total, rows: results } = data;
    const currentPage = page ? +page : 0;
    const total_pages = Math.ceil(total / limit);
    return { results, pagination: { total, total_pages, currentPage } };
  };

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Post.findAndCountAll({
    attributes: [
      "ID",
      "PostThumbUrl",
      "PostTitle",
      "createdAt",
      "PostSlug",
      "PostContent",
    ],
    where: { PostStatus: 1 },
    include: [{ model: post_term, required: true }],
    limit,
    offset,
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving post.",
      });
    });
};

// Search In Term
exports.searchPost = (req, res) => {
  const Op = db.Sequelize.Op;
  const q = req.query.q;
  Post.findAll({ where: { PostTitle: { [Op.like]: `%${q}%` }, PostStatus: 1 }, include: [{ model: post_term, required: true }], })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving post.",
      });
    });
};
