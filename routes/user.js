const { Router } = require("express");
const User = require('../models/user');
const router = Router();

router.get("/signin", (req, res) => {
    return res.render("signin", {
        user: req.user
    });
});

router.get("/signup", (req, res) => {
    // console.log("hii")
    return res.render("signup", {
        user: req.user
    });
});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        // console.log("token", token);
        return res.cookie("token", token).redirect("/");
    }
    catch (error) {
        return res.render("signin", {
            error: "Incorrect Email or Password",
            user: req.user
        });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
});

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect("/");
});

module.exports = router;