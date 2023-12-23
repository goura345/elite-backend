require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const compression = require('compression');

// Use compression & other middlewares
app.use(compression({ level: 9 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
app.use(jwt());
// api routes
app.use('/users', require('./users/users.controller'));
app.use('/agents', require('./agents/agent.controller'));
app.use('/insurers', require('./insurers/insurer.controller'));
app.use('/products', require('./products/product.controller'));
app.use('/policies', require('./policies/policy.controller'));

// This should be placed to their services but due to some lazy loading errors, are placed here
require('dotenv').config();
const db = require('_helpers/db');
const User = db.User;
const Agent = db.Agent;
const Insurer = db.Insurer;
const Product = db.Product;
const Policy = db.Policy;
app.get('/total-documents', async (req, res) => {
    try {
        const user = await User.countDocuments();
        const agent = await Agent.countDocuments();
        const insurer = await Insurer.countDocuments();
        const product = await Product.countDocuments();
        const policy = await Policy.countDocuments();

        totalDocuments = {
            user: user,
            agent: agent,
            insurer: insurer,
            product: product,
            policy: policy,
        }
        res.json(totalDocuments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// End of the code

app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
