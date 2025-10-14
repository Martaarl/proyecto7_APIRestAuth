const Album = require("../models/albums")

const getAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find().populate("artist");
        return res.status(200).json(albums);
    } catch (error) {
        return res.status(400).json({error: error.message});
        };
    
}

const getAlbumById = async (req, res, next) => {
    try {
       const { id } = req.params;
       const album = await Album.findById(id).populate("artist");

       if (!album) {return res.status(404).json("No se ha encontrado este álbum")};

       return res.status(200).json(album);

    } catch (error) {
        return res.status(400).json("Error en la solicitud id");
    }
}


const postAlbum = async (req, res, next) => {
    try {
        const newAlbum = new Album(req.body);
        const albumSaved = await newAlbum.save();
        return res.status(201).json(albumSaved);
    } catch (error) {
        return res.status(400).json("Error creando al personaje");
    }
}

const putAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allAlbum = await Album.findById(id);
        
        if (!allAlbum) { return res.status(404).json("No se ha encontrado el álbum a actualizar")};

        let newAlbum = new Album(req.body);
        newAlbum = {
            _id: id,
            title: req.body.title || allAlbum.title,
            year: req.body.year || allAlbum.year,
            image: req.body.image || allAlbum.image, 
            artist: [...allAlbum.artist]
        }

        if(req.body.artist && Array.isArray(req.body.artist)){
        newAlbum.artist = [...allAlbum.artist, ...req.body.artist];
        }

        const albumsUpdated = await Album.findByIdAndUpdate(id, newAlbum, {
            new: true,
        });
        return res.status(200).json(albumsUpdated);
    } catch (error) {
        return res.status(400).json("Error al actualizar el álbum");
    }
}


const deleteAlbum = async (req, res, next) => {
    try {
       const {id} = req.params;
       const albumsDeleted = await Album.findByIdAndDelete(id);

        if (!albumsDeleted) {return res.status(404).json("No se encuentra el álbum que intentas eliminar")}

       return res.status(200).json(albumsDeleted);
    } catch (error) {
        return res.status(400).json("Error al eliminar el álbum")
    }
}

module.exports={
    getAlbums,
    getAlbumById,
    postAlbum,
    putAlbum,
    deleteAlbum}

