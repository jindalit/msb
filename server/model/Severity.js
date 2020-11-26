
require('../config/dbConnect');
var SeveritySchema = new Schema({
    value: { type: Number, unique: true },
    modifiedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
}, { timestamp: { createdAt: "createdAt", updatedAt: "modifiedAt" } });

module.exports = mongoose.model("Severity", SeveritySchema);