const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const parsedToken = token.replace("Bearer ", "");
        console.log(parsedToken);
        
        next();

    } catch (error) {
        return resizeBy.status(400).json("No estás autorizado")
    }
}

module.exports = {isAuth};