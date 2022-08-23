module.exports = (sequelize, Sequelize) => {
  const Page = sequelize.define("pages", {
    ID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    PageTitle: {
      type: Sequelize.STRING,
      required: true
    },
    PageSlug: {
      type: Sequelize.STRING,
      required: true
    },
    PageContent: {
      type: Sequelize.STRING
    },
    PageStatus: {
      type: Sequelize.INTEGER
    },
    CreationDate: {
      type: Sequelize.DATE
    }
  }, { timestamps: false })
  return Page;
}









































// var dbConn = require("../../config/db.config");

// var About = function (about) {
//   this.ID = about.ID;
//   this.PageTitle = about.PageTitle;
//   this.PageSlug = about.PageSlug;
//   this.PageContent = about.PageContent;
//   this.PageStatus = about.PageStatus ? 1 : 0;
//   this.CreationDate = new Date();
// };

// About.getAllAbout = (result) => {
//   dbConn.query("SELECT * FROM about_page", (err, res) => {
//     if (err) {
//       console.log("Error while fetching about data", err);
//       result(null, err);
//     } else {
//       // console.log('Abouts fetched successfully');
//       result(null, res);
//     }
//   });
// };

// // get pages by ID from DB
// About.getAboutByID = (id, result) => {
//   dbConn.query("SELECT * FROM about_page WHERE (PageSlug=? and PageStatus='0')", id, (err, res) => {
//     if (err) {
//       console.log("Error while fetching pages by id", err);
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };

// About.getAboutByIDAdmin = (id, result) => {
//   dbConn.query("SELECT * FROM about_page WHERE ID=?", id, (err, res) => {
//     if (err) {
//       console.log("Error while fetching pages by id", err);
//       result(null, err);
//     } else {
//       result(null, res);
//     }
//   });
// };

// About.createAbout = (aboutReqData, result) => {
//   dbConn.query("INSERT INTO about_page SET ? ", aboutReqData, (err, res) => {
//     if (err) {
//       console.log("Error while inserting data", err);
//       result(null, err);
//     } else {
//       // console.log('About created successfully');
//       result(null, res);
//     }
//   });
// };

// // update about page
// About.updateAbout = (id, aboutReqData, result) => {
//   dbConn.query(
//     "UPDATE about_page SET PageTitle=?,PageContent=?, PageSlug=?, PageStatus=? WHERE ID = ?",
//     [
//       aboutReqData.PageTitle,
//       aboutReqData.PageContent,
//       aboutReqData.PageSlug,
//       aboutReqData.PageStatus,
//       id,
//     ],
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

// About.deletePage = (id, result) => {
//   dbConn.query(
//     "UPDATE about_page SET PageStatus=? WHERE ID = ?",
//     [0, id],
//     (err, res) => {
//       if (err) {
//         console.log("Error while deleting the about");
//         result(null, err);
//       } else {
//         // console.log("Term deleted successfully");
//         result(null, res);
//       }
//     }
//   );
// };

// // serach all pages
// About.searchAllPages = (page, result) => {
//   dbConn.query(
//     `SELECT * FROM about_page WHERE PageTitle LIKE '%${page}%' `,
//     (err, res) => {
//       if (err) {
//         result(null, err);
//       } else {
//         result(null, res);
//       }
//     }
//   );
// };

// module.exports = About;
