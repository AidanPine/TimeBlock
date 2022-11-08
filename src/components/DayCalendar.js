import React from 'react';
import { Grid, Typography, IconButton, FormControl, Select, MenuItem } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DayItem = (props) => {
    let dateNum;
    let circleColor = "#ffffff";
    if (props.day) {
        dateNum = props.day.date;
        if (props.day.isToday) {
            circleColor = "#8c52ff";
        }
    } else {
        return;
    }

    let divs = [];
    for (let i = 0; i < 17; i++) {
        divs.push(
            <div style={{width: '100%', backgroundColor: '#ffffff', height: '39px', borderBottom: '1px solid #eeeeee'}}></div>
        );
    }

    return (
        <div style={{backgroundColor: 'white', height: '600px'}}>

            <div style={{height: '3px'}}></div>
            <div style={{height: '25px', width: '25px', borderRadius: '20px', backgroundColor: circleColor, paddingTop: '2px', marginLeft: '3px'}}>
                {dateNum}
            </div>

            {divs}
            
        </div>
    );
}

const HatchMarks = () => {
    const times = [
        "6am",
        "7am",
        "8am",
        "9am",
        "10am",
        "11am",
        "12pm",
        "1pm",
        "2pm",
        "3pm",
        "4pm",
        "5pm",
        "6pm",
        "7pm",
        "8pm",
        "9pm",
        "10pm",
    ];

    let hatches = [];
    for (let i = 0; i < 16; i++) {
        hatches.push(
            [<div style={{marginLeft: '87.5%', width: '12.5%', backgroundColor: '#220f49', height: '9px', borderBottom: '1px solid #eeeeee'}}></div>,
            <div style={{marginLeft: '75%', width: '25%', backgroundColor: '#220f49', height: '9px', borderBottom: '1px solid #eeeeee'}}></div>,
            <div style={{marginLeft: '87.5%', width: '12.5%', backgroundColor: '#220f49', height: '9px', borderBottom: '1px solid #eeeeee'}}></div>,
            <div style={{width: '50%', float: 'left', height: '9px', color: '#ffffff'}}>{times[i+1]}</div>,
            <div style={{marginLeft: '50%', backgroundColor: '#220f49', height: '9px', borderBottom: '1px solid #eeeeee'}}></div>]
        );               
    }

    return (
        <div style={{backgroundColor: '#220f49', height: '600px', width: '100%'}}>
            <div style={{height: '3px'}}></div>
            <div style={{height: '25px', width: '25px', borderRadius: '20px', backgroundColor: '#220f49', paddingTop: '2px'}}></div>
            <div style={{width: '50%', height: '39px', float: 'left', color: '#ffffff', marginTop: '25px'}}>6am</div>
            <div style={{marginLeft: '50%', backgroundColor: '#220f49', height: '39px', borderBottom: '1px solid #eeeeee'}}></div>
            {hatches}
        </div>
    );
}

const CalendarRow = (props) => {
    let dayIndex = 0;
    for (let i = 0; i < 7; i++) {
        if (props.days) {
            console.log(props.days);
            if (props.days[i].isToday) {
                console.log("TODAY", props.days[i]);
                dayIndex = i;
            } 
        }
    }

    return (
        <React.Fragment>
            <Grid item xs={1} />
            <Grid item xs={1}>
                <HatchMarks />
            </Grid>
            <Grid item xs={4}>
                <DayItem day={props.days[dayIndex]} />
            </Grid>
            <Grid item xs={2} />
        </React.Fragment>
    );
}

const DayCalendar = (props) => {

    const today = new Date().getDate();
    const currMonth = new Date().getMonth()+1;
    const thisYear = new Date().getFullYear();
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


    //const [day, setDay] = React.useState(props.day);
    const [monthIndex, setMonthIndex] = React.useState(props.month); 
    const [arrayOfDays, setArrayOfDays] = React.useState(props.dayArray); // fill array with empty undefined elements
    const [currYear, setCurrYear] = React.useState(props.year); 
    const [weekStartIndex, setWeekStartIndex] = React.useState(props.startWeekIndex);
    const [weekEndIndex, setWeekEndIndex] = React.useState(props.endWeekIndex);

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

        //console.log(updatedArrayOfDays);
        setArrayOfDays(updatedArrayOfDays);
    }

    const handleNextWeek = () => {
        console.log(monthIndex, weekStartIndex, weekEndIndex);
        if (weekStartIndex === 35) {
            if (monthIndex !== 12) {
                setMonthIndex(monthIndex + 1);
                setWeekStartIndex(0);
                setWeekEndIndex(7);
            }
        } else {
            setWeekStartIndex(weekStartIndex + 7);
            setWeekEndIndex(weekEndIndex + 7);
        }
    }

    const handlePrevWeek = () => { 
        console.log(monthIndex, weekStartIndex, weekEndIndex);
        if (weekStartIndex === 0) {
            if (monthIndex !== 1) {
                setMonthIndex(monthIndex - 1);
                setWeekStartIndex(35);
                setWeekEndIndex(42);
            } 
        } else {
            setWeekStartIndex(weekStartIndex - 7);
            setWeekEndIndex(weekEndIndex - 7);
        }
    }

    const handleChangeYear = e => {
        setCurrYear(e.target.value);
    }

    React.useEffect(() => {
        getDaysOfMonth();
    }, []);

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

export default DayCalendar;