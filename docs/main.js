const formatDate = (date) =>
    `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
        2,
        '0'
    )}-${String(date.getUTCDate()).padStart(2, '0')}`;

const getDayOfWeek = (dayIndex) => {
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
};

const generateRotatingSchedule = (workDays, offDays, totalDays, startDate) => {
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
};

const updateView = (viewToggleChecked, rotatingSchedule) => {
    const table = document.querySelector('table');
    const calendar = document.getElementById('calendarView');

    if (viewToggleChecked) {
        table.style.display = 'none';
        calendar.style.display = 'block';
        renderCalendar(rotatingSchedule);
    } else {
        table.style.display = 'table';
        calendar.style.display = 'none';
        renderTableView(rotatingSchedule);
    }
};

const generateSchedule = () => {
    const workDays = parseInt(document.getElementById('workDays').value, 10);
    const offDays = parseInt(document.getElementById('offDays').value, 10);
    const totalDays = parseInt(document.getElementById('totalDays').value, 10);
    const [year, month, day] = document
        .getElementById('startDate')
        .value.split('-')
        .map(Number);
    const startDate = new Date(year, month - 1, day);

    const rotatingSchedule = generateRotatingSchedule(
        workDays,
        offDays,
        totalDays,
        startDate
    );

    updateView(document.getElementById('viewToggle').checked, rotatingSchedule);

    // Save inputs to local storage
    localStorage.setItem('workDays', workDays.toString());
    localStorage.setItem('offDays', offDays.toString());
    localStorage.setItem('totalDays', totalDays.toString());
    localStorage.setItem('startDate', `${year}-${month}-${day}`);
};

document.getElementById('viewToggle').addEventListener('change', (event) => {
    updateView(
        event.target.checked,
        generateRotatingSchedule(
            parseInt(document.getElementById('workDays').value, 10),
            parseInt(document.getElementById('offDays').value, 10),
            parseInt(document.getElementById('totalDays').value, 10),
            new Date(
                ...document
                    .getElementById('startDate')
                    .value.split('-')
                    .map(Number)
            )
        )
    );
});

document
    .getElementById('generateButton')
    .addEventListener('click', generateSchedule);

document.addEventListener('DOMContentLoaded', () => {
    // Load inputs from local storage
    const keys = ['workDays', 'offDays', 'totalDays', 'startDate'];
    keys.forEach((key) => {
        const item = localStorage.getItem(key);
        if (item) document.getElementById(key).value = item;
    });

    generateSchedule();
});
