const {  isAdmin, isAuth } = require("../../middlewares/auth");
const { getUsers, register, login, deleteUser, getUserByName, updateUser, addAlbumToUser } = require("../controllers/users");

const usersRouter = require("express").Router();

usersRouter.get("/", [isAuth , isAdmin], getUsers);
usersRouter.get("/:userName", [isAuth], getUserByName);
usersRouter.put("/:userName", [isAuth, isAdmin], updateUser)
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.put("/userId/albums", addAlbumToUser)
usersRouter.delete("/:userName",[isAuth], deleteUser);


module.exports = usersRouter;