const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({   
    loginId: { type: String },
    username: { type: String },
    hash: { type: String },   
    firstName: { type: String },
    lastName: { type: String },
    mobileNumber: { type: String },
    email: { type: String },
    profileImageUrl: { type: String,  },
    role: { type: String, default: 'LEAD' },
    status: { type: String, default: 'ACTIVE' },
    createdBy: { type: String },
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