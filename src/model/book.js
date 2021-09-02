const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema

const BookSchema = new Schema({
    themebook: {
        type: String,
        required: true,
        min: 6
    },
    author: {
        type: String,
        required: true,
        min: 6
    },
    year: {
        type: Date,
        required: true,
        default: Date.now()
    },
    specialty: {
        type: String,
        required: true,
    },
    book: {
        type: String,
        required: [true, "Uploaded file must have a name"],
    },
    
    user: { type: ObjectId, ref: "User" },
},
{timestamps: true}
)


module.exports = mongoose.model("Book", BookSchema);