const { options } = require("mongoose");
const user = require("../model/User");

exports.save = async (req, res, next) => {
  try {
    const data = {};
    req.body.email ? (data["email"] = req.body.email) : "";
    req.body.name ? (data["name"] = req.body.name) : "";
    req.body.age ? (data["age"] = req.body.age) : "";
    req.body.gender ? (data["gender"] = req.body.gender) : "";

    const users = new user(data);

    const userResp = await users.save();
    res.send({ msg: "Data Saved" });
  } catch (e) {
    res.json({
      msg: "email and name is required",
    });
  }
};

exports.get = async (req, res, next) => {
  const search = {};
  req.body.email ? (search["email"] = req.body.email) : "";
  req.body.id ? (search["_id"] = req.body.id) : "";
  req.body.name ? (search["name"] = req.body.name) : "";
  req.body.age ? (search["age"] = req.body.age) : "";
  req.body.gender ? (search["gender"] = req.body.gender) : "";

  try {
    const result = await user.find(search);
    res.json({ data: result });
  } catch (e) {
    res.json(e);
  }
};

exports.update = async (req, res, next) => {
  const search = {};
  req.body.email ? (search["email"] = req.body.email) : "";
  req.body.name ? (search["name"] = req.body.name) : "";
  req.body.age ? (search["age"] = req.body.age) : "";
  req.body.gender ? (search["gender"] = req.body.gender) : "";

  try {
    const id = req.body.id;
    const result = await user.findOneAndUpdate({ _id: id }, { $set: search });

    res.json({ msg: "Data Updated" });
  } catch (e) {
    res.json(e);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.body.id;
    const result = await user.findOneAndDelete({ _id: id }, options.rawResult);

    res.json({ msg: "Data Deleted", data: result });
  } catch (e) {
    res.json(e);
  }
};
