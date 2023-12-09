const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String },
    hash: { type: String },
    profile_id_id: { type: String },
    login_id: { type: String },
    staffname: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    status: { type: String },
    profile_image: { type: String },
    mobileNumber: { type: String },
    role: { type: String },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);