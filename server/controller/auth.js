const bcrypt = require('bcrypt');
const User = require("../models/Account");
const jwt = require("jsonwebtoken");

//สมัครสมาชิก
exports.register = async (req, res) => {
    try {
        const {username,password} = req.body
        var user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('User already exists');
        } else {
            const salt = await bcrypt.genSalt(10);
            user = new User({
                username: username,
                password: password
            });
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            res.send('Registration successful');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

//ล็อคอิน
exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
      var user = await User.findOneAndUpdate({ username }, { new: true });
      if (user && user.enabled) {
        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res.status(400).send("Password Invalid!!");
        }
        // Payload
        const payload = {
          user: {
            username: user.username,
            role: user.role,
            type: "LOGIN"
          },
        };
        // Generate Token
        jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({ token, payload });
        });
      } else {
        return res.status(400).send("User Not found!!!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error!");
    }
  };
