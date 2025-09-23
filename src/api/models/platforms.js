const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const platformsSchema = new moongose.Schema({
    name: { type: String, required: true},
    image: { type: String, required: true},
    movies: [{type: mongoose.Types.ObjectId, ref: "Character", required: false}], 
    
}, {
    timestamps: true,
    collection: "platforms"
}
)

const Platforms = mongoose.model("Platforms", platformsSchema);
module.exports = Platforms;