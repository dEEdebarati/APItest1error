const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");


module.exports.signUp = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = {};
    user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered!");
    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = user.generateJWT();

    // try {
    const result = await user.save();
    return res.status(201).send({
        message: "Registration successful!",
        token: token,
        user: _.pick(result, ["id", "name", "email"])
    })
    // } catch (error) {
    //     return res.status(500).send("Something wrong!");
    // }
}
module.exports.signIn = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password!");

    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send("Invalid email or password!");

    const token = user.generateJWT();
    return res.status(201).send({
        message: "Login successful!",
        token: token,
        user: _.pick(["id", "name", "email"])
    });
}