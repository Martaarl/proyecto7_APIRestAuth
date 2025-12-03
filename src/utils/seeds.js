require('dotenv').config();
const mongoose = require("mongoose");
const Album = require("../api/models/albums");
const Artist = require('../api/models/artists');


const albumsData = [
    {
        title: "Fix you", 
        year: 2005, 
        image: "https://upload.wikimedia.org/wikipedia/en/b/b1/Coldplay_-_Fix_You.jpg", 
        artist: [idColdplay]
    }, 
    {
        title: "Amaneceres", 
        year: 2023, 
        image: "https://t2.genius.com/unsafe/360x360/https%3A%2F%2Fimages.genius.com%2F6513e224826247a1b22584ec8d0f62a6.960x960x1.jpg", 
        artist: [idSFDK]
    }, 
     {
        title: "Stand By Me", 
        year: 1962, 
        image: "https://eltrasterodepalacio.wordpress.com/wp-content/uploads/2013/12/stand-by-me-ben-e-king-04.jpg", 
        artist: [idBenEKing]
    }
   

]
/*
const seedAlbums = async () => {
    try {
       
        await mongoose.connect(process.env.DB_URL);

        for (const album of albumsData) {

            const artistFound = await Artist.findOne({name: album.ArtistName});
            const allAlbums = await Album.findOne({
                title: album.title,
                year: album.year, 

            });
            
            if (!allAlbums){
                await Album.create({
                    ...album,
                    artist: [artistFound._id]
                }
                );
            }
            else {
                console.log("El álbum que intentas crear ya existe")
            }
        }
    }

    catch (error){
        console.log("Error al crear la semilla", error)
    }

    finally {
       await mongoose.disconnect();
    }
}

seedAlbums();
*/