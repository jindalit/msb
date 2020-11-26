exports = mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
exports = autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const CONFIG = require("./main");
if (CONFIG.dbURL) {
	mongoose.connect(CONFIG.dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
		if (err) {
			console.log("Error in connecting production database : ", err);
			process.exit(0);
		} else {
			console.log(" Database connected");
		}
	});
} else {
	console.log("Env not supported"); process.exit(0);
}
exports = Schema = mongoose.Schema;