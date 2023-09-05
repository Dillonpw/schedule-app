



function generateRotatingSchedule(workDays, offDays, totalDays, startDate) {
    const schedule = [];
    let currentDate = new Date(startDate); // Initialize with the selected start date
    let daysScheduled = 0;


    currentDate.setDate(currentDate.getDate() + 1);

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

function generateSchedule() {
    const workDays = parseInt(document.getElementById('workDays').value, 10);
    const offDays = parseInt(document.getElementById('offDays').value, 10);
    const totalDays = parseInt(document.getElementById('totalDays').value, 10);
    const startDate = document.getElementById('startDate').value;
    const startHint = document.getElementById('startHint');

} 

    const scheduleTable = document.getElementById('scheduleTable');
    scheduleTable.innerHTML = ''; 

    const rotatingSchedule = generateRotatingSchedule(workDays, offDays, totalDays, startDate);

    rotatingSchedule.forEach(entry => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        dateCell.textContent = entry.date;
        const dayOfWeekCell = document.createElement('td');
        dayOfWeekCell.textContent = entry.dayOfWeek;
        const shiftCell = document.createElement('td');
        shiftCell.textContent = entry.shift;
        row.appendChild(dateCell);
        row.appendChild(dayOfWeekCell);
        row.appendChild(shiftCell);
        scheduleTable.appendChild(row);
    });


// Add an event listener to the button to trigger the schedule generation
const generateButton = document.querySelector('button');
generateButton.addEventListener('click', generateSchedule);


// Initial schedule generation
generateSchedule();
