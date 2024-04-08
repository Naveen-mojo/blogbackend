const { authJwt } = require("../middleware");
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/user.controller");
const termController = require("../controllers/term.controller")
const pageController = require("../controllers/page.controller")
const postController = require("../controllers/post.controller")
const sitemapController = require("../controllers/sitemap.controller")
const createsitemap = require("../controllers/createSitemap")
const settingController = require("../controllers/setting.controller")
const dashboardController = require("../controllers/dashboard.controller")

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../upload'),
    filename: function (req, file, cb) {
      // null as first argument means no error
      cb(null, Date.now() + '-' + file.originalname)
    }
  })

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }

  let upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter });

  // Term request 
  app.get("/api/term/all", termController.getAllTerm);

  app.get("/api/term/:id", termController.getTermById);

  app.get("/api/term", termController.findTermPagination);

  app.get("/api/term/search/all", termController.searchTerm);

  app.get("/api/category", termController.termData);

  app.post("/api/create/term", upload.single('TermImage'), termController.createTerm);

  app.put("/api/update/term/:id", upload.single('TermImage'), termController.updateTerm);

  app.delete("/api/delete/term/:id", termController.deleteTerm);


  // Page request
  app.get("/api/page/all", pageController.getAllPages);

  app.get("/api/page/:id", pageController.getPageById);

  app.get("/api/page/slug/:slug", pageController.getPageBySlug);

  app.get("/api/page/search/all", pageController.searchPage);

  app.post("/api/create/page", pageController.createPage);

  app.put("/api/update/page/:id", pageController.updatePage);

  app.delete("/api/delete/page/:id", pageController.deletePage);


  // Post request
  app.get("/api/post/all", postController.getAllPost);

  app.get("/api/post/:id", postController.getPostById);

  app.get("/api/post/search/all", postController.searchPost);





  app.get("/api/post/pagination/all", postController.findPostPagination);



  

  app.get("/api/post/pagination/carousel", postController.findPostcarouselPagination);

  app.get("/:id/:slug", postController.getPostBySlug);

  app.post("/api/create/post", upload.single('PostThumb'), postController.createPost);

  app.put("/api/update/post/:id", upload.single('PostThumb'), postController.updatePost);

  app.delete("/api/delete/:id", postController.deletePost);


  // sitemap request 
  app.get("/api/sitemap/term", sitemapController.getSitemapTerm);

  app.get("/api/sitemap/post", sitemapController.getSitemapPost);

  app.get("/api/sitemap/createxml", createsitemap.getSitemapTermLists);


  // Setting request
  app.get("/api/setting/all", settingController.getAllSetting);

  // Dashboard request
  app.get("/api/dashboard/post", dashboardController.getTotalPost);

  app.get("/api/dashboard/post/active", dashboardController.getActivePost);

  app.get("/api/dashboard/terms", dashboardController.getTerms);


  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
