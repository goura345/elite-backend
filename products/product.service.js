const config = require('config.json');
const db = require('_helpers/db');
const Product = db.Product;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    console.log(await Product.find());
    return await Product.find();
    // return await Product.find().sort({ createdAt: -1 }).limit(10);
}

async function getById(id) {
    return await Product.findById(id);
}

async function create(policyParam) {
    console.log(policyParam);
    // validate
    // if (await Product.findOne({ policyId: policyParam.policyId })) {
    //     throw 'Product ID "' + policyParam.policyId + '" is already taken';
    // }

    const product = new Product(policyParam);
    // save Product
    await product.save();


}

async function update(id, userParam) {
    const product = await Product.findById(id);

    // validate
    if (!product) throw 'Product not found';
    if (product.username !== userParam.username && await Product.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to Product
    Object.assign(product, userParam);

    await product.save();
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}