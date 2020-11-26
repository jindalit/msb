require('../config/dbConnect');

var RequestsSchema = new Schema({
    requestTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'RequestType' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    description: { type: String },
    isImmediate: { type: String, default: 'No' },
    quantity: { type: Number, default: 0 },
    jobName: { type: String },
    timeline: { type: String },
    hardwareFilmware: { type: String },
    contactPerson: { type: String },
    shippingAddress: { type: String },
    files: [],
    status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
    reqStatus: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startDate: { type: String },
    endDate: { type: String },
    techContact: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    projectContact: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    modifiedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    history:[]
}, { timestamp: { createdAt: "createdAt", updatedAt: "modifiedAt" } });

module.exports = mongoose.model("Requests", RequestsSchema);