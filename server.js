const express = require('express');
const app = express();
const port = 3000;

// Define the functions for generating the schedule
function generateRotatingSchedule(workDays, offDays, totalDays, startDate) {
    const schedule = [];
    let currentDate = new Date(startDate); // Initialize with the selected start date
    let daysScheduled = 0;

    while (daysScheduled < totalDays) {
        const formattedDate = formatDate(currentDate);
        const dayOfWeek = getDayOfWeek(currentDate.getDay());
        const shift = daysScheduled % (workDays + offDays) < workDays ? 'Work' : 'Off';

        schedule.push({ date: formattedDate, dayOfWeek, shift });

        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        daysScheduled++;
    }

    return schedule;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getDayOfWeek(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}

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
