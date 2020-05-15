var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is mandatory']
    },
    unitPrice: {
        type: Number,
        required: [true, 'Unit Price is mandatory'],
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('product', productoSchema);
