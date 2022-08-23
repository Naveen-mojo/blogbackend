const db = require("../models")
const { post_term: PostTerm } = db





































// const PostTermModel = require('../models/postTerm.model');

// // get all post term list
// exports.getPostTermList = (req, res) => {
//     PostTermModel.getAllPostTerm((err, post_term) => {
//         if (err)
//             res.send(err);
//         res.send(post_term)
//     })
// }

// // get post_term by ID
// exports.getPostTermByID = (req, res) => {
//     PostTermModel.getPostTermByID(req.params.id, (err, post_term) => {
//         if (err)
//             res.send(err);
//         res.send(post_term);
//     })
// }

// create new post_term
// exports.createNewPostTerm = (req, res) => {
//     const post_termReqData = new PostTermModel(req.body);
//     // check null
//     if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//         res.send(400).send({ success: false, message: 'Please fill all fields' });
//     } else {
//         PostTermModel.createPostTerm(post_termReqData, (err, post_term) => {
//             if (err)
//                 res.send(err);
//             res.json({ status: true, message: 'post_term Created Successfully', data: post_term.insertId })
//         })
//     }
// }


