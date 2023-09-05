const express = require('express');
const app = express();
const port = 3000; // You can choose any available port

// Serve static files (HTML, CSS, and JavaScript)
app.use(express.static('public')); // Make sure your HTML and JS files are in a 'public' folder

// Define an endpoint to generate the schedule
app.get('/generateSchedule', (req, res) => {
    // Implement the generateRotatingSchedule function and send the schedule as JSON
    const schedule = generateRotatingSchedule(
        parseInt(req.query.workDays, 10),
        parseInt(req.query.offDays, 10),
        parseInt(req.query.totalDays, 10),
        req.query.startDate
    );

    res.json(schedule);
});

// Define a route handler for the root path ("/") to serve your HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/schedule-app/public/index.html'); 
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
