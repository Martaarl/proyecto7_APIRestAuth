
const { error } = require("console");
const { generateSign } = require("../../config/jwt.js");
const User = require("../models/users.js");
const bcrypt = require("bcrypt");


const lookForUser = async (userName) => {
    const user = await User.findOne({userName});
    if (!user) {
        throw new Error ("No se encuentra a este usuario");
    }
    return user;
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        users.forEach(user =>{user.password = undefined;})
        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json({error: "Error obteniendo usuarios", details: error.message});
    }
}

const getUserByName = async (req, res, next) => {
    try {
        const {userName} = req.params;
        let user;
        try {
            user = await lookForUser(userName);
        } catch (error) {
            return res.status(404).json(error.message);
        }

        if (req.user.rol !== "admin" && req.user.userName !== userName) {
            return res.status(403).json({message: "No tienes permisos para ver este usuario"})
        }

        user.password = undefined;

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({error: "Error al actualizar el usuario", details: error.message})
    }
}

const updateUser = async (req, res, next) => {
    try {
        const {userName} = req.params;
        const {rol, newUserName, password} = req.body;

        let userToUpdate;
        try {
            userToUpdate = await lookForUser(userName);
        } catch (error) {
            return res.status(404).json(error.message);
        }

        const isAdmin = req.user.rol === "admin";
        const isSameUser = req.user.userName === userName;

        if (!isAdmin && !isSameUser) {
            return res.status(403).json("No tienes permisos para actualizar este usuario");
        }
    
        if (newUserName) {
            if (!isAdmin && !isSameUser) {
                return res.status(403).json("No tienes permisos para actualizar este usuario");}

            const existingUser = await User.findOne({userName : newUserName })
            if (existingUser) {
                return res.status(400).json("Ese nombre de usuario ya existe")}

            userToUpdate.userName = newUserName;
        }

        if (password) {
            if (!isSameUser) {
                return res.status(403).json({error: "Solo el propio usuario puede cambiar la contraseña", details: error.message})
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            userToUpdate.password = hashedPassword;
        }

        if (rol) {
            if (!isAdmin) {
                return res.status(403).json("Solo un admin puede cambiar el rol")
            }
            if (!["user", "admin"].includes(rol)) {
                return res.status(400).json("Rol no válido")
            }
            userToUpdate.rol = rol
        }

        await userToUpdate.save();

        const userToShow = {
            _id: userToShow._id,
            userName: userToShow.userName,
            rol: userToShow.rol
        }

        return res.status(200).json({message: "Rol actualizado", userToShow})

    } catch (error) {
        return res.status(500).json({error: "Error al actualizar el rol del usuario", details: error.message})
    }
}

const register = async (req, res, next) => {
    try {
        try {
            await lookForUser(req.body.userName);
            return res.status(400).json("Este usuario ya existe");
        } catch (error) {
            
        }
        const newUser  = new User({
            userName: req.body.userName,
            password: req.body.password, 
            rol: "user"
        });
        
        const userSaved = await newUser.save();

        const userShowed = {
            _id: userSaved._id,
            userName: userSaved.userName,
            rol: userSaved.rol,
        }
        return res.status(201).json(userShowed);

    } catch (error) {
         return res.status(500).json({error: "Error registrando el usuario", details: error.message});
    }
}

const login = async (req, res, next) => {
    try {
        let user;
        try {
            user = await lookForUser(req.body.userName);
        } catch (error) {
            return res.status(400).json("Usuario no existente");
        }
        
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).json("Contraseña incorrecta")
        }
        
        const token = generateSign(user.id)

        const userToReturn = {
            _id: user._id,
            userName: user.userName,
            rol: user.rol
        
        }
    return res.status(200).json({userToReturn, token});
        
    } catch (error) {
         return res.status(500).json({error: "Error logeando", details: error.message});
    }
}


const addAlbumToUser = async (req, res, next) => {
    try {
    const {userId} = req.params;
    const {albumId} = req.body;

    if (!albumId) {
        return res.status(403).json({error: "No se encuentra este album"})
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({error: "Usuario no encontrado"})
    }

    if (req.user.rol !== "admin" && req.user._id.toString() !== userId) {
        return res.status(403).json({error: "No tienes permisos para modificar este usuario"})
    }

    if (!user.favoriteAlbums.includes(albumId)) {
        user.favoriteAlbums.push(albumId);
        await user.save();
    }
    return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({error: "Error añadiendo el álbum", details: error.message})
    }
}

const deleteUser = async (req, res, next) => {
    try {

        const {userName} = req.params;
        let user = await lookForUser(userName);
        try {
            user = await lookForUser(userName);
        } catch (error) {
            return res.status(404).json(error.message)
        }

        if(req.user.rol !=="admin" && req.user.userName !== userName){
            return res.status(403).json("No tienes permisos para eliminar a este usuario")
        }

        await User.deleteOne({userName})
        return res.status(200).json({message: "Usuario eliminado correctamente"})
    } catch (error) {
        res.status(500).json({error:"Error al eliminar el usuario", details: error.message})
    }
}

module.exports = {getUsers, getUserByName, updateUser, register, login,addAlbumToUser, deleteUser};