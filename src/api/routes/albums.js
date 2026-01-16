const { isAdmin, authenticate } = require("../../middlewares/auth");
const express = require("express");
const { getAlbums, getAlbumById, putAlbum, postAlbum, deleteAlbum} = require("../controllers/albums");

const albumsRouter = express.Router();

albumsRouter.get("/", getAlbums);
albumsRouter.get("/:id", getAlbumById);
albumsRouter.post("/", [authenticate , isAdmin], postAlbum);
albumsRouter.put("/:id", [authenticate , isAdmin], putAlbum);
albumsRouter.delete("/:id",[authenticate, isAdmin], deleteAlbum);


module.exports = albumsRouter;