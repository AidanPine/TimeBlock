import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/tb-icon.png';
import { Box, Typography, Grid, Snackbar, IconButton, Button, AppBar, ListItemText, Toolbar, Menu, MenuItem, Tooltip, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, TextField, Chip, FormControl } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import {connect} from "react-redux";
import {addCalendar, changeCalendar, deleteCalendar, editCalendar} from "../redux_functions/actions";

const randomKey = (length) => {
    const lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let key = "";

    while (key.length < length) {
        let choice = Math.floor(Math.random() * 3);
        switch(choice) {
            case 0:
                key += lower[Math.floor(Math.random() * 26)];
                break;
            case 1:
                key += upper[Math.floor(Math.random() * 26)];
                break;
            case 2:
                key += nums[Math.floor(Math.random() * 10)];
                break;
            default:
                break;
        }
    }

    return key;
}

const NavBar = (props) => {
    let personalCalendar = {
        id: 0,
        name: 'Personal Calendar',
        personal: true
    }
    const dashboardTitle = props.name + '\'s Dashboard';

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElCalendar, setAnchorElCalendar] = React.useState(null);
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [settingsDialogOpen, setSettingsDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const [calendarName, setCalendarName] = React.useState("");
    const [currentCalendar, setCurrentCalendar] = React.useState(personalCalendar);
    // const [editID, setEditID] = React.useState("");
    // const [deleteID, setDeleteID] = React.useState("");
    const [activeID, setActiveID] = React.useState(0);
    const [values, setValues] = React.useState([]);
    const [currValue, setCurrValue] = React.useState("");


    let displayCalendars = [personalCalendar];

    if (!props.auth.isEmpty && props.calendars) {
        for (let calendar of props.calendars) {
            displayCalendars.push({...calendar});
        }
    }

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleOpenSettingsMenu = (event) => {
        setAnchorElCalendar(event.currentTarget);
    };

    const handleCloseSettingsMenu = () => {
        setAnchorElCalendar(null);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (id) => {
        setAnchorElUser(null);
        for (let i = 0; i < displayCalendars.length; i++) {
            if (displayCalendars[i].id === id) {
                setCurrentCalendar(displayCalendars[i]);
            }
        }
        if (id !== currentCalendar.id) {
            props.changeCalendar(id);
        }
    };

    const handleClick = () => {
        navigate("/timeblock");
    };

    const handleChange = (e) => {
        setCurrValue(e.target.value);
    };

    const handleAdd = () => {
        let arr = [...values]
        arr.push(currValue);
        setValues(arr);
        setCurrValue("");
    }

    const handleDelete = (item, index) =>{
        let arr = [...values]
        arr.splice(index,1)
        console.log(item)
        setValues(arr)
    }

    const handleNameChange = (e) => {
        setCalendarName(e.target.value);
    }

    const handleAddDialogOpen = () => {
        setAddDialogOpen(true);
    }

    const handleAddDialogClose = () => {
        setCalendarName("");
        setValues([]);
        setAddDialogOpen(false);
    }

    const addCalendar = () => {
        if (calendarName !== "") {
            setAddDialogOpen(false);
            let newCalendar = {
                name: calendarName,
                collaborators: values,
                personal: false
            }
            props.addCalendar(newCalendar);
        }
    }

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
        setActiveID(displayCalendars === [] ? 0 : currentCalendar.id);
        handleCloseSettingsMenu(false);
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    }

    const editCalendar = () => {
        if (calendarName !== "") {
            props.editCalendar({
                id: activeID,
                name: calendarName,
                collaborators: values,
                personal: false
            });
            setCalendarName("");
            setValues([]);
            setSettingsDialogOpen(false);
        }
    }

    const deleteCalendar = () => {

        props.deleteCalendar(activeID);
        setCalendarName("");
        setCurrentCalendar(personalCalendar);
        props.changeCalendar(personalCalendar.id);
        setValues([]);
        setDeleteDialogOpen(false);
    }

    const handleSettingsDialogOpen = () => {
        handleCloseSettingsMenu(false);
        setCalendarName(displayCalendars === [] ? "" : currentCalendar.name);
        setValues(displayCalendars === [] ? [] : currentCalendar.collaborators);
        setActiveID(displayCalendars === [] ? 0 : currentCalendar.id);
        setSettingsDialogOpen(true);
    }

    const handleSettingsDialogClose = () => {
        setCalendarName("");
        setValues([]);
        setSettingsDialogOpen(false);
    }

    const handleOpenSnackbar = () => {
        handleCloseSettingsMenu(false);
        setSnackbarOpen(true);
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    const mergeCalendars = () => {
        console.log('merge clicked');
        setAnchorElUser(null);
        let mergedCalendar = {
            id: 'merged',
            name: 'Merged Calendar',
            personal: true,
            collaborators: []
        }
        setCurrentCalendar(mergedCalendar);
        props.changeCalendar(mergedCalendar.id);
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
    );

    //console.log(displayCalendars);
    return (
        <>
            <AppBar position="fixed" style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex'} }}>
                        <img src={logo} alt="logo" style={{width: "40px", marginLeft: "8px", border: '2px solid #8C52FF', borderRadius: '10px'}} />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >

                        <MenuItem>
                            <Button onClick={handleOpenUserMenu} style={{backgroundColor: '#ffffff', color: '#8C52FF', textTransform: 'none', fontWeight: 'bold'}} endIcon={<KeyboardArrowDownIcon />}>{typeof displayCalendars === 'undefined' || displayCalendars === [] ? "" : currentCalendar.name}</Button>
                        </MenuItem>
                        <MenuItem>
                            <Button onClick={handleOpenSettingsMenu} style={{backgroundColor: '#ffffff', color: '#8C52FF', textTransform: 'none', fontWeight: 'bold', marginLeft: '5px'}} endIcon={<SettingsIcon />}>Calendar Settings</Button>
                        </MenuItem>
                        <MenuItem>
                            <Button onClick={handleAddDialogOpen} style={{backgroundColor: '#ffffff', color: '#8C52FF', textTransform: 'none', fontWeight: 'bold', marginLeft: '5px'}} endIcon={<AddIcon />}>Add Calendar</Button>
                        </MenuItem>
                        <MenuItem>
                            <Button onClick={handleClick} style={{backgroundColor: '#ffffff', color: '#8C52FF', textTransform: 'none', fontWeight: 'bold', marginLeft: '5px'}} endIcon={<HomeIcon />}>Home</Button>
                        </MenuItem>

                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex', backgroundColor: '#8C52FF', height: '42px', borderRadius: '10px', marginLeft: '5px', marginRight: '7px'}}>
                        <Typography variant="h5" style={{color: '#ffffff', marginLeft: '15px', marginTop: '5px'}}>{dashboardTitle}</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}></Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex'} }}>
                        <Tooltip title="Calendar Selection">
                            <Button onClick={handleOpenUserMenu} style={{backgroundColor: '#ffffff', color: '#8C52FF', textTransform: 'none', fontWeight: 'bold', border: '2px solid #8C52FF', borderRadius: '10px'}} endIcon={<KeyboardArrowDownIcon />}>{typeof displayCalendars === 'undefined' || displayCalendars === [] ? "" : currentCalendar.name}</Button>
                        </Tooltip>
                        <Tooltip title="Calendar Settings">
                            <Button onClick={handleOpenSettingsMenu} style={{backgroundColor: '#ffffff', color: '#8C52FF', textTransform: 'none', fontWeight: 'bold', marginLeft: '5px', border: '2px solid #8C52FF', borderRadius: '10px'}} endIcon={<SettingsIcon />}>Calendar Settings</Button>
                        </Tooltip>
                        <Tooltip title="Add A Calendar">
                            <Button onClick={handleAddDialogOpen} style={{backgroundColor: '#ffffff', color: '#8C52FF', textTransform: 'none', fontWeight: 'bold', marginLeft: '5px', border: '2px solid #8C52FF', borderRadius: '10px'}} endIcon={<AddIcon />}>Add Calendar</Button>
                        </Tooltip>
                        <Tooltip title="Go To Home Page">
                            <IconButton onClick={handleClick} style={{backgroundColor: '#8C52FF', color: '#ffffff', textTransform: 'none', marginLeft: '5px', marginRight: '8px', border: '2px solid #8C52FF', borderRadius: '10px'}}>
                                <HomeIcon style={{color: '#ffffff'}} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        <MenuItem key={currentCalendar} onClick={() => handleCloseUserMenu(currentCalendar.id)}>
                            <ListItemText textAlign="left" style={{marginRight: '10px'}}>{currentCalendar.name}</ListItemText>
                        </MenuItem>
                        {
                            displayCalendars.map((cal) => {
                                if (cal.id !== currentCalendar.id) {
                                    return (<MenuItem key={cal} onClick={() => handleCloseUserMenu(cal.id)}>
                                        <ListItemText textAlign="left"
                                                      style={{marginRight: '10px'}}>{cal.name}</ListItemText>
                                    </MenuItem>)
                                }
                            })
                        }
                            <MenuItem onClick={mergeCalendars}>
                                <ListItemText textAlign="left" style={{marginRight: '10px', color: '#8C52FF'}}>Merge Calendars</ListItemText>
                            </MenuItem>
                        </Menu>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElCalendar}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElCalendar)}
                        onClose={handleCloseSettingsMenu}
                        >
                        <MenuItem onClick={handleSettingsDialogOpen}>
                            <ListItemText textAlign="left" style={{marginRight: '10px'}}>Settings</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={!currentCalendar.personal ? handleDeleteDialogOpen : handleOpenSnackbar}>
                            <ListItemText textAlign="left" style={{marginRight: '10px'}}>Delete Calendar</ListItemText>
                        </MenuItem>
                        </Menu>
                    </Box>

                    <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
                        <DialogTitle style={{ color: "#8C52FF" }}>Create A New Calendar</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please Enter A Name For It
                            </DialogContentText>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Calendar Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={calendarName}
                                        onChange={handleNameChange}
                                        style={{color: "#000000"}}
                                    />
                                </Grid>
                            </Grid>
                            <DialogContentText style={{marginTop: '20px'}}>
                                Invite Collaborators Via Email Address
                            </DialogContentText>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <div className={"container"}>
                                                    {currentCalendar.id !== 0 && values.map((item,index) => (
                                                        <Chip size="small" onDelete={()=>handleDelete(item,index)} label={item}/>
                                                        ))}
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    autoFocus
                                                    margin="dense"
                                                    id="email"
                                                    label="Email Address"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    value={currValue}
                                                    onChange={handleChange}
                                                    style={{color: "#000000"}}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button onClick={handleAdd} variant="contained" style={{backgroundColor: "#8C52FF", textTransform: "none", marginTop: '10px'}} >Add Email</Button>
                                            </Grid>
                                        </Grid>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button style={{color: "#8C52FF", textTransform: "none"}} onClick={handleAddDialogClose}>Cancel</Button>
                            <Button variant="contained" style={{backgroundColor: "#8C52FF", textTransform: "none"}} onClick={addCalendar}>Create Calendar</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={settingsDialogOpen} onClose={handleSettingsDialogClose}>
                        <DialogTitle style={{ color: "#8C52FF" }}>Calendar Settings</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please Enter A Name For It
                            </DialogContentText>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Calendar Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={calendarName}
                                        onChange={handleNameChange}
                                        style={{color: "#000000"}}
                                    />
                                </Grid>
                            </Grid>
                            { !currentCalendar.personal ?
                                [<DialogContentText style={{marginTop: '20px'}}>
                                    Invite Collaborators Via Email Address
                                </DialogContentText>,
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <FormControl>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <div className={"container"}>
                                                        {values.map((item,index) => (
                                                            <Chip  size="small" onDelete={()=>handleDelete(item,index)} label={item}/>
                                                            ))}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="email"
                                                        label="Email Address"
                                                        type="text"
                                                        fullWidth
                                                        variant="standard"
                                                        value={currValue}
                                                        onChange={handleChange}
                                                        style={{color: "#000000"}}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button onClick={handleAdd} variant="contained" style={{backgroundColor: "#8C52FF", textTransform: "none", marginTop: '10px'}} >Add Email</Button>
                                                </Grid>
                                            </Grid>
                                        </FormControl>
                                    </Grid>
                                </Grid>]
                            : <></>}
                        </DialogContent>
                        <DialogActions>
                            <Button style={{color: "#8C52FF", textTransform: "none"}} onClick={handleSettingsDialogClose}>Cancel</Button>
                            <Button variant="contained" style={{backgroundColor: "#8C52FF", textTransform: "none"}} onClick={editCalendar}>Update Changes</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this calendar?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{color: "#8C52FF", textTransform: "none"}} onClick={handleDeleteDialogClose}>No, Cancel</Button>
                        <Button variant="contained" style={{backgroundColor: "#8C52FF", textTransform: "none"}} onClick={deleteCalendar}>Yes, Delete Calendar</Button>
                    </DialogActions>
                </Dialog>
                </Toolbar>
            </AppBar>
            <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="You Cannot Delete Your Personal Calendar"
            action={action}
            />
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCalendar: (calendar) => dispatch(addCalendar(calendar)),

        editCalendar: (calendar) => dispatch(editCalendar(calendar)),

        deleteCalendar: (calendarID) => dispatch(deleteCalendar(calendarID)),

        changeCalendar: (calendarID) => dispatch(changeCalendar(calendarID))
    }
}

export default connect(null, mapDispatchToProps)(NavBar);