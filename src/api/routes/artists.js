const { isAuth, isAdmin } = require("../../middlewares/auth");
const express = require("express");
const { getArtistById, getArtist, postArtist, putArtist, deleteArtist } = require("../controllers/artists");


const artistsRouter = express.Router();

artistsRouter.get("/:id", getArtistById);
artistsRouter.get("/", getArtist);
artistsRouter.post("/", [isAuth, isAdmin], postArtist);
artistsRouter.put("/:id", [isAuth, isAdmin],putArtist);
artistsRouter.delete("/:id",[isAuth, isAdmin],deleteArtist);


module.exports = artistsRouter;