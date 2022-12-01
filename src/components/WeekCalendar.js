import React from 'react';
import { Grid, Typography, IconButton, FormControl, Select, MenuItem, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DOTWRow from './DOTWRow';
import { timeCorrelations } from '../data_functions/timeCorrelations';

const WeekBlock = (props) => {

    let startTimeStr = "";
    for (let i = 0; i < timeCorrelations.length; i++) {
        if (props.yPos === timeCorrelations[i].yPos) {
            startTimeStr = timeCorrelations[i].time;
        }
    }

    let endTimeStr = "";
    let endPos = props.yPos;
    if (props.hours !== 0) {
        endPos += props.hours*40;
    }
    if (props.minutes === 15) {
        endPos += 10;
    }
    if (props.minutes === 30) {
        endPos += 20;
    }
    if (props.minutes === 45) {
        endPos += 30;
    }
    for (let i = 0; i < timeCorrelations.length; i++) {
        if (endPos === timeCorrelations[i].yPos) {
            endTimeStr = timeCorrelations[i].time;
        }
    }

    let truncatedName = "";
    if (props.name.length > 24) {
        truncatedName = props.name.substring(0, 20) + "...";
    } else {
        truncatedName = props.name;
    }

    return (
        <Grid container style={{textAlign: 'left', width: '95%', display: 'flex', position: 'relative',  marginLeft: '2.5%', marginBottom: '3px', backgroundColor: props.color, borderRadius: '5px'}}>
            <Grid item xs={12} style={{height: '12px'}}>
                <p style={{color: '#ffffff', fontSize: '12px', paddingLeft: '5px', marginTop: '5px', textDecoration: props.completed ? 'line-through' : ''}}>{truncatedName}</p>
            </Grid>
            <Grid item xs={12} style={{height: '35px'}}>
                <p style={{color: '#ffffff', fontSize: '12px', paddingLeft: '5px'}}>{startTimeStr} - {endTimeStr}</p>
            </Grid>
        </Grid>
    );
}

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
        console.log(props.start + props.offset); // return day that is clicked on, soon take to day view of this day
        props.handleDayClick(props.start + props.offset);
    }

    let sortedBlocks = props.blocks;
    sortedBlocks.sort((a,b) => {
        return a.yPos - b.yPos;
    });

    const monthOffsets = [
        {
            month: 1,
            offset: 4
        },
        {
            month: 2,
            offset: 0
        },
        {
            month: 3,
            offset: 3
        },
        {
            month: 4,
            offset: 4
        },
        {
            month: 5,
            offset: 0
        },
        {
            month: 6,
            offset: 3
        },
        {
            month: 7,
            offset: 4
        },
        {
            month: 8,
            offset: 0
        },
        {
            month: 9,
            offset: 3
        },
        {
            month: 10,
            offset: 4
        },
        {
            month: 11,
            offset: 0
        },
        {
            month: 12,
            offset: 3
        }
    ];

    let offset = 0;
    for (let month of monthOffsets) {
        if (month.month === props.monthIndex) {
            offset = month.offset;
        }
    }

    return (
        <Paper style={{width: '100%', textAlign: 'center', borderRadius: '0px', color: color, border: '1px solid #000000'}} onClick={handleClick}>
            <div style={{height: '25px', width: '25px', borderRadius: '20px', backgroundColor: circleColor, marginTop: '3px', marginBottom: '3px', marginLeft: '3px'}}>
                {dateNum}
            </div>
            <div style={{backgroundColor: '#ffffff', height: '805px', position: 'relative', width: '100%', border: '1px solid #000000', marginLeft: '-1px'}}>
                <div style={{height: '3px'}}></div>
            {
                sortedBlocks.map((block, index) => (
                    block.day === dateNum+offset && block.month === props.monthIndex && block.year === props.currYear ? <WeekBlock name={block.name} hours={block.hours} minutes={block.minutes} color={block.color} yPos={block.yPos} index={index} completed={block.completed} /> : null
                ))
            }
            </div>
        </Paper>
    );
}

const CalendarRow = (props) => {

    return (
        <React.Fragment>
            <Grid item xs={1}>
                <DayItem day={props.days[0]} offset={0} start={props.startIndex} handleDayClick={props.getDay} blocks={props.blocks} monthIndex={props.monthIndex} currYear={props.currYear} />
            </Grid>
            <Grid item xs={1}>
                <DayItem day={props.days[1]} offset={1} start={props.startIndex} handleDayClick={props.getDay} blocks={props.blocks} monthIndex={props.monthIndex} currYear={props.currYear} />
            </Grid>
            <Grid item xs={1}>
                <DayItem day={props.days[2]} offset={2} start={props.startIndex} handleDayClick={props.getDay} blocks={props.blocks} monthIndex={props.monthIndex} currYear={props.currYear} />
            </Grid>
            <Grid item xs={1}>
                <DayItem day={props.days[3]} offset={3} start={props.startIndex} handleDayClick={props.getDay} blocks={props.blocks} monthIndex={props.monthIndex} currYear={props.currYear} />
            </Grid>
            <Grid item xs={1}>
                <DayItem day={props.days[4]} offset={4} start={props.startIndex} handleDayClick={props.getDay} blocks={props.blocks} monthIndex={props.monthIndex} currYear={props.currYear} />
            </Grid>
            <Grid item xs={1}>
                <DayItem day={props.days[5]} offset={5} start={props.startIndex} handleDayClick={props.getDay} blocks={props.blocks} monthIndex={props.monthIndex} currYear={props.currYear} />
            </Grid>
            <Grid item xs={1}>
                <DayItem day={props.days[6]} offset={6} start={props.startIndex} handleDayClick={props.getDay} blocks={props.blocks} monthIndex={props.monthIndex} currYear={props.currYear} />
            </Grid>
        </React.Fragment>
    );
}

const WeekCalendar = (props) => {
    //console.log(props.blocks);

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
    });

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
                    <CalendarRow days={arrayOfDays.slice(weekStartIndex, weekEndIndex)} startIndex={weekStartIndex} endIndex={weekEndIndex} getDay={props.handleClickDay} blocks={props.blocks} monthIndex={monthIndex} currYear={currYear} />
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

export default WeekCalendar;