const express = require('express');
const router = express.Router();
const posts = require('../model/blogData');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const jwt = require('jsonwebtoken');// MIDDLWEERE TO PARSE JSON AND URL


function verifyToken(req, res, next) {
    let token = req.headers.token;
    try {
        if (!token) throw 'unauthorised access';
        let payload = jwt.verify(token, "secert");
        if(!payload) throw 'unauthorised access';
        next();
    } catch (error) {
        res.json({ message: error });
    }
}


//get all blogs
router.get('/',async (req, res) => {
    try {
        const data = await posts.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send("Data not found");
    }
})
router.get('/details/:id',async (req, res) => {
    try {
        const data = await posts.findById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send("Data not found");
    }
})
//post new blog
router.post('/add', verifyToken,  async (req, res) => {
    try {
        const post = new posts(req.body); // ✅ create Mongoose document
        const data = await post.save();   // ✅ save to DB
        res.status(200).send({ message: "blog added", blog: data });
    } catch (error) {
        console.error(error);
        res.status(400).send("Failed to post data"); // more descriptive
    }
});

//update data
router.put('/edit/:id',  verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const post = req.body;

        const data = await posts.findByIdAndUpdate(id, post, { new: true });
        if (!data) {
            return res.status(404).send({ message: "Blog not found" });
        }

        res.status(200).send({ message: "Blog updated successfully", blog: data });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to update blog" });
    }
});

//delete user 
router.delete('/delete/:id', verifyToken,  async (req, res) => {
    try {
        const id = req.params.id;
        await posts.findByIdAndDelete(id);
        res.status(200).send({ message: "blog deleted"});
    } catch (error) {
        console.error(error)
        res.status(500).send("failed to delete");
    }
})
module.exports = router;







