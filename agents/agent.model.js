const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    login_id: { type: String, required: true },
    profile_id_id: { type: String, required: true },
    posp_code: { type: String, required: true },
    registration_code: { type: String, required: true },
    full_name: { type: String, required: true },
    gender: { type: String, required: true },
    email_id: { type: String, required: true },
    mob_no: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    rural_urban: { type: String, required: true },
    slab: { type: String, required: true },
    GSTIN: { type: String, required: true },
    account_no: { type: String, required: true },
    ifsc_code: { type: String, required: true },
    bank_name: { type: String, required: true },
    basic_qualification: { type: String, required: true },
    aadhar_card: { type: String, required: true },
    pan_card: { type: String, required: true },
    training_certificate: { type: String, required: true },
    appointment_certificate: { type: String, required: true },
    agreement_certificate: { type: String, required: true },
    bank_details: { type: String, required: true },
    password: { type: String, required: true },
    created_by: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    status: { type: String, required: true },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

module.exports = mongoose.model('Agent', schema);