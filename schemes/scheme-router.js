const express = require("express");

const Schemes = require("./scheme-model.js");

const router = express.Router({
  mergeParams: true
});

router.get("/", async (req, res) => {
  try {
    const schemes = await Schemes.find();
    res.json(schemes);
  } catch (err) {
    next(err);
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const scheme = await Schemes.findById(id);
    res.json(scheme);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const schemeData = req.body;
    const newScheme = await Schemes.add(schemeData);
    res.status(201).json(newScheme);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Schemes.remove(id);
    res.json({ removed: deleted });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/:id/steps", async (req, res, next) => {
  try {
    const { id } = req.params;
    const steps = await Schemes.findSteps(id);
    res.json(steps);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        Schemes.update(changes, id).then(updatedScheme => {
          res.json(updatedScheme);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update scheme" });
    });
});

router.post("/:id/steps", (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        Schemes.addStep(stepData, id).then(step => {
          res.status(201).json(step);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new step" });
    });
});

module.exports = router;
