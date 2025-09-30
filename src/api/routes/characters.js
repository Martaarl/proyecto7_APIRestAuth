const { isAuth, isAdmin } = require("../../middlewares/auth");
const express = require("express");
const { getCharacters, getCharactersById, getCharactersByMovie, putCharacters, postCharacters, deleteCharacters } = require("../controllers/characters");

getCharacters
getCharactersById
getCharactersByMovie
putCharacters
postCharacters
deleteCharacters

const characterRouter = express.Router();

characterRouter.get("/movie/:movie", getCharactersByMovie)
characterRouter.get("/:id", getCharactersById);
characterRouter.get("/", getCharacters);
characterRouter.post("/", [isAuth] ,postCharacters);
characterRouter.put("/:id",[isAdmin], putCharacters);
characterRouter.delete("/:id", [isAdmin] ,deleteCharacters);


module.exports = characterRouter;