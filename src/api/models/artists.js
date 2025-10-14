const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const artistSchema = new moongose.Schema(
    {
        name: {type: String, required: true},
        genre: {type: String, required: true, 
            enum: [
            "pop", "rock", "jazz", "hip-hop", "indie","electronic", "reggaeton", "classical" ]
        },
        image: {type: String},
        albums: [{type: mongoose.Types.ObjectId, ref: "Album"}]
    }
    , {
        timestamps: true,
        collection: "artists"
    });

const Artist = moongose.model("Artist", artistSchema, "artists");
module.exports = Artist;