import React from 'react';
import { Grid, IconButton, Typography, Box, Tabs, Tab } from '@mui/material';
import logo from '../assets/tb-icon.png';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TabPanel, tabProps } from './TabPanel';

const Dashboard = () => {
    const user = useSelector((state) => state.profile.profile);
    const navigate = useNavigate();
    const handleClick = () => {navigate("/")};

    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (e, newTabValue) => {
        setTabValue(newTabValue);
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

                    <Tab label="Year"  style={{color: '#ffffff'}}  {...tabProps(0)} />
                    <Tab label="Month"  style={{color: '#ffffff'}}  {...tabProps(1)} />
                    <Tab label="Week"  style={{color: '#ffffff'}}  {...tabProps(2)} />
                    <Tab label="Day"  style={{color: '#ffffff'}}  {...tabProps(3)} />
                    <Tab label="State Data"  style={{color: '#ffffff'}}  {...tabProps(4)} />

                </Tabs>
                
                {
                    // TAB PANEL FOR YEAR
                }
                <TabPanel value={tabValue} index={0}>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Year
                    </Typography>
                </TabPanel>

                {
                    // TAB PANEL FOR MONTH
                }
                <TabPanel value={tabValue} index={1}>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Month
                    </Typography>
                </TabPanel>

                {
                    // TAB PANEL FOR WEEK
                }
                <TabPanel value={tabValue} index={2}>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Week
                    </Typography>
                </TabPanel>

                {
                    // TAB PANEL FOR DAY
                }
                <TabPanel value={tabValue} index={3}>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Day
                    </Typography>
                </TabPanel>

                {
                    // TAB PANEL FOR STATE DATA
                }
                <TabPanel value={tabValue} index={4}>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Username: {user.username}
                    </Typography>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Email: {user.email}
                    </Typography>
                    <Typography variant={'h5'} style={{color: '#ffffff'}}>
                        Password: {user.password}
                    </Typography>
                </TabPanel>

            </Box>
            
        </div>
    );
}

export default Dashboard;
