require('dotenv').config();

const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || process.env.CONNECTION_STRING, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Policy: require('../policies/policy.model'),
    Agent: require('../agents/agent.model'),
    Insurer: require('../insurers/insurer.model'),
    Product: require('../products/product.model'),
    Payout: require('../payouts/payout.model'),
};