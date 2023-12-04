const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {}
  } else {
    res.status(401).json("you can update only your account!");
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user can be deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json("User not found");
    }
  } else {
    res.status(401).json("you can delete only your account!");
  }
});

module.exports = router;
