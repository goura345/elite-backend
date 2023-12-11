const config = require('config.json');
const db = require('_helpers/db');
const Policy = db.Policy;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Policy.find().limit(10);
}

async function getById(id) {
    return await Policy.findById(id);
}

async function create(policyParam) {   
    const policy = new Policy(policyParam);
    // save Policy
    await policy.save();
}

async function update(id, userParam) {
    const Policy = await Policy.findById(id);

    // validate
    if (!Policy) throw 'Policy not found';
    if (Policy.username !== userParam.username && await Policy.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to Policy
    Object.assign(Policy, userParam);

    await Policy.save();
}

async function _delete(id) {
    await Policy.findByIdAndRemove(id);
}