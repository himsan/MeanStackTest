var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bookdetailsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    datePublished: {
        type: String,
        required: true
    },
    quantityOfBooks: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true

}).set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});


module.exports = mongoose.model('Book', bookdetailsSchema);