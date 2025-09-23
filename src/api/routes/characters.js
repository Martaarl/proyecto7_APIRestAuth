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
characterRouter.post("/", postCharacters);
characterRouter.put("/:id", putCharacters);
characterRouter.delete("/:id", deleteCharacters);


module.exports = characterRouter;