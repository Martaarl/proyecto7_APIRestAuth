const Character = require("../models/characters");

const getCharacters = async (req, res, next) => {
    try {
        const characters = await Character.find();
        return res.status(200).json(characters);
    } catch (error) {
        return res.status(400).json("Error en la solicitud");
    }
}

const getCharactersById = async (req, res, next) => {
    try {
       const { id } = req.params;
       const characters = await Character.findById(id);
       return res.status(200).json(characters);
    } catch (error) {
        return res.status(400).json("Error en la solicitud id");
    }
}

const getCharactersByMovie = async (req, res, next) => {
    try {
        const {movie} = req.params;
        const characters = await Character.find({movie});
        return res.status(200).json(characters);
    } catch (error) {
        return res.status(400).json("Error en la solicitud ");
    }
}

const postCharacters = async (req, res, next) => {
    try {
        const newCharacter = new Character(req.body);
        const characterSaved = await newCharacter.save();
       
        return res.status(201).json(characterSaved);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const putCharacters = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allCharacters = await Character.findById(id);

        let newCharacter= new Character(req.body)

        newCharacter = {
            _id: id,
            name: allCharacters.name,
            image: allCharacters.image,
            movie: allCharacters.movie,
            category: allCharacters.category
        };

        newCharacter = {...newCharacter, ...req.body};

        const characterUpdated = await Character.findByIdAndUpdate(id, newCharacter, {
            new: true,
        });
        
        return res.status(200).json(characterUpdated);
    } catch (error) {
        return res.status(400).json("Error al actualizar al personaje");
    }
}


const deleteCharacters = async (req, res, next) => {
    try {
       const {id} = req.params;
       const characterDeleted = await Character.findByIdAndDelete(id);
       return res.status(200).json(characterDeleted);
    } catch (error) {
        return res.status(400).json("Error al eliminar al personaje")
    }
}

module.exports={
    getCharacters,
    getCharactersById,
    getCharactersByMovie,
    postCharacters,
    putCharacters,
    deleteCharacters
}

