const { isAdmin, isAuth } = require("../../middlewares/auth");
const express = require("express");
const { getAlbums, getAlbumById, putAlbum, postAlbum, deleteAlbum} = require("../controllers/albums");

const albumsRouter = express.Router();

albumsRouter.get("/", getAlbums);
albumsRouter.get("/:id", getAlbumById);
albumsRouter.post("/", [isAuth , isAdmin], postAlbum);
albumsRouter.put("/:id", [isAuth , isAdmin], putAlbum);
albumsRouter.delete("/:id",[isAuth , isAdmin], deleteAlbum);


module.exports = albumsRouter;