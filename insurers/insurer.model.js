const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    profile_id_id: { type: String, required: true },
    comp_name: { type: String, required: true },   
    status: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Insurer', schema);