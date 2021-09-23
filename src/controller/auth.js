const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

export const signin = async function (req, res) {
    const { email, password } = req.body;

    User.findOne({ email }, async function (err, user) {
        if (err || !user) {
            return res.status(400).json({ error: "Verifique por favor o seu Email" })
        }

        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(401).json({ error: "Verifique a sua Senha Por favor" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.cookie("t", token, { expire: new Date() + 999 });

        const { _id, name, email } = user;
        return res.json({ token, user: { _id, name, email } });

    });
    
}


export const requireSignin = (req, res, next) => {
    //console.log(req.headers);
    if (!req.headers["authorization"])
      return next(
        res.status(401).send("Não tem permição para navegar está zona! ")
      );
    const authHeader = req.headers["authorization"];
    const beaderToken = authHeader.split(" ");
    const token = beaderToken[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ error: err });
        next();
      }
  
      req.payload = payload;
      next();
    });
  };