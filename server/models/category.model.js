const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categorySchema = new Schema({
    description: {
        type: String,
        required: [true, 'Description field is mandatory']
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'user'
    }
});

module.exports = mongoose.model("category", categorySchema);
