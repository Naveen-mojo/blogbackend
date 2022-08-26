const db = require("../models");
const { term: Term } = db;


// Get Term By Category
exports.termData = (req, res) => {
  Term.findAll({where:{TermStatus:1}}).then(terms=>{
      var result = terms.reduce(function (accum, currentVal) {
          accum[currentVal.TermId] = {
              termID: currentVal.TermId,
              termName: currentVal.TermName,
              termSlug: currentVal.TermSlug,
              termImage: currentVal.TermImage,
              rssFeed: currentVal.RssFeedUrl,
          };
          return accum;
      }, {});

      res.send(result);
  }).catch(err=>{
    res.status(500).send({ message: 'Error while retrieving term' + err })
  })
};


// Get All Term 
exports.getAllTerm = (req, res) => {
  Term.findAll({ where: { TermStatus: 1 } }).then(data => {
    res.status(200).send({ status: 200, success: true, data: data });
  }).catch(err => {
    res.status(500).send({ message: 'Error while retrieving term' + err });
  })
};

// Get Term By ID 
exports.getTermById = (req, res) => {
  id = req.params.id
  Term.findByPk(id).then(data => {
    res.status(200).send({ status: 200, success: true, data: [data] });
  }).catch(err => {
    res.status(500).send({ message: 'Error while retrieving term' + err });
  })
};


// Create Term 
exports.createTerm = (req, res) => {
  if (!req.body.TermName || !req.body.TermSlug) {
    res.status(400).send({
      message: "please fill all required fields"
    })
    return;
  }

  const term = {
    TermName: req.body.TermName,
    TermSlug: req.body.TermSlug,
    TermImage: `http://localhost:5000/upload/${req.file.filename}`,
    ParentId: req.body.ParentId,
    RssFeedUrl: req.body.RssFeedUrl,
    TermStatus: req.body.TermStatus ? req.body.TermStatus : "0"
  };

  Term.create(term)
    .then(data => {
      res.send({ status: 201, success: true, message: data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the term."
      });
    });
}

// Update Term
exports.updateTerm = (req, res) => {
  const id = req.params.id;

  const term = {
    TermName: req.body.TermName,
    TermSlug: req.body.TermSlug,
    TermImage: req.file ? `http://localhost:5000/upload/${req.file.filename}` : req.body.TermImage,
    ParentId: req.body.ParentId,
    RssFeedUrl: req.body.RssFeedUrl,
    TermStatus: req.body.TermStatus ? req.body.TermStatus : "0"
  };

  Term.update(term, {
    where: { TermId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Term was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Term with id=${id}. Maybe Term was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Term with id=" + id
      });
    });
};

// Delete Term 
exports.deleteTerm = (req, res) => {
  const id = req.params.id;
  Term.destroy({
    where: { TermId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Term was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Term with id=${id}. Maybe Term was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Term with id=" + id
      });
    });
};

// Get Term By Pagination 
exports.findTermPagination = (req, res) => {

  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: term } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, term, totalPages, currentPage };
  };

  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Term.findAndCountAll({ where: { TermStatus: 1 }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving term."
      });
    });
};

// Search In Term 
exports.searchTerm = (req, res) => {
  const Op = db.Sequelize.Op;
  const q = req.query.q;
  Term.findAll({ where: { TermName: { [Op.like]: `%${q}%` }, TermStatus: 1 } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving term."
      });
    });
};