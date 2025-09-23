const Platforms = require("../models/platforms");

const getPlatform = async (req, res, next) => {
    try {
        const platforms = await Platforms.find().populate("movies");
        return res.status(200).json(platforms);
    } catch (error) {
        return res.status(400).json({error: error.message});
        };
    
}

const getPlatformById = async (req, res, next) => {
    try {
       const { id } = req.params;
       const platforms = await Platforms.findById(id).populate("movies");
       return res.status(200).json(platforms);
    } catch (error) {
        return res.status(400).json("Error en la solicitud id");
    }
}


const postPlatform = async (req, res, next) => {
    try {
        const newPlatforms = new Platforms(req.body);
        const platformsSaved = await newPlatforms.save();
        return res.status(201).json(platformsSaved);
    } catch (error) {
        return res.status(400).json("Error creando al personaje");
    }
}

const putPlatform = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allPlatforms = await Platforms.findById(id);
        
        let newPlatforms = new Platforms(req.body);
        newPlatforms = {
            _id: id,
            name: req.body.name || allPlatforms.name,
            image: req.body.image || allPlatforms.image, 
            movies: [...allPlatforms.movies]
        }

        if(req.body.movies && Array.isArray(req.body.movies)){
        newPlatforms.movies = [...allPlatforms.movies, ...req.body.movies];
        }

        const platformsUpdated = await Platforms.findByIdAndUpdate(id, newPlatforms, {
            new: true,
        });
        return res.status(200).json(platformsUpdated);
    } catch (error) {
        return res.status(400).json("Error al actualizar al personaje");
    }
}


const deletePlatform = async (req, res, next) => {
    try {
       const {id} = req.params;
       const platformsDeleted = await Platforms.findByIdAndDelete(id);
       return res.status(200).json(platformsDeleted);
    } catch (error) {
        return res.status(400).json("Error al eliminar al personaje")
    }
}

module.exports={
    getPlatform,
    getPlatformById,
    postPlatform,
    putPlatform,
    deletePlatform}

