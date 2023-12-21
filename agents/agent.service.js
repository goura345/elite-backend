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
    if (await Agent.findOne({ posp_code: policyParam.posp_code })) {
        throw 'Agent ID "' + policyParam.policyId + '" is already taken';
    }

    const agent = new Agent(policyParam);
    // save Agent
    await agent.save();


}

async function update(id, userParam) {       
    const agent = await Agent.findById(id);
    if (!agent) throw 'Agent not found';
    // copy userParam properties to agent
    Object.assign(agent, userParam);
    await agent.save();
}

async function _delete(id) {
    await Agent.findByIdAndRemove(id);
}