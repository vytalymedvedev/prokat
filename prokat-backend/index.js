const express = require('express');
const axios = require('axios');
const cors = require("cors");
const { verifySignature } = require('./middleware/signature-validation');

const BP = require('bp-api').default;  
const bp = new BP('test-a-prokat-vytaly.bpium.ru', 'vytalymedvedev@gmail.com', 'your_pass', 'https', 30000);


const app = express();

const PORT = 8080;
const STOREHOUSE_CATALOG_ID = '14';
const ORDERS_CATALOG_ID = '13';

app.use(express.json());
//for frontend and backend on the same machine
app.use(cors({
    origin: 'http://localhost:9000',
    methods:['GET', 'POST']
}));
app.listen(PORT);


app.post('/webhook/orders', verifySignature, async (req, res) => {
    const { payload } = req.body;
    const { catalogId, recordId } = payload;

    try {
        const { data } = await axios.get('https://test.bpium.ru/api/webrequest/request');

        await bp.patchRecord(catalogId, recordId, {
            '3': data?.value
        });

        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});


app.post('/webhook/storehouse', verifySignature, async (req, res) => {
    const { payload } = req.body;
    const { catalogId, recordId, values } = payload;

    try {
        await bp.postRecord(STOREHOUSE_CATALOG_ID, {
            '3': [{
                catalogId,
                recordId,
            }],
            '4': values['3']
        });

        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});


app.post('/orders', async (req, res) => {
    const { comment } = req.body;
    
    try {
        await bp.postRecord(ORDERS_CATALOG_ID, {
            '3': comment
        });

        res.status(200).send();
    } catch (e) {
        res.status(500).send();
    }
});

