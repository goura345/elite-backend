require('dotenv').config();
const db = require('_helpers/db');
const Payout = db.Payout;

module.exports = {
    getAll,
    getById,  
    create,
    update,
    delete: _delete,   
};


async function getAll() {
    return await Payout.find().sort({ createdAt: -1 })
    // return await Payout.find();
}

async function getById(id) {
    return await Payout.findById(id);
}

async function create(policyParam) {
    const payout = new Payout(policyParam);
    // save Payout
    await payout.save();
}

async function update(id, userParam) {
    const payout = await Payout.findById(id);
    if (!payout) throw 'Payout not found';
    // copy userParam properties to payout
    Object.assign(payout, userParam);
    await payout.save();
}

async function _delete(id) {
    await Payout.findByIdAndRemove(id);
}

