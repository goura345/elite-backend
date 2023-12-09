const config = require('config.json');
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
    // return await Insurer.find().sort({ createdAt: -1 }).limit(10);
}

async function getById(id) {
    return await Insurer.findById(id);
}

async function create(policyParam) {
    console.log(policyParam);
    // validate
    // if (await Insurer.findOne({ policyId: policyParam.policyId })) {
    //     throw 'Insurer ID "' + policyParam.policyId + '" is already taken';
    // }

    const insurer = new Insurer(policyParam);
    // save Insurer
    await insurer.save();


}

async function update(id, userParam) {
    const insurer = await Insurer.findById(id);

    // validate
    if (!insurer) throw 'Insurer not found';
    if (insurer.username !== userParam.username && await Insurer.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to Insurer
    Object.assign(insurer, userParam);

    await insurer.save();
}

async function _delete(id) {
    await Insurer.findByIdAndRemove(id);
}