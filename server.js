// server.js

const express = require('express');
const fs = require('fs').promises;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/addIOU', async (req, res) => {
    const { item, total, currency, date } = req.body;

    try {
        // Construct the data to append
        const newData = `${item}, ${total} ${currency}, ${date}\n`;

        // Append data to the file
        await fs.appendFile('iou_data.txt', newData);

        res.status(200).json({ message: 'IOU added successfully' });
    } catch (err) {
        console.error('Error writing to file:', err);
        res.status(500).json({ error: 'Failed to add IOU' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
