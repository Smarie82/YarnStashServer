const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { Pattern } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

//CREATE NEW PATTERN STASH
router.post("/create", validateSession, (req, res) => {
  Pattern.create({
    project: req.body.pattern.project,
    status: req.body.pattern.status,
    stitcher: req.user.id,
    userId: req.user.id
  })
    .then((pattern) => {
      res.status(200).json({
        message: `Pattern has been added to stash`,
        log: pattern,
      });
    })
    .catch((err) => res.status(500).json({ err }));
});

//DELETE PATTERN FROM STASH
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, stitcher: req.user.id } };

  Pattern.destroy(query).then(() =>
    res
      .status(200)
      .json({ message: "Pattern was deleted from stash" })
  );
});


//VIEW ENTIRE STASH
router.get("/getAll", validateSession, (req, res) => {
  let userid = req.user.id;
  Pattern.findAll({
    where: { stitcher: userid },
  })
    .then((Pattern) => res.status(200).json(Pattern))
    .catch((err) => res.status(500).json({ error: err }));
});

//UPDATE A PATTERN
router.put("/update/:entryId", validateSession, function (req, res) {
  const updatePattern = {
    project: req.body.pattern.project,
    status: req.body.pattern.status,
    stitcher: req.user.id
  };

  const query = { where: { id: req.params.entryId, stitcher: req.user.id } };

  Pattern.update(updatePattern, query)
    .then((pattern) => res.status(200).json(pattern))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
