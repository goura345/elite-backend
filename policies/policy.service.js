require('dotenv').config();
const db = require('_helpers/db');
const Policy = db.Policy;

module.exports = {
    getAll,
    getById,
    getByProposalNumber,
    create,
    update,
    delete: _delete,
    getFromRange

};


async function getAll() {
    return await Policy.find().sort({ createdDate: -1 }).limit(500)
    // return await Policy.find();
}

async function getById(id) {
    return await Policy.findById(id);
}

async function getByProposalNumber(proposal_no) {
    console.log('method was calling....');
    return await Policy.findOne({ proposal_no: proposal_no });
}

async function create(policyParam) {
    const policy = new Policy(policyParam);
    // save Policy
    await policy.save();
}

async function update(id, userParam) {
    const policy = await Policy.findById(id);
    if (!policy) throw 'Policy not found';
    // copy userParam properties to Policy
    Object.assign(policy, userParam);
    await policy.save();
}

async function _delete(id) {
    await Policy.findByIdAndRemove(id);
}

async function getFromRange(frmDate, toDate) {

    const documents = await Policy.find({
        risk_start_date: { $gte: frmDate, $lte: toDate },
    })

    // Format the dates without timezone
    const formattedDates = documents.map(doc => ({
        risk_start_date: doc.risk_start_date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }
        ),
        risk_end_date: doc.risk_end_date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }
        ),

        issue_date: doc.issue_date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }
        ),

        proposal_no: doc.proposal_no,
        policy_no: doc.policy_no,
        customer_name: doc.customer_name,
        insurance_company: doc.insurance_company,
        sp_name: doc.sp_name,
        sp_brokercode: doc.sp_brokercode,
        product_name: doc.product_name,
        registration_no: doc.registration_no,
        rto_state: doc.rto_state,
        rto_city: doc.rto_city,
        vehicle_makeby: doc.vehicle_makeby,
        vehicle_model: doc.vehicle_model,
        vehicle_catagory: doc.vehicle_catagory,
        vehicle_fuel_type: doc.vehicle_fuel_type,
        mfg_year: doc.mfg_year,
        addon: doc.addon,
        ncb: doc.ncb,
        cubic_capacity: doc.cubic_capacity,
        gvw: doc.gvw,
        seating_capacity: doc.seating_capacity,
        coverage_type: doc.coverage_type,
        policy_type: doc.policy_type,
        cpa: doc.cpa,
        insured_age: doc.insured_age,
        policy_term: doc.policy_term,
        bqp: doc.bqp,
        pos_name: doc.pos_name,
        pos: doc.pos,
        employee: doc.employee,

        OD_premium: doc.OD_premium,
        TP_terrorism: doc.TP_terrorism,
        net: doc.net,
        gst_amount: doc.gst_amount,
        gst_gcv_amount: doc.gst_gcv_amount,
        total: doc.total,
        payment_mode: doc.payment_mode,

        proposal: doc.proposal,
        mandate: doc.mandate,
        policy: doc.policy,
        previous_policy: doc.previous_policy,
        pan_card: doc.pan_card,
        aadhar_card: doc.aadhar_card,
        vehicle_rc: doc.vehicle_rc,
        inspection_report: doc.inspection_report,
        status: doc.status,       

    }));

    return formattedDates

}

