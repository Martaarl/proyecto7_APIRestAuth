const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const albumSchema = new moongose.Schema({
    title: { type: String, required: true},
    year: {type: Number},
    image: {type: String},
    artist: [{type: mongoose.Types.ObjectId, ref: "Artist", required: true}], 
    
}, {
    timestamps: true,
    collection: "albums"
}
)

const Album = mongoose.model("Album", albumSchema);
module.exports = Album;