import React from 'react';
import { Grid, Typography, IconButton, FormControl, Select, MenuItem, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DOTWRow = () => {
    return (
        <Grid item container spacing={0} xs={12} justifyContent="center">
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>S</p>
            </Grid>
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>M</p>
            </Grid>
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>T</p>
            </Grid>
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>W</p>
            </Grid>
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>T</p>
            </Grid>
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>F</p>
            </Grid>
            <Grid item xs={1}>
                <p style={{color: '#8c52ff'}}>S</p>
            </Grid>
        </Grid>
    );
}

const CalendarItem = (props) => {
    return (
        <Paper style={{padding: '5px 80px 50px 10px', textAlign: 'center', borderRadius: '0px'}}>{props.day !== undefined ? props.day : "_"}</Paper>
    );
}

const CalendarRow = (props) => {
    return (
        <Grid item container spacing={0} xs={12} justifyContent="center">
            
            <Grid item xs={1}>
                <CalendarItem day={props.days[0]} />
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[1]} />
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[2]} />
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[3]} />
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[4]} />
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[5]} />
            </Grid>
            <Grid item xs={1}>
                <CalendarItem day={props.days[6]} />
            </Grid>
            
        </Grid>
    );
}

const MonthCalendar = () => {

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

    const [monthIndex, setMonthIndex] = React.useState(10);
    //let monthIndex = 10;
    //const [currMonth, setCurrMonth] = React.useState(months[monthIndex]);
    const [arrayOfDays, setArrayOfDays] = React.useState(Array(42));
    const [currYear, setCurrYear] = React.useState(2022);

    const getDaysOfMonth = () => {
        console.log(monthIndex,currYear);
        const firstDayOfWeek = new Date(currYear + "-" + monthIndex + "-01").getDay(); // to tell which day of the week to start at
        const lastDay = new Date(currYear, monthIndex, 0).getDate(); // last number to end
        let updatedArrayOfDays = Array(42); // fill array with 42 empty values
        // based on days between Sunday to first day (lets say Thursday) we skip array at first 4 values
        let count = 1;
        for (let i = firstDayOfWeek+1; i < 42; i++) {
            if (count > lastDay) {
                break;
            } else {
                updatedArrayOfDays[i] = count;
                count++;
            }
        }

        setArrayOfDays(updatedArrayOfDays);
    }

    const handleNextMonth = () => {
        if (monthIndex < 12) {
            setMonthIndex(monthIndex + 1);
        }
    }

    const handlePrevMonth = () => {
        if (monthIndex > 1) {
            setMonthIndex(monthIndex - 1);
        }
    }

    const handleChangeYear = e => {
        setCurrYear(e.target.value);
        //getDaysOfMonth();
    }

    React.useEffect(() => {
        getDaysOfMonth();
    }, [monthIndex, currYear]);

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
                    <CalendarRow days={arrayOfDays.slice(0, 7)} />
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <CalendarRow days={arrayOfDays.slice(7, 14)} />
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <CalendarRow days={arrayOfDays.slice(14, 21)} />
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <CalendarRow days={arrayOfDays.slice(21, 28)} />
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <CalendarRow days={arrayOfDays.slice(28, 35)} />
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <CalendarRow days={arrayOfDays.slice(35, 42)} />
                </Grid>
            </Grid>
            
        </Grid>
    );
}

export default MonthCalendar;