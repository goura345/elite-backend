const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({   
    payout_name: { type: String },   
    insurance_company: { type: String },   
    product_name: { type: String },   
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
    policy_term: { type: String },
     
    agent_od_reward: { type: String },
    agent_od_amount: { type: String },
    agent_tp_reward: { type: String },
    agent_tp_amount: { type: String },
   
    self_od_reward: { type: String },
    self_od_amount: { type: String },
    self_tp_reward: { type: String },
    self_tp_amount: { type: String },

    remark: { type: String },
   
    status: { type: String },  
    createdBy: { type: String },  
    createdAt: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // delete ret._id;      
    }
});

module.exports = mongoose.model('Payout', schema);