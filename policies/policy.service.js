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
};


async function getAll() {   
    // return await Policy.find().limit(10);
    return await Policy.find();
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

// async function countDocuments() {

//     const count = await Policy.countDocuments({}).exec();
//     console.log(`Number of documents in the collection: ${count}`);
//     return count 
// }