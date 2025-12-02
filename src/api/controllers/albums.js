const Album = require("../models/albums");


const getAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find().populate("artist");
        return res.status(200).json(albums);
    } catch (error) {
        return res.status(500).json({error: "Error obteniendo los álbumes", details: error.message});
        };
    
}

const getAlbumById = async (req, res, next) => {
    try {
       const { id } = req.params;
       const album = await Album.findById(id).populate("artist");

       if (!album) {return res.status(404).json({error: "No se ha encontrado este álbum", details: error.message})};

       return res.status(200).json(album);
    
    } catch (error) {
        return res.status(500).json({error: "Álbum no encontrado", details: error.message});
    }
}


const postAlbum = async (req, res, next) => {
    try {
        const newAlbum = new Album(req.body);
        const albumSaved = await newAlbum.save();
        return res.status(201).json(albumSaved);
    } catch (error) {
        return res.status(400).json({error: "Error creando el álbum", details: error.message});
    }
}

const putAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allAlbum = await Album.findById(id);
        
        if (!allAlbum) {return res.status(404).json("No se ha encontrado el álbum a actualizar")};
/*
        if(req.body.title) allAlbum.title = req.body.title;
        if(req.body.year) allAlbum.year = req.body.year;
        if(req.body.image) allAlbum.image = req.body.image;

        if(req.body.artist && Array.isArray(req.body.artist)){
            req.body.artist.forEach(artistId => {
                if (!allAlbum.artist.includes(artistId)) {
                    allAlbum.artist.push(artistId);
                }
            });
        }

        const albumsUpdated = await allAlbum.save();
    */
        return res.status(200).json(albumsUpdated);
    } catch (error) {
        return res.status(500).json({error: "Error al actualizar el álbum", details: error.message});
    }
}

const deleteAlbum = async (req, res, next) => {
    try {
       const {id} = req.params;
       const albumsDeleted = await Album.findByIdAndDelete(id);

        if (!albumsDeleted) {return res.status(404).json("No se encuentra el álbum que intentas eliminar")}

       return res.status(200).json(albumsDeleted);
    } catch (error) {
        return res.status(500).json({error: "Error al eliminar el álbum", details: error.message})
    }
}

module.exports={
    getAlbums,
    getAlbumById,
    postAlbum,
    putAlbum,
    deleteAlbum}

