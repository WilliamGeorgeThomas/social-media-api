const User = require("../models/User");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((user) => (!user ? res.status(404).json({ message: "No user with that ID" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })
      .then((user) => (!user ? res.status(404).json({ message: "No user with that ID" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => (!user ? res.status(404).json({ message: "No user with that ID" }) : res.json({ message: "user deleted" })))
      .catch((err) => res.status(500).json(err));
  },
  //add friend, remove friend

  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true })
      .then((user) => (!user ? res.status(404).json({ message: "No user found with that ID :(" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a student
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: { userId: req.params.friendId } } }, { runValidators: true, new: true })
      .then((user) => (!user ? res.status(404).json({ message: "No user found with that ID :(" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
};
