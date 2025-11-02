const Artist = require("../models/artists");

const getArtist = async (req, res, next) => {
    try {
        const artists = await Artist.find().populate("albums");
        return res.status(200).json(artists);
    } catch (error) {
        return res.status(500).json({error: "Error al obtener los artistas", details: error.message});
    }
}

const getArtistById = async (req, res, next) => {
    try {
       const { id } = req.params;
       const artist = await Artist.findById(id).populate("albums");

       if (!artist){ return res.status(404).json("no se ha encontrado al artista")}

       return res.status(200).json(artist);
    } catch (error) {
        return res.status(500).json({error: "Error en la solicitud id del artista", details: error.message});
    }
}

const postArtist = async (req, res, next) => {

    try {
        const newArtist = new Artist(req.body);
        const artistSaved = await newArtist.save();
        return res.status(201).json(artistSaved);

    } catch (error) {
        return res.status(500).json({error: "Error al crear el artista", details: error.message});
    }
}

const putArtist = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allArtist= await Artist.findById(id);

        if (!allArtist) {
            return res.status(404).json("No se ha encontrado al artista")
        }

       const updateArtist= {
        name: allArtist.name,
        image: allArtist.image,
        genre: allArtist.genre
       };

        if(req.body.albums && Array.isArray(req.body.albums)){
        updateArtist.$addToSet = {albums: {$each: req.body.albums}};
        }

        const artistUpdated = await Artist.findByIdAndUpdate(id, updateArtist, {
            new: true,
        });
        
        return res.status(200).json(artistUpdated);
    } catch (error) {
        return res.status(500).json({error: "Error al actualizar el artista", details: error.message});
    }
}


const deleteArtist = async (req, res, next) => {
    try {
       const {id} = req.params;
       const artistDeleted = await Artist.findByIdAndDelete(id);

       if(!artistDeleted){return res.status(404).json("No se encuentra el artista que deseas eliminar")}

       return res.status(200).json(artistDeleted);
    } catch (error) {
        return res.status(500).json({error: "Error al eliminar al artista", details: error.message})
    }
}

module.exports={
    getArtist,
    getArtistById,
    postArtist,
    putArtist,
    deleteArtist
}

