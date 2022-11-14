import React from 'react';
import { Grid, Typography, IconButton, FormControl, Select, MenuItem, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { connect } from 'react-redux';
import DOTWRow from './DOTWRow';
import getMonthArray from '../data_functions/getMonthArray';


const CalendarItem = (props) => {
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
        console.log(props.day.index); // return day that is clicked on, soon take to day view of this day
        if (props.day.isInMonth) {
            props.handleDayClick(props.day.index);
        }
    }

    return (
        <Paper style={{padding: '10px 90px 50px 10px', textAlign: 'center', borderRadius: '0px', color: color}} onClick={handleClick}>
            <div style={{height: '25px', width: '25px', borderRadius: '20px', backgroundColor: circleColor}}>
                {dateNum}
            </div>
        </Paper>
    );
}

const CalendarRow = (props) => {

    const handleClick = e => {
        console.log(props.days);
        console.log(props.start, props.end);
        props.getWeek(props.start, props.end);;
    }

    return (
        <Grid item container spacing={0} xs={12} justifyContent="center">
            <Grid item xs={1}>
                <IconButton style={{marginTop: '16px'}} size="large" onClick={handleClick}>
                    <ArrowCircleRightIcon style={{color: '#ffffff'}} fontSize="inherit" />
                </IconButton>
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[0]} handleDayClick={props.getDay} />
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[1]} handleDayClick={props.getDay} />
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[2]} handleDayClick={props.getDay} />
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[3]} handleDayClick={props.getDay} />
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[4]} handleDayClick={props.getDay} />
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[5]} handleDayClick={props.getDay} />
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[6]} handleDayClick={props.getDay} />
            </Grid>
            <Grid item xs={1} />
            
        </Grid>
    );
}

const MonthCalendar = (props) => {

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

    const [monthIndex, setMonthIndex] = React.useState(props.month); 
    const [arrayOfDays, setArrayOfDays] = React.useState(Array(42)); // fill array with empty undefined elements
    const [currYear, setCurrYear] = React.useState(props.year); 

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
                events: [],
                index: i
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
                    events: [],
                    index: i
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
                events: [],
                index: i
            }
            newCount++;
        }

        // now fill end of array with 1-n days, will never need to check date bc it will always be max a week
        //console.log(updatedArrayOfDays);

        setArrayOfDays(updatedArrayOfDays);
        props.setDayArray(updatedArrayOfDays);
    }

    const handleNextMonth = () => {
        if (monthIndex < 12) {
            props.setMonth(monthIndex + 1);
            setMonthIndex(monthIndex + 1);
        }
    }

    const handlePrevMonth = () => {
        if (monthIndex > 1) {
            props.setMonth(monthIndex - 1);
            setMonthIndex(monthIndex - 1);
        }
    }

    const handleChangeYear = e => {
        props.setYear(e.target.value);
        setCurrYear(e.target.value);
    }

    React.useEffect(() => {
        getDaysOfMonth();
    });

    return (
        <Grid container>
            <Grid item container xs={12}>
                <Grid item xs={4} />
                <Grid item container xs={4} style={{marginTop: '10px'}}>
                    <Grid item xs={4}>
                        <IconButton aria-label="delete" style={{ cursor: 'pointer', color: "#8C52FF", height: "35px", width: "35px", backgroundColor: "#220f49"}} onClick={handlePrevMonth} >
                            {
                                // Go to prev month
                            }
                            <ArrowBackIosNewIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5" style={{color: '#ffffff'}}>{months[monthIndex-1]}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <IconButton aria-label="delete" style={{ cursor: 'pointer', color: "#8C52FF", height: "35px", width: "35px", backgroundColor: "#220f49"}} onClick={handleNextMonth} >
                            {
                                // Go to next month
                            }
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Grid>
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
                    <CalendarRow days={arrayOfDays.slice(0, 7)} start={0} end={7} getWeek={props.handleClickWeek} getDay={props.handleClickDay} />
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <CalendarRow days={arrayOfDays.slice(7, 14)} start={7} end={14} getWeek={props.handleClickWeek} getDay={props.handleClickDay} />
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <CalendarRow days={arrayOfDays.slice(14, 21)} start={14} end={21} getWeek={props.handleClickWeek} getDay={props.handleClickDay} />
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <CalendarRow days={arrayOfDays.slice(21, 28)} start={21} end={28} getWeek={props.handleClickWeek} getDay={props.handleClickDay} />
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <CalendarRow days={arrayOfDays.slice(28, 35)} start={28} end={35} getWeek={props.handleClickWeek} getDay={props.handleClickDay} />
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <CalendarRow days={arrayOfDays.slice(35, 42)} start={35} end={42} getWeek={props.handleClickWeek} getDay={props.handleClickDay} />
                </Grid>
            </Grid>
            <Grid item xs={12} style={{height: '100px'}} />
            
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {

    }
}


export default connect(mapStateToProps)(MonthCalendar);