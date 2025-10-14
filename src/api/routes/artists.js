const { isAuth, isAdmin } = require("../../middlewares/auth");
const express = require("express");
const { getArtistById, getArtist, postArtist, putArtist, deleteArtist } = require("../controllers/artists");


const artistsRouter = express.Router();

artistsRouter.get("/:id", getArtistById);
artistsRouter.get("/", getArtist);
artistsRouter.post("/", postArtist);
artistsRouter.put("/:id", putArtist);
artistsRouter.delete("/:id",deleteArtist);


module.exports = artistsRouter;