const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let recentActivities = [
    { id: '1', category: 'Groceries', date: '2024-12-01', amount: 50.00, paymentMethod: 'Credit Card', status: 'Completed' },
    { id: '2', category: 'Entertainment', date: '2024-12-03', amount: 30.00, paymentMethod: 'PayPal', status: 'Completed' },
    { id: '3', category: 'Utilities', date: '2024-12-05', amount: 120.00, paymentMethod: 'Debit Card', status: 'Pending' },
];

app.get('/api/recent-activity', (req, res) => {
    res.json(recentActivities);
});

app.post('/api/recent-activity', (req, res) => {
    const { category, date, amount, paymentMethod, status } = req.body;
    const newActivity = {
        id: (recentActivities.length + 1).toString(),
        category,
        date,
        amount,
        paymentMethod,
        status
    };
    recentActivities.push(newActivity);
    res.status(201).json(newActivity);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});