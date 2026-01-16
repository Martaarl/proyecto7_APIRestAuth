const {isAdmin, authenticate } = require("../../middlewares/auth");
const express = require("express");
const { getArtistById, getArtist, postArtist, putArtist, deleteArtist } = require("../controllers/artists");


const artistsRouter = express.Router();

artistsRouter.get("/", getArtist);
artistsRouter.get("/:id", getArtistById);
artistsRouter.post("/", [authenticate, isAdmin], postArtist);
artistsRouter.put("/:id", [authenticate, isAdmin],putArtist);
artistsRouter.delete("/:id",[authenticate, isAdmin],deleteArtist);

module.exports = artistsRouter;