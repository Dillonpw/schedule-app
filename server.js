const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/generateSchedule', (req, res) => {
    const schedule = generateRotatingSchedule(
        parseInt(req.query.workDays, 10),
        parseInt(req.query.offDays, 10),
        parseInt(req.query.totalDays, 10),
        req.query.startDate
    );

    res.json(schedule);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
