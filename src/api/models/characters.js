const moongose = require("mongoose");

const charactersSchema = new moongose.Schema(
    {
        name: {type: String, required: true},
        image: {type: String, required: true},
        movie: {type: String, rquired: true},
        category: {
        type: String, 
        required: true, 
        enum: ["horrorr",
             "drama", 
             "comedy", 
             "action", 
             "science fiction", 
             "thriller", 
             "musical"]
    }
    }, {
        timestamps: true,
        collection: "characters"
    });

const Character = moongose.model("Character", charactersSchema);
module.exports = Character;