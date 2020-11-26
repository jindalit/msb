require('../config/dbConnect');

var UsersSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String},
    email: { type: String},
    phone: { type: String},
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    username: { type: String, unique: true },
    isProjectContact: {type  : Boolean, default : false},
    isTechContact: {type  : Boolean, default : false},
    modifiedAt : { type: Date, default : Date.now },
    createdAt : { type: Date, default : Date.now },
    isActive : {type  : Boolean, default : true },
},{timestamp : {createdAt : "createdAt", updatedAt : "modifiedAt"}});

module.exports = mongoose.model("Users", UsersSchema);