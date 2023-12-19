const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({   
    loginId: { type: String, default: '' },
    username: { type: String },
    hash: { type: String },   
    firstName: { type: String },
    lastName: { type: String },
    mobileNumber: { type: String, default: '' },
    profileImageUrl: { type: String, default: '' },
    role: { type: String, default: 'LEAD' },
    status: { type: String, default: 'ACTIVE' },
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