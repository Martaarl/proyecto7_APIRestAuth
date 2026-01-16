const {  isAdmin, authenticate } = require("../../middlewares/auth");
const { getUsers, register, login, deleteUser, getUserByName, updateUser, addAlbumToUser } = require("../controllers/users");

const usersRouter = require("express").Router();

usersRouter.get("/", [authenticate, isAdmin], getUsers);
usersRouter.get("/:userName", [authenticate], getUserByName);
usersRouter.put("/:userName", [authenticate], updateUser)
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.put("/:userId/albums", [authenticate], addAlbumToUser)
usersRouter.delete("/:userName",[authenticate], deleteUser);


module.exports = usersRouter;