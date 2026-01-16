const User = require("../api/models/users");
const { verifyJwt } = require("../config/jwt");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");

    if (!parsedToken) return res.status(401).json({error: "Token no proporcionado"})

    const {userId} = verifyJwt(parsedToken);
    const user = await User.findById(userId);
    if(!user) return res.status(401).json({error: "Usuario no encontrado"})
    
    user.password = undefined;
    req.user = user;
    next();

    } catch (error) {
        return res.status(401).json({error:"No estás autorizado", details: error.message})
    }};


const isAdmin = async (req, res, next) => {
        if (req.user.rol === "admin") {
        next();
        } else {
            return res.status(403).json ({error:"Solo puedes utilizar esta función si eres administrador"});
        }
    }

module.exports = {authenticate, isAdmin};