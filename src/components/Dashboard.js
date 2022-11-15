import React from 'react';
import { Grid, IconButton, Typography, Box, Tabs, Tab } from '@mui/material';
import logo from '../assets/tb-icon.png';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {firestoreConnect, getFirebase} from "react-redux-firebase";
import { useNavigate } from 'react-router-dom';
import { TabPanel, tabProps } from './TabPanel';
import MonthCalendar from './MonthCalendar';
import WeekCalendar from './WeekCalendar';
import DayCalendar from './DayCalendar';
import getMonthArray from '../data_functions/getMonthArray';

const Dashboard = (props) => {

    const today = new Date().getDate();
    //console.log(today);
    const currMonth = new Date().getMonth()+1;
    //console.log(currMonth);
    const thisYear = new Date().getFullYear();
    //console.log(thisYear);
    // get current month by getting current month from date function
    // const months = [
    //     'January',
    //     'February',
    //     'March',
    //     'April',
    //     'May',
    //     'June',
    //     'July',
    //     'August',
    //     'September',
    //     'October',
    //     'November',
    //     'December'
    // ];
    const { monthArray, startWeekIndex, endWeekIndex } = getMonthArray(today, currMonth, thisYear);

    const user = {
        email: useSelector((state) => state.firebase.auth.email)
    }
    const profile = {
        ...user,
        ...useSelector((state) => state.firebase.profile)
    }

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    };

    let dayInd = 0;
    for (let i = 0; i < 42; i++) {
        if (monthArray[i].isToday) {
            dayInd = i;
            break;
        }
    }

    const [tabValue, setTabValue] = React.useState(0);

    const [currDay, setCurrDay] = React.useState(today);
    const [monthIndex, setMonthIndex] = React.useState(currMonth); 
    const [arrayOfDays, setArrayOfDays] = React.useState(monthArray); // fill array with empty undefined elements
    const [currYear, setCurrYear] = React.useState(thisYear);
    const [weekStartIndex, setWeekStartIndex] = React.useState(startWeekIndex);
    const [weekEndIndex, setWeekEndIndex] = React.useState(endWeekIndex);
    const [dayIndex, setDayIndex] = React.useState(dayInd+1);

    const handleTabChange = (e, newTabValue) => {
        setTabValue(newTabValue);
    }

    const handleClickWeek = (start, end) => {
        console.log("From Dash: " + start + ", " + end);
        setWeekStartIndex(start);
        setWeekEndIndex(end);
        setTabValue(1); // to week view
    }

    const handleClickDay = (index) => {
        setDayIndex(index);
        setTabValue(2);
    }

    const setDayArray = (newArray) => {
        setArrayOfDays(newArray);
    }

    const setMonth = (newMonth) => {
        setMonthIndex(newMonth);
    }

    const setYear = (newYear) => {
        setCurrYear(newYear);
    }

    return (
        <div className="App">
            <Grid container spacing={3} align="right" style={{marginTop: "0px"}}>
                <Grid item xs={2} sm={2} md={2} lg={1} align="left">
                    <img src={logo} alt="logo" style={{width: "30px", marginLeft: "20px", boxShadow: "0px 0px 12px 10px rgba(0,0,0,0.97)"}} />
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={10} align="center">
                    <Typography variant="h5" color="#ffffff">Dashboard</Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={1} align="right">
                    <IconButton aria-label="delete" style={{ cursor: 'pointer', color: "#eeeeee", height: "35px", width: "35px", backgroundColor: "#8C52FF", marginRight: "20px"}} onClick={handleClick} >
                        {
                            // Go to home
                        }
                        <HomeIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{marginTop: '50px'}} />
            <Box sx={{ width: '100%', bgcolor: '#220f49' }}>
                <Tabs value={tabValue} onChange={handleTabChange} >

                    <Tab label="Month"  style={{color: '#ffffff'}}  {...tabProps(0)} />
                    <Tab label="Week"  style={{color: '#ffffff'}}  {...tabProps(1)} />
                    <Tab label="Day"  style={{color: '#ffffff'}}  {...tabProps(2)} />
                    <Tab label="State Data"  style={{color: '#ffffff'}}  {...tabProps(3)} />

                </Tabs>

                {
                    // TAB PANEL FOR MONTH
                }
                <TabPanel value={tabValue} index={0}>
                    <MonthCalendar month={monthIndex} year={currYear} dayArray={arrayOfDays} setDayArray={setDayArray} setMonth={setMonth} setYear={setYear} handleClickWeek={handleClickWeek} handleClickDay={handleClickDay} />
                </TabPanel>

                {
                    // TAB PANEL FOR WEEK
                }
                <TabPanel value={tabValue} index={1}>
                    <WeekCalendar month={monthIndex} year={currYear} dayArray={arrayOfDays} startWeekIndex={weekStartIndex} endWeekIndex={weekEndIndex} setMonth={setMonth} setYear={setYear} handleClickDay={handleClickDay} />
                </TabPanel>

                {
                    // TAB PANEL FOR DAY
                }
                <TabPanel value={tabValue} index={2}>
                    <DayCalendar day={currDay} month={monthIndex} year={currYear} dayArray={arrayOfDays} startWeekIndex={weekStartIndex} endWeekIndex={weekEndIndex} setMonth={setMonth} setYear={setYear} dayIndex={dayIndex} />
                </TabPanel>

                {
                    // TAB PANEL FOR STATE DATA
                }
                <TabPanel value={tabValue} index={3}>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        First Name: {profile.firstName}
                    </Typography>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Last Name: {profile.lastName}
                    </Typography>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Username: {profile.username}
                    </Typography>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Email: {profile.email}
                    </Typography>
                </TabPanel>

            </Box>
            
        </div>
    );
}

const mapStateToProps = (state) => {
    state.blocks.blocks = state.firestore.ordered.blocks;
    console.log(state);
    return {
        blocks: state.firestore.ordered.blocks,
        auth: state.firebase.auth
    }
}

export default compose(
    firestoreConnect(props => {
        return [
            {
                collection: 'users',
                doc: getFirebase().auth().currentUser ? getFirebase().auth().currentUser.uid : 'kSwQeeRaTzkMfdgsNR0v',
                subcollections: [
                    {collection: 'blocks'}
                ],
                storeAs: 'blocks'
            }
        ];
    }),
    connect(mapStateToProps)
)(Dashboard);
