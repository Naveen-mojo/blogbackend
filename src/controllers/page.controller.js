const db = require('../models')
const { pages: Pages } = db

// Get All About
exports.getAllPages = (req, res) => {
  Pages.findAll({ where: { PageStatus: 1 } }).then(data => {
    res.status(200).send({ status: 200, success: true, data: data })
  }).catch(err => {
    res.status(500).send({ messaage: 'Error while retrieving page' + err })
  })
};

// Get Page By Id
exports.getPageById = (req, res) => {
  id = req.params.id
  Pages.findByPk(id).then(data => {
    res.status(200).send({ status: 200, success: true, data: [data] })
  }).catch(err => {
    res.status(500).send({ message: 'Error while retrieving page' + err })
  })
}

// Get Page By Slug
exports.getPageBySlug = (req, res) => {
  slug = req.params.slug
  Pages.findOne({ where: { PageSlug: slug } }).then(data => {
    res.status(200).send({ status: 200, success: true, data: [data] })
  }).catch(err => {
    res.status(500).send({ message: 'Error while retrieving page' + err })
  })
}

// Create Page
exports.createPage = (req, res) => {
  if (!req.body.PageTitle) {
    res.status(400).send({
      message: "please fill all required fields"
    });
    return;
  }

  const page = {
    PageTitle: req.body.PageTitle,
    PageSlug: req.body.PageSlug,
    PageContent: req.body.PageContent,
    PageStatus: req.body.PageStatus,
    CreationDate: new Date()
  }

  Pages.create(page).then(data => {
    res.status(201).send({ status: 201, success: true, data: data })
  }).catch(err => {
    res.status(500).send({ message: 'Error while retrieving page' + err })
  })
}

// Update Page 
exports.updatePage = (req, res) => {
  const id = req.params.id

  if (!req.body.PageTitle || !req.body.PageSlug) {
    res.status(400).send({
      message: "please fill all required fields"
    })
    return;
  }

  const page = {
    PageTitle: req.body.PageTitle,
    PageSlug: req.body.PageSlug,
    PageContent: req.body.PageContent,
    PageStatus: req.body.PageStatus,
    CreationDate: new Date()
  }

  Pages.update(page, {
    where: { ID: id }
  }).then(num => {
    if (num == 1) {
      res.send({ message: "Page Updated successfully" })
    } else {
      res.send({
        message: `Cannot update Page with id=${id}. Maybe Page was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating Page with id=" + id
    });
  });
}

// Delete Page
exports.deletePage = (req, res) => {
  id = req.params.id

  Pages.destroy({ where: { ID: id } }).then(num => {
    if (num == 1) {
      res.send({ message: "Page was deleted successfully!" })
    } else {
      res.send({
        message: `Cannot delete Page with id=${id}. Maybe Page was not found!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete Page with id=" + id
    });
  });
}

// Search In Page 
exports.searchPage = (req, res) => {
  const Op = db.Sequelize.Op;
  const q = req.query.q;
  Pages.findAll({ where: { PageTitle: { [Op.like]: `%${q}%` }, PageStatus: "1" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Page."
      });
    });
};