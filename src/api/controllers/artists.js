const Artist = require("../models/artists");

const getArtist = async (req, res, next) => {
    try {
        const artists = await Artist.find().populate("albums");
        return res.status(200).json(artists);
    } catch (error) {
        return res.status(400).json("Error al obtener los artistas");
    }
}

const getArtistById = async (req, res, next) => {
    try {
       const { id } = req.params;
       const artist = await Artist.findById(id).populate("albums");

       if (!artist){ return res.status(404).json("no se ha encontrado al artista")}

       return res.status(200).json(artist);
    } catch (error) {
        return res.status(400).json("Error en la solicitud id del artista");
    }
}

const postArtist = async (req, res, next) => {

    console.log("POST /artists llamado");
    console.log("REQ.BODY:", req.body);

    try {
        const newArtist = new Artist(req.body);
        const artistSaved = await newArtist.save();
        return res.status(201).json(artistSaved);

    } catch (error) {
        console.error("ERROR:", error)
        return res.status(400).json( "Error al crear el artista");
    }
}

const putArtist = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allArtist= await Artist.findById(id);

        if (!allArtist) {
            return res.status(404).json("No se ha encontrado al artista")
        }

        let newArtist= new Artist(req.body)

        newArtist = {
            _id: id,
            name: allArtist.name,
            image: allArtist.image,
            genre: allArtist.genre,
            albums: [...allArtist.albums]
        };

         if(req.body.albums && Array.isArray(req.body.albums)){
        newArtist.albums = [...allArtist.albums, ...req.body.albums];
        }

        const artistUpdated = await Artist.findByIdAndUpdate(id, newArtist, {
            new: true,
        });
        
        return res.status(200).json(artistUpdated);
    } catch (error) {
        return res.status(400).json("Error al actualizar el artista");
    }
}


const deleteArtist = async (req, res, next) => {
    try {
       const {id} = req.params;
       const artistDeleted = await Artist.findByIdAndDelete(id);

       if(!artistDeleted){return res.status(404).json("No se encuentra el artista que deseas eliminar")}

       return res.status(200).json(artistDeleted);
    } catch (error) {
        return res.status(400).json("Error al eliminar al artista")
    }
}

module.exports={
    getArtist,
    getArtistById,
    postArtist,
    putArtist,
    deleteArtist
}

