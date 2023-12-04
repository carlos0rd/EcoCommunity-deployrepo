const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const PostSchema = new Schema({
titulo: {
    type: String,
    trim: true,
    required: true
},
descripcion: {
    type: String,
    trim: true,
    required: true
},
imagen: {
    type: String,
    trim: true,
    required: true
},
ubicacion: {
    type: String,
    trim: true
},
etiquetas: {
    type: String,
    trim: true
},
menciones: {
    type: String,
    trim: true
},
tipo: {
    type: String,
    trim: true,
    required: true
},
likes: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    default: []
},
participants: {
    type: [Schema.Types.ObjectId],
    ref: "user",
    default: []
},
fecha: {
 type: Date,
 trim: true
},
user: {
    type:Schema.Types.ObjectId,
    ref: "user",
    required: true
},
comments: {
    type: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        },
        history: {
            type: [String],
            default: []
        }
    }],
    default: []
}
}, {timestamps: true});

module.exports = Mongoose.model("Post", PostSchema);