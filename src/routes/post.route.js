const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// const postController = require("../controllers/post.controller");
// const postTermController = require("../controllers/postTerm.controller");
const settingController = require("../controllers/setting.controller");
// const termController = require("../controllers/term.controller");
const sitemapController = require("../controllers/sitemap.controller");
const sitemapControllers = require("../controllers/sitemaps.controller");
// const aboutControllers = require("../controllers/about.controller");


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

// testing import
const sitemap = require("../controllers/sitemap");

// get all posts
// router.get("/", postController.getPostList);

// router.get("/post-term", postTermController.getPostTermList);

router.get("/setting", settingController.getAllSettingList);

// router.get("/term", termController.getAllTermList);

// router.get("/pages", aboutControllers.getAboutList);

// testing route
router.get("/create", sitemap.getSiteMapPost);

// router.get("/pages/:id", aboutControllers.getAboutByID);

// router.get("/admin/pages/:id", aboutControllers.getAboutByIDAdmin);

router.get("/createxml", sitemapControllers.getSitemapTermLists);

router.get("/sitemap", sitemapController.getSitemapPostList);

router.get("/sitemapterm", sitemapController.getSitemapTermList);

// router.get("/term/:id", termController.getTermByID);

// router.get("/post-term/:id", postTermController.getPostTermByID);

// router.get("/category", postController.termData);

// router.get("/post/:id", postController.getPostID);

// pagination
// router.get('/all', postController.getAllPostsPagination);
// router.get("/all", postController.pageinationData);
// router.get("/carousel", postController.CarouselHome);
// router.delete("/:id", postController.deletePost);
// router.delete("/pages/:id", aboutControllers.deletePage);
// router.delete("/term/:id", termController.deleteTerm);

// search
// router.get("/search", postController.searchPostList);

// router.get("/search/pages", aboutControllers.searchPageList);
// router.get("/search/category", termController.searchTermList);

// get post by ID
// router.get("/:id/:slug", postController.getPostByID);

router.get("/setting/:id", settingController.getSettingByID);

// router.put("/updateabout/:id", aboutControllers.updateAbout);

// create new post
// router.post("/", upload.single('PostThumb'), postController.createNewPost);

// router.post('/post-term', postTermController.createNewPostTerm);

router.post("/setting", settingController.createNewSetting);

// router.post("/term", upload.single('TermImage'), termController.createNewTerm);

// router.post("/about", aboutControllers.createNewAbout);

// update post
// router.put("/term/:id", termController.updateTerm);

// router.patch("/:id", upload.single('PostThumb'), postController.updatePost);





module.exports = router;
