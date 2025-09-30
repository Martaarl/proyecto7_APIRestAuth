
const { generateSign } = require("../../config/jwt.js");
const User = require("../models/users.js");
const bcrypt = require("bcrypt");


const lookForUser = async (userName) => {
    const user = await User.findOne({userName});
    return user;
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const register = async (req, res, next) => {
    try {
        const newUser  = new User({
            userName: req.body.userName,
            password: req.body.password, 
            rol: req.body.rol || "user"
        });
        const duplicateUser = await lookForUser(req.body.userName);
        
        if (duplicateUser) {
            return res.status(400).json("Busca otro nombre artista");
        }
        
        const userSaved = await newUser.save();
        return res.status(201).json(userSaved);

    } catch (error) {
         return res.status(400).json(error);
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({userName: req.body.userName});

        if (!user) {
            return res.status(400).json("usuario no existente")
        } 
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = generateSign(user.id);
            return res.status(200).json({user, token});
        } else {
            return res.status(400).json("La contraseña está mal, artista");
        }
        
    } catch (error) {
         return res.status(400).json(error);
    }
}
const deleteUser = async (req, res, next) => {
    try {

        const {userName} = req.params;
        const user = await User.findOne({userName});
        if (!user) {
            return res.status(400),json("No se encuentra al usuario")
        }

        await User.deleteOne({userName})
    } catch (error) {
        res.status(400).json("Errorrrrr")
    }
}

module.exports = {getUsers, register, login, deleteUser};