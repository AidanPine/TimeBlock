import React from 'react';
import { Grid, Typography, IconButton, FormControl, Select, MenuItem, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DOTWRow from './DOTWRow';

const DayItem = (props) => {
    let dateNum;
    let color;
    let circleColor = "#ffffff";
    if (props.day) {
        dateNum = props.day.date;
        color = props.day.isInMonth ? "#000000" : "#aaaaaa";
        if (props.day.isToday) {
            color = "#ffffff";
            circleColor = "#8c52ff";
        }
    } else {
        return;
    }

    const handleClick = e => {
        console.log(dateNum); // return day that is clicked on, soon take to day view of this day
    }

    return (
        <Paper style={{padding: '10px 90px 500px 10px', textAlign: 'center', borderRadius: '0px', color: color}} onClick={handleClick}>
            <div style={{height: '25px', width: '25px', borderRadius: '20px', backgroundColor: circleColor}}>
                {dateNum}
            </div>
        </Paper>
    );
}

const CalendarRow = (props) => {

    // const handleClick = e => {
    //     console.log(props.days);
    // }

    return (
        
        <React.Fragment>
            <Grid item xs={1}>
                <DayItem day={props.days[0]} />
            </Grid>
            <Grid item xs={1}>
                <DayItem day={props.days[1]} />
            </Grid>
            <Grid item xs={1}>
                <DayItem day={props.days[2]} />
            </Grid>
            <Grid item xs={1}>
                <DayItem day={props.days[3]} />
            </Grid>
            <Grid item xs={1}>
                <DayItem day={props.days[4]} />
            </Grid>
            <Grid item xs={1}>
                <DayItem day={props.days[5]} />
            </Grid>
            <Grid item xs={1}>
                <DayItem day={props.days[6]} />
            </Grid>
            
        </React.Fragment>
    );
}

const MonthCalendar = () => {

    const today = new Date().getDate();
    //console.log(today);
    const currMonth = new Date().getMonth()+1;
    //console.log(currMonth);
    const thisYear = new Date().getFullYear();
    //console.log(thisYear);
    // let firstDayOfMonth = 1;
    let currWeek = 1;
    for (let i = 0; i < 42; i++) {
        if (today > 1 && today < i+7) {
            console.log(currWeek);
        } else if (i % 7 === 0) {
            currWeek++;
        }
    }

    let startWeekIndex = 0;
    let endWeekIndex = 0;
    switch (currWeek) {
        case 0:
            startWeekIndex = 0;
            endWeekIndex = 7;
            break;
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

    //console.log(thisWeek);
    // get current month by getting current month from date function
    const months = [
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
        'December'
    ];

    // Get current month and year
    // lets say year = 2022, 
    // month = new Date().getMonth() + 1 -> to make it 10 (maybe 9 bc start at 0)
    // firstDay = new Date(year + "-" + month + "-01").getDay();
    // 0 - Sunday
    // 1 - Monday
    // ...
    // 6 - Saturday

    const [monthIndex, setMonthIndex] = React.useState(currMonth); 
    const [arrayOfDays, setArrayOfDays] = React.useState(Array(42)); // fill array with empty undefined elements
    const [currYear, setCurrYear] = React.useState(thisYear); 
    const [weekStartIndex, setWeekStartIndex] = React.useState(startWeekIndex);
    const [weekEndIndex, setWeekEndIndex] = React.useState(endWeekIndex);

    const getDaysOfMonth = () => {
        let firstDayOfWeek = new Date(currYear + "-" + monthIndex + "-01").getDay(); // to tell which day of the week to start at
        if (monthIndex < currMonth) {
            if (firstDayOfWeek === 0) {
                firstDayOfWeek = 6;
            } else {
                firstDayOfWeek--;
            }
        }
        const lastDay = new Date(currYear, monthIndex, 0).getDate(); // last number to end, days of month
        let updatedArrayOfDays = Array(42); // fill array with 42 empty values
        // based on days between Sunday to first day (lets say Thursday) we skip array at first 4 values
        const lastMonth = monthIndex-1;
        let lastDayOfLastMonth = new Date(currYear, lastMonth, 0).getDate(); // get last date of last month and count backwards to fill beginning of array
        for (let i = firstDayOfWeek; i >= 0 ; i--) {
            updatedArrayOfDays[i] = {
                date: lastDayOfLastMonth,
                isInMonth: false,
                isToday: false,
                events: []
            }
            lastDayOfLastMonth--;
        }

        let count = 1;
        for (let i = firstDayOfWeek+1; i < 42; i++) {
            let isTodaysDate = false;
            if (monthIndex === currMonth && count === today && currYear === thisYear) {
                isTodaysDate = true;
            }
            if (count > lastDay) {
                break;
            } else {
                updatedArrayOfDays[i] = {
                    date: count,
                    isInMonth: true,
                    isToday: isTodaysDate,
                    events: []
                }
                count++;
            }
        }

        let newCount = 1;
        for (let i = count + firstDayOfWeek; i < 42; i++) {
            updatedArrayOfDays[i] = {
                date: newCount,
                isInMonth: false,
                isToday: false,
                events: []
            }
            newCount++;
        }

        // now fill end of array with 1-n days, will never need to check date bc it will always be max a week
        console.log(updatedArrayOfDays);

        setArrayOfDays(updatedArrayOfDays);
    }

    const handleNextWeek = () => {
        if (weekStartIndex < 35) {
            setWeekStartIndex(weekStartIndex + 7);
            setWeekEndIndex(weekEndIndex + 7);
        } else if (weekStartIndex === 35) {
            setMonthIndex(monthIndex + 1);
            setWeekStartIndex(0);
            setWeekEndIndex(7);
        }
        console.log(monthIndex, weekStartIndex, weekEndIndex);
    }

    const handlePrevWeek = () => {
        if (weekStartIndex > 0) {
            setWeekStartIndex(weekStartIndex - 7);
            setWeekEndIndex(weekEndIndex - 7);
        } else if (weekStartIndex === 0) {
            setMonthIndex(monthIndex - 1);
            setWeekStartIndex(35);
            setWeekEndIndex(42);
        }
        //console.log(monthIndex, weekStartIndex, weekEndIndex);
    }

    const handleChangeYear = e => {
        setCurrYear(e.target.value);
    }

    React.useEffect(() => {
        getDaysOfMonth();
    }, [monthIndex, currYear]);

    return (
        <Grid container>
            <Grid item container xs={12}>
                <Grid item xs={4} />
                <Grid item xs={4}>
                    <Typography variant="h5" style={{color: '#ffffff'}}>{months[monthIndex-1]}</Typography>
                </Grid>
                <Grid item xs={4} align="right">
                    <FormControl>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currYear}
                            onChange={handleChangeYear}
                            style={{color: '#ffffff'}}
                            labelStyle={{ color: '#ff0000' }}
                            sx={{
                                color: "white",
                                '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(228, 219, 233, 0.25)',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(228, 219, 233, 0.25)',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(228, 219, 233, 0.25)',
                                },
                                '.MuiSvgIcon-root ': {
                                fill: "white !important",
                                }
                            }}
                        >
                            <MenuItem value={2019} style={{color: '#8C52FF'}}>2019</MenuItem>
                            <MenuItem value={2020} style={{color: '#8C52FF'}}>2020</MenuItem>
                            <MenuItem value={2021} style={{color: '#8C52FF'}}>2021</MenuItem>
                            <MenuItem value={2022} style={{color: '#8C52FF'}}>2022</MenuItem>
                            <MenuItem value={2023} style={{color: '#8C52FF'}}>2023</MenuItem>
                            <MenuItem value={2024} style={{color: '#8C52FF'}}>2024</MenuItem>
                            <MenuItem value={2025} style={{color: '#8C52FF'}}>2025</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{height: '30px'}} />
            <Grid container item xs={12}>
                <Grid item xs={12} container spacing={1}>
                    <DOTWRow />
                </Grid>
                <Grid item xs={12} container spacing={1}>
                <Grid item container spacing={0} xs={12} justifyContent="center">
                    <Grid item xs={1}>
                        <IconButton style={{marginTop: '16px'}} size="large" onClick={handlePrevWeek}>
                            <ArrowBackIosNewIcon style={{color: '#ffffff'}} fontSize="inherit" />
                        </IconButton>
                    </Grid>
                    <CalendarRow days={arrayOfDays.slice(weekStartIndex, weekEndIndex)} />
                    <Grid item xs={1}>
                        <IconButton style={{marginTop: '16px'}} size="large" onClick={handleNextWeek}>
                            <ArrowForwardIosIcon style={{color: '#ffffff'}} fontSize="inherit" />
                        </IconButton>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{height: '100px'}} />
            
        </Grid>
    );
}

export default MonthCalendar;