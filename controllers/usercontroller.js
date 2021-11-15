const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();


//USER SIGNUP
router.post("/signup", function (req, res) {
  User.create({
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 10),
    fullname: req.body.user.fullname,
    role: req.body.user.role,
  })
    .then(function createSuccess(user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        user: user,
        message: "User successfully created",
        sessionToken: token,
      });
    })

    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});
//USER LOGIN
router.post("/login", function (req, res) {
  User.findOne({ where: { email: req.body.user.email } })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.user.password,
          user.password,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24,
              });
              res.status(200).json({
                user: user,
                message: "Stitcher successfully logged in!",
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: "Login failed" });
            }
          }
        );
      } else {
        res.status(500).json({ error: "Stitcher does not exist." });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;

// router.post("/create",  async function (req, res) {
//   try{
//     User.create({
//       fullname: req.body.user.fullname,
//       password: bcrypt.hashSync(req.body.user.password, 10),
//       email: req.body.user.email,
//       role: req.body.user.role
//     })
//     .then(function createSuccess(user) {
//       let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//         expiresIn: 60 * 60 * 24,
//       });
//       res.json({
//         user: user,
//         message: "Stitcher successfully created",
//         sessionToken: token,
//       });
//     })
//   }catch(e){
//     res.status(500).json({message: e.message})
//   }
 
// });

// router.post("/login", async function (req, res) {
//   try{

//   }catch(e){
//     res.status(500).json({message: e.message})
//   }
// });