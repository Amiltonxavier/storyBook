import User from "../model/user";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

export const createUser = async function (req, res) {

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
export const listUser = async function (req, res) {
    const id = req.params.id;

    await User.findOne({ _id: id }, (err, data) => {
        if (err) {
            return res.status(400).json({error: "Usuário não encontrado!"})
        } else {
            return res.status(200).json({data: data})
        }
    })
}

export const deleteUser = async function (req, res) {
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


