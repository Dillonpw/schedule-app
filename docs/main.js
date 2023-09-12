function generateRotatingSchedule(workDays, offDays, totalDays, startDate) {
    const schedule = [];
    let currentDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())); // Initialize with the selected start date
    let daysScheduled = 0;

    while (daysScheduled < totalDays) {
        const formattedDate = formatDate(currentDate);
        const dayOfWeek = getDayOfWeek(currentDate.getUTCDay());
        const shift = daysScheduled % (workDays + offDays) < workDays ? 'Work' : 'Off';

        schedule.push({ date: formattedDate, dayOfWeek, shift });

        daysScheduled++;
        currentDate.setUTCDate(currentDate.getUTCDate() + 1); // Move to the next day
    }

    return schedule;
}

function formatDate(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
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
    const startDateInput = document.getElementById('startDate').value;

    // Parse the start date string into a local date (not UTC)
    const startDate = new Date(
        parseInt(startDateInput.substring(0, 4), 10),
        parseInt(startDateInput.substring(5, 7), 10) - 1, // Month is 0-based
        parseInt(startDateInput.substring(8, 10), 10)
    );

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

    if (document.getElementById('viewToggle').checked) {
        renderCalendar(rotatingSchedule); // Render calendar view if the toggle is on
    } else {
        // Render table view if the toggle is off
        renderTableView(rotatingSchedule);
    }
}

document.getElementById('viewToggle').addEventListener('change', function () {
    const table = document.querySelector('table');
    const calendar = document.getElementById('calendarView');

    if (this.checked) {
        table.style.display = 'none';
        calendar.style.display = 'block';
        generateSchedule(); // Re-generate the schedule to ensure correct rendering
    } else {
        table.style.display = 'block';
        calendar.style.display = 'none';
        generateSchedule(); // Re-generate the schedule to ensure correct rendering
    }
});

function renderCalendar(schedule) {
    const calendarView = document.getElementById('calendarView');
    calendarView.innerHTML = ''; // Clear previous calendar data

    const startDate = new Date(schedule[0].date);
    let currentMonth = startDate.getUTCMonth();
    let currentYear = startDate.getUTCFullYear();

    let monthSchedule = [];
    for (let i = 0; i < schedule.length; i++) {
        const entryDate = new Date(schedule[i].date);
        if (entryDate.getUTCMonth() !== currentMonth) {
            renderMonthCalendar(monthSchedule, currentMonth, currentYear, calendarView);
            monthSchedule = [];
            currentMonth = entryDate.getUTCMonth();
            currentYear = entryDate.getUTCFullYear();
        }
        monthSchedule.push(schedule[i]);
    }
    renderMonthCalendar(monthSchedule, currentMonth, currentYear, calendarView);
}

function renderMonthCalendar(monthSchedule, month, year, calendarView) {
    const monthDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const monthContainer = document.createElement('div');
    const monthHeader = document.createElement('h3');
    monthHeader.textContent = `${monthNames[month]} ${year}`;
    monthContainer.appendChild(monthHeader);

    const daysHeader = document.createElement('div');
    monthDays.forEach(day => {
        const dayElem = document.createElement('span');
        dayElem.textContent = day;
        daysHeader.appendChild(dayElem);
    });
    monthContainer.appendChild(daysHeader);

    let weekRow = document.createElement('div');
    let dayCounter = new Date(year, month, 1).getUTCDay(); // Day of the week for 1st of the month

    // Fill in blanks for days before the 1st of the month
    for (let i = 0; i < dayCounter; i++) {
        const blank = document.createElement('span');
        blank.textContent = '';
        weekRow.appendChild(blank);
    }

    monthSchedule.forEach(entry => {
        if (dayCounter === 7) {
            // A new week starts
            monthContainer.appendChild(weekRow);
            weekRow = document.createElement('div');
            dayCounter = 0;
        }
        const dayElem = document.createElement('span');
        dayElem.textContent = `${new Date(entry.date).getUTCDate()} - ${entry.shift}`;
        weekRow.appendChild(dayElem);
        dayCounter++;
    });

    // If month doesn't end on Saturday, fill in blanks
    while (dayCounter < 7) {
        const blank = document.createElement('span');
        blank.textContent = '';
        weekRow.appendChild(blank);
        dayCounter++;
    }
    monthContainer.appendChild(weekRow); // Append the final week row
    calendarView.appendChild(monthContainer);
}

function renderTableView(schedule) {
    const scheduleTable = document.getElementById('scheduleTable');
    scheduleTable.innerHTML = ''; // Clear previous table data

    schedule.forEach(entry => {
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
}

// Add an event listener to the button to trigger the schedule generation
const generateButton = document.getElementById('generateButton');
generateButton.addEventListener('click', generateSchedule);

// Call generateSchedule initially to populate the table view
generateSchedule
