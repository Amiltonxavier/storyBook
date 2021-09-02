const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

exports.createUser = async function (req, res) {

    const { username, email, password } = req.body;
    const existEmail = await User.findOne({ email: email })
    if (existEmail) return res.status(400).json({ error: "Email já está snedo usado" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = new User({
        username: username,
        email: email,
        password: hashedPassword
    });

    if (user.name === "" || user.email === "" || user.password === "") {
        return res.status(400).json({error: "Parece que existe uma champo que está vázio"})
    }

    user.save((err, data) => {
        if (err) {
            return res.status(400).json({error: err})
        }
        else {
            return res.status(201).json({data: "Conta criada!"})
        }
    })
}
exports.listUser = async function (req, res) {
    const id = req.params.id;

    await User.findOne({ _id: id }, (err, data) => {
        if (err) {
            return res.status(400).json({error: "Usuário não encontrado!"})
        } else {
            return res.status(200).json({data: data})
        }
    })
}

exports.deleteUser = async function (req, res) {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({error: "Problema com o identificador"})
    }
   const user =  await User.findById({ _id: id });

    if (!user) {
        res.status(400).json({ error: "OCorreu um erro ao Eliminar um usuário" });
    }

    await user.remove();
    res.status(200).json({data: "Eliminado com Sucesso!"})
}


exports.signin = async function (req, res) {
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

exports.requireSignin = (req, res, next) => {
    if (!req.headers["authorization"])
        return next(res.status(401).send("Não tem permissão para avançar"))
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
        })
};