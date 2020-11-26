
require('../config/dbConnect');
var TourSchema = new Schema({
    comment: { type: String },
    title: { type: String },
    date: { type: String },
    time: { type: String },
    day: { type: String },
    modifiedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
}, { timestamp: { createdAt: "createdAt", updatedAt: "modifiedAt" } });

module.exports = mongoose.model("Tour", TourSchema);