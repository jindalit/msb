
require('../config/dbConnect');
var RequestTypeSchema = new Schema({
    name: { type: String, unique: true },
    modifiedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
}, { timestamp: { createdAt: "createdAt", updatedAt: "modifiedAt" } });

module.exports = mongoose.model("RequestType", RequestTypeSchema);