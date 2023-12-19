const db = require('_helpers/db');
const Agent = db.Agent;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await Agent.find();
    // return await Agent.find().sort({ createdAt: -1 }).limit(10);
}

async function getById(id) {
    return await Agent.findById(id);
}

async function create(policyParam) {
    console.log(policyParam);
    // validate
    // if (await Agent.findOne({ policyId: policyParam.policyId })) {
    //     throw 'Agent ID "' + policyParam.policyId + '" is already taken';
    // }

    const agent = new Agent(policyParam);
    // save Agent
    await agent.save();


}

async function update(id, userParam) {
    const Agent = await Agent.findById(id);

    // validate
    if (!Agent) throw 'Agent not found';
    if (Agent.username !== userParam.username && await Agent.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to Agent
    Object.assign(Agent, userParam);

    await Agent.save();
}

async function _delete(id) {
    await Agent.findByIdAndRemove(id);
}