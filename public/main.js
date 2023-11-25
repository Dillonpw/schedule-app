function generateRotatingSchedule(workDays, offDays, totalDays, startDate) {
    const schedule = [];
    let currentDate = new Date(
        Date.UTC(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
        )
    );
    let daysScheduled = 0;

    while (daysScheduled < totalDays) {
        const formattedDate = formatDate(currentDate);
        const dayOfWeek = getDayOfWeek(currentDate.getUTCDay());
        const shift =
            daysScheduled % (workDays + offDays) < workDays ? 'Work' : 'Off';

        schedule.push({ date: formattedDate, dayOfWeek, shift });

        daysScheduled++;
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
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
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return days[dayIndex];
}

function generateSchedule() {
    const workDays = parseInt(document.getElementById('workDays').value, 10);
    const offDays = parseInt(document.getElementById('offDays').value, 10);
    const totalDays = parseInt(document.getElementById('totalDays').value, 10);
    const startDateInput = document.getElementById('startDate').value;

    const startDate = new Date(
        parseInt(startDateInput.substring(0, 4), 10),
        parseInt(startDateInput.substring(5, 7), 10) - 1,
        parseInt(startDateInput.substring(8, 10), 10)
    );

    const rotatingSchedule = generateRotatingSchedule(
        workDays,
        offDays,
        totalDays,
        startDate
    );

    renderTableView(rotatingSchedule);
}

function renderTableView(schedule) {
    const scheduleTable = document.getElementById('scheduleTable');
    scheduleTable.innerHTML = '';

    schedule.forEach((entry) => {
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

document.querySelector('button').addEventListener('click', generateSchedule);

// Initial call to populate the schedule on page load
generateSchedule();
