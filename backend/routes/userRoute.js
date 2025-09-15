const express = require('express');
const router = express.Router();
const userModel = require('../model/userData');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }
        //jwt token generation
        //if user is found, check password
        try {
            if (user.password == req.body.password) {
                const payload = { email: req.body.email, password: req.body.password };
                const token = jwt.sign(payload, "secert");
                res.status(200).send({ message: "Login Successfull", token: token });
            }
        }
        catch (error) {
            console.error(error)
            res.status(500).send({ message: "error" });
        }
    })
module.exports = router;