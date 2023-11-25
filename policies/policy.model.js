const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    policyid: { type: String, required: true },
    profile_id_id: { type: String },
    proposal_no: { type: String },
    policy_no: { type: String },
    customer_name: { type: String },
    insurance_company: { type: String },
    sp_name: { type: String },
    sp_brokercode: { type: String },
    product_name: { type: String },
    registration_no: { type: String },
    rto_state: { type: String },
    rto_city: { type: String },
    vehicle_makeby: { type: String },
    vehicle_model: { type: String },
    vehicle_catagory: { type: String },
    vehicle_fuel_type: { type: String },
    mfg_year: { type: String },
    addon: { type: String },
    ncb: { type: String },
    cubic_capacity: { type: String },
    gvw: { type: String },
    seating_capacity: { type: String },
    coverage_type: { type: String },
    policy_type: { type: String },
    cpa: { type: String },
    risk_start_date: { type: String },
    risk_end_date: { type: String },
    issue_date: { type: String },
    insured_age: { type: String },
    policy_term: { type: String },
    bqp: { type: String },
    pos: { type: String },
    employee: { type: String },
    OD_premium: { type: String },
    TP_terrorism: { type: String },
    net: { type: String },
    gst_amount: { type: String },
    gst_gcv_amount: { type: String },
    total: { type: String },
    payment_mode: { type: String },
    agent_od_reward: { type: String },
    agent_od_amount: { type: String },
    agent_tp_reward: { type: String },
    agent_tp_amount: { type: String },
    self_od_reward: { type: String },
    self_od_amount: { type: String },
    self_tp_reward: { type: String },
    self_tp_amount: { type: String },
    proposal: { type: String },
    mandate: { type: String },
    policy: { type: String },
    previous_policy: { type: String },
    pan_card: { type: String },
    aadhar_card: { type: String },
    vehicle_rc: { type: String },
    inspection_report: { type: String },
    remark: { type: String },
    status: { type: String },  
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;      
    }
});

module.exports = mongoose.model('Policy', schema);