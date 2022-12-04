import React from 'react';
import { Grid, Box, Tabs, Tab } from '@mui/material';
import { useSelector, connect } from 'react-redux';
import { compose } from 'redux';
import {firestoreConnect, getFirebase} from "react-redux-firebase";
import NavBar from './NavBar';
import { TabPanel, tabProps } from './TabPanel';
import MonthCalendar from './MonthCalendar';
import WeekCalendar from './WeekCalendar';
import DayCalendar from './DayCalendar';
import getMonthArray from '../data_functions/getMonthArray';

const Dashboard = (props) => {

    const today = new Date().getDate();
    const currMonth = new Date().getMonth()+1;
    const thisYear = new Date().getFullYear();

    const { monthArray, startWeekIndex, endWeekIndex } = getMonthArray(today, currMonth, thisYear);

    const user = {
        email: useSelector((state) => state.firebase.auth.email)
    }
    const profile = {
        ...user,
        ...useSelector((state) => state.firebase.profile)
    }

    let dayInd = 0;
    for (let i = 0; i < 42; i++) {
        if (monthArray[i].isToday) {
            dayInd = i;
            break;
        }
    }

    const [tabValue, setTabValue] = React.useState(0);

    const [monthIndex, setMonthIndex] = React.useState(currMonth); 
    const [arrayOfDays, setArrayOfDays] = React.useState(monthArray);
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
            <NavBar name={typeof profile.firstName === 'undefined' ? "User" : profile.firstName} calendars={[]} setCurrentCalendar={null} />
            {
                // pass in array of calendars loaded from user's profile
                // pass in function that displays current calendar
            }

            
            <Grid item xs={12} style={{marginTop: '64px'}} />
            <Box sx={{ width: '100%', bgcolor: '#220f49', borderTop: '2px solid #8C25FF'}}>
                <Tabs value={tabValue} onChange={handleTabChange} >

                    <Tab label="Month"  style={{color: '#ffffff'}}  {...tabProps(0)} />
                    <Tab label="Week"  style={{color: '#ffffff'}}  {...tabProps(1)} />
                    <Tab label="Day"  style={{color: '#ffffff'}}  {...tabProps(2)} />
                    {/* <Tab label="State Data"  style={{color: '#ffffff'}}  {...tabProps(3)} /> */}

                </Tabs>

                {
                    // TAB PANEL FOR MONTH
                }
                <TabPanel value={tabValue} index={0}>
                    <MonthCalendar month={monthIndex} year={currYear} dayArray={arrayOfDays} setDayArray={setDayArray} setMonth={setMonth} setYear={setYear} handleClickWeek={handleClickWeek} handleClickDay={handleClickDay} blocks={props.blocks} />
                </TabPanel>

                {
                    // TAB PANEL FOR WEEK
                }
                <TabPanel value={tabValue} index={1}>
                    <WeekCalendar month={monthIndex} year={currYear} dayArray={arrayOfDays} startWeekIndex={weekStartIndex} endWeekIndex={weekEndIndex} setMonth={setMonth} setYear={setYear} handleClickDay={handleClickDay} blocks={props.blocks} />
                </TabPanel>

                {
                    // TAB PANEL FOR DAY
                }
                <TabPanel value={tabValue} index={2}>
                    <DayCalendar 
                        day={today} month={monthIndex} year={currYear} 
                        dayArray={arrayOfDays} startWeekIndex={weekStartIndex} 
                        endWeekIndex={weekEndIndex} setMonth={setMonth} 
                        setYear={setYear} dayIndex={dayIndex} blocks={props.blocks} //updateBlocks={updateBlocks}
                    />
                </TabPanel>

                {
                    // TAB PANEL FOR STATE DATA
                }
                {/* <TabPanel value={tabValue} index={3}>
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
                </TabPanel> */}

            </Box>
            
        </div>
    );
}

const mapStateToProps = (state) => {
    if (state.firestore.ordered.blocks) {
        state.blocks = state.firestore.ordered.blocks;
    }
    console.log(state);
    return {
        blocks: state.blocks,
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
