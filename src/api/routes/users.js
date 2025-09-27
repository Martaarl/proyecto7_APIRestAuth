const { isAuth } = require("../../middlewares/auth");
const { getUsers, register, login } = require("../controllers/users");

const usersRouter = require("express").Router();

usersRouter.get("/", [isAuth], getUsers);
usersRouter.post("/register", register);
usersRouter.post("/login", login);


module.exports = usersRouter;