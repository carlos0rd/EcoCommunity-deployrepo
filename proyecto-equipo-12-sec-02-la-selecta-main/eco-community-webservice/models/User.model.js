const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const crypto = require("crypto");
const debug = require("debug")("app:user-model");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String
    },
    tokens: {
        type: [String],
        default: []
    },
    roles: {
        type: [String],
        default: []
    },
    savedPosts:{
        type: [Schema.Types.ObjectId],
        ref: "Post",
        default: []
    }
    //Arreglo de participaciones de post?
    //
}, { timestamps: true})

userSchema.methods = {
    encryptedPassword: function(password){
        if(!password) return "";

        try {
            const _password = crypto.pbkdf2Sync(
                password,
                this.salt,
                1000, 64, 
                `sha512`
            ).toString("hex");

            return _password;
        } catch (error) {
            debug({ error });
            return "";
        }
    },
    makeSalt: function() {
        return crypto.randomBytes(16).toString("hex");
    },
    comparePassword: function(password) {
        return this.hashedPassword === this.encryptedPassword(password);
    }
}

userSchema
    .virtual("password")
    .set(function(password = crypto.randomBytes(16).toString()) {
        this.salt = this.makeSalt()
        this.hashedPassword = this.encryptedPassword(password);
});

userSchema.methods.changeProfilePicture = async function(imageURL) {
    try {
        this.profilePicture = imageURL;
        await this.save();
        return this.profilePicture;
    } catch (error) {
        throw error;
    }
};

module.exports = Mongoose.model("user", userSchema);