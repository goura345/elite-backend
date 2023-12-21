const db = require('_helpers/db');
const Insurer = db.Insurer;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Insurer.find();
}

async function getById(id) {
    return await Insurer.findById(id);
}

async function create(policyParam) {
    const insurer = new Insurer(policyParam);
    await insurer.save();
}

async function update(id, userParam) {
    const insurer = await Insurer.findById(id);   
    // copy userParam properties to Insurer
    Object.assign(insurer, userParam);
    await insurer.save();
}

async function _delete(id) {
    await Insurer.findByIdAndRemove(id);
}