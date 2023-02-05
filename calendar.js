import {default as calendar_template} from "mustache-loader?noShortcut!./calendar.html";

const MONTH_NAMES = [
    'Januar','Februar','März','April','Mai','Juni',
    'Juli','August','September','Oktober','November','Dezember'];

const DAY_CLASSES = {
    prevMonth: 'prev-month',
    free: 'tp-calendar-free-arrival',
    freeWasBusy: 'tp-calendar-busy-free-arrival',
    busy: 'tp-calendar-busy',
    busyWasFree: 'tp-calendar-free-busy-arrival',
};

const DAY_TITLES = {
    free: "Auf Anfrage",
    busy: "Nicht verfügbar"
};

function getDayClass(todayAvailable, prevDayAvailable) {
    const free = todayAvailable;
    const prevFree = prevDayAvailable;
    return free && prevFree ? DAY_CLASSES.free
         : free && !prevFree ? DAY_CLASSES.freeWasBusy
         : !free && prevFree ? DAY_CLASSES.busyWasFree : DAY_CLASSES.busy;
}

/* data required by calendar.html template:

            const calendarData = {
                months: [{
                    monthName: "Februar 2020",
                    weeks: [{
                        days: [{
                            dayClasses: "",
                            dayTitle: "",
                            dayNumber: 1
                        }]
                    }]
                }]
            };
 */

export function show(section) {

    if (section.querySelector(".tp-calendar")) {
        return;
    }

    fetch("calendar-data.json")
        .then(response => {
            if (!response.ok) {
                throw "couldn't load calendar-data.json"
            }
            return response.json();
        })
        .then(response => {

            let targetElement = document.createElement("div");
            section.appendChild(targetElement);

            const freeDays = response[0].free;

            const calendarData = { months: [] };
            let prevDayAvailable = false;

            let startDate = new Date();
            startDate.setDate(1); // first day of month

            let endDate = new Date();
            endDate.setDate(0); // last day of previous month
            endDate.setMonth(endDate.getMonth() + 9); // previous + 9 months

            for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {

                const dayNr = date.getDate();
                const monthNr = date.getMonth();
                const yearNr = date.getFullYear();

                const freeDay = (yearNr % 100) * 10000 + (monthNr + 1) * 100 + dayNr;
                const available = freeDays.includes(freeDay);

                const dayOfWeek = (date.getDay() + 6) % 7; // sunday-first to monday-first

                let month = calendarData.months[calendarData.months.length-1];
                if (date.getDate() === 1) {
                    month = {
                        monthName: MONTH_NAMES[monthNr] + " " + yearNr,
                        weeks: [{ days: [] }]
                    };
                    for (let i = 0; i < dayOfWeek; i++) {
                        month.weeks[0].days.push({
                            dayClasses: "prev-month",
                            dayTitle: "",
                            dayNumber: ""
                        });
                    }
                    calendarData.months.push(month);
                }

                let week = month.weeks[month.weeks.length-1];
                if (dayOfWeek === 0 && week.days) {
                    week = { days: [] };
                    month.weeks.push(week);
                }

                const day = {
                    dayClasses: getDayClass(available, prevDayAvailable),
                    dayTitle: DAY_TITLES[available ? 'free' : 'busy'],
                    dayNumber: date.getDate()
                };
                week.days.push(day);

                prevDayAvailable = available;
            }

            targetElement.outerHTML = calendar_template.render(calendarData);
        })
    ;
}
