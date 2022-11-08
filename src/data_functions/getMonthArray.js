const getMonthArray = (today, currMonth, thisYear) => {

    let monthArray = Array(42);
    const numDaysInMonth = new Date(thisYear, currMonth, 0).getDate(); // get last day of curr month AKA number of days in the month
    let firstDayOfWeek = new Date(thisYear + "-" + currMonth + "-01").getDay();
    const lastMonth = currMonth-1;
    let lastDayOfLastMonth = new Date(thisYear, lastMonth, 0).getDate();

    for (let i = firstDayOfWeek-1; i >= 0; i--) {
        monthArray[i] = {
            date: lastDayOfLastMonth,
            isInMonth: false,
            isToday: false,
            events: []
        }
        lastDayOfLastMonth -= 1;
    }
    
    let count = 1;
    for (let i = firstDayOfWeek; i < numDaysInMonth+firstDayOfWeek; i++) {
        let checkToday = false;
        if (today === count) {
            checkToday = true;
        }
        monthArray[i] = {
            date: count,
            isInMonth: true,
            isToday: checkToday,
            events: []
        }
        count += 1;
    }

    count = 1;
    for (let i = numDaysInMonth+firstDayOfWeek; i < 42; i++) {
        monthArray[i] = {
            date: count,
            isInMonth: false,
            isToday: false,
            events: []
        }
        count += 1;
    }

    // console.log(monthArray);

    let weekCount = 0;
    let startWeek = 0;

    for (let i = 0; i < 42; i++) {
        const day = monthArray[i];

        if (day.isToday && day.isInMonth) {
            startWeek = weekCount;
        }

        if ((i+1)%7 === 0) {
            weekCount += 1;
        }
    }

    // console.log(startWeek);

    let startWeekIndex = 0;
    let endWeekIndex = 7;

    switch (startWeek) {
        case 1:
            startWeekIndex = 7;
            endWeekIndex = 14;
            break;
        case 2:
            startWeekIndex = 14;
            endWeekIndex = 21;
            break;
        case 3:
            startWeekIndex = 21;
            endWeekIndex = 28;
            break;
        case 4:
            startWeekIndex = 28;
            endWeekIndex = 35;
            break;
        case 5:
            startWeekIndex = 35;
            endWeekIndex = 42;
            break;
        default:
            break;
    }

    return {
        monthArray: monthArray,
        startWeekIndex: startWeekIndex, 
        endWeekIndex: endWeekIndex
    };

}

export default getMonthArray;