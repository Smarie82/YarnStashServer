const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { Yarn } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

//CREATE NEW YARN STASH
router.post("/create", validateSession, (req, res) => {
  Yarn.create({
    brand: req.body.yarn.brand,
    color: req.body.yarn.color,
    weight: req.body.yarn.weight,
    length: req.body.yarn.length,
    quantity: req.body.yarn.quantity,
    bin: req.body.yarn.bin,
    stitcher: req.user.id,
    userId: req.user.id
  })
    .then((yarn) => {
      res.status(200).json({
        message: `Yarn has been added to stash`,
        log: yarn,
      });
    })
    .catch((err) => res.status(500).json({ err }));
});

//DELETE YARN FROM STASH
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, stitcher: req.user.id } };

  Yarn.destroy(query).then(() =>
    res
      .status(200)
      .json({ message: "Yarn was  deleted from stash" })
  );
});


//VIEW ENTIRE STASH
router.get("/", validateSession, (req, res) => {
  let userid = req.user.id;
  Yarn.findAll({
    where: { stitcher: userid },
  })
    .then((Yarn) => res.status(200).json(Yarn))
    .catch((err) => res.status(500).json({ error: err }));
});

//UPDATE A YARN
router.put("/update/:entryId", validateSession, function (req, res) {
  const updateYarn = {
    brand: req.body.yarn.brand,
    color: req.body.yarn.color,
    weight: req.body.yarn.weight,
    length: req.body.yarn.length,
    quantity: req.body.yarn.quantity,
    bin: req.body.yarn.bin,
    stitcher: req.user.id
  };

  const query = { where: { id: req.params.entryId, stitcher: req.user.id } };

  Yarn.update(updateYarn, query)
    .then((yarn) => res.status(200).json(yarn))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
