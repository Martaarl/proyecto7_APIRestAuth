require('dotenv').config();
const characters = require("../../src/data/movies");
const mongoose = require("mongoose");
const Character = require("../../src/api/models/characters");

const seedCharacters = async () => {
    try {
        console.log("Conectando a:", process.env.DB_URL);
        await mongoose.connect(process.env.DB_URL);

        for (const char of characters) {
            const allCharacters = await Character.findOne({
                name: char.name,
                movie: char.movie
            });
            
            if (!allCharacters){
                await Character.create(char);
            }
            else {
                console.log("El personaje que intentas crear ya existe")
            }
        }
    }

    catch (error){
        console.log(error)
    }

    finally {
       await mongoose.disconnect();
    }
}

seedCharacters();