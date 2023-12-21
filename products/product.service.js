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
    return await Product.find();
}

async function getById(id) {
    return await Product.findById(id);
}

async function create(policyParam) {
    const product = new Product(policyParam);
    await product.save();
}

async function update(id, userParam) {
    const product = await Product.findById(id);
    if (!product) throw 'Product not found';
    // copy userParam properties to product
    Object.assign(product, userParam);
    await product.save();
}

async function _delete(id) {
    await Product.findByIdAndRemove(id);
}