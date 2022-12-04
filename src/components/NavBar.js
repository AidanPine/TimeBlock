import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/tb-icon.png';
import { Box, Typography, Grid, Snackbar, IconButton, Button, AppBar, ListItemText, Toolbar, Menu, MenuItem, Tooltip, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, TextField, Chip, FormControl } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';



const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElCalendar, setAnchorElCalendar] = React.useState(null);
    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [settingsDialogOpen, setSettingsDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [calendars, setCalendars] = React.useState([
        {
            name: 'User\'s Personal Calendar',
            collaborators: ["collab1@gmail.com", "collab2@gmail.com", "collab3@gmail.com"],
            personal: true
        }
    ]);

    const [calendarName, setCalendarName] = React.useState("");
    const [editName, setEditName] = React.useState(calendars === [] ? "" : calendars[0].name);
    const [deleteName, setDeleteName] = React.useState(calendars === [] ? "" : calendars[0].name);
    const [values, setValues] = React.useState([]);
    const [currValue, setCurrValue] = React.useState("");

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

    const handleCloseUserMenu = (name) => {
        setAnchorElUser(null);
        let newCalendars = [];
        for (let i = 0; i < calendars.length; i++) {
            if (calendars[i].name === name) {
                newCalendars.unshift(calendars[i]);
            } else {
                newCalendars.push(calendars[i]);
            }
        }
        setCalendars(newCalendars);
    };

    const handleClick = () => {
        navigate("/");
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

    const handleDelete = ( item, index) =>{
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
        setAddDialogOpen(false);
        let newCalendar = {
            name: calendarName,
            collaborators: values
        }
        let newCalendars = [...calendars];
        newCalendars.push(newCalendar);
        setCalendars(newCalendars);
    }

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
        setDeleteName(calendars === [] ? "" : calendars[0].name);
        handleCloseSettingsMenu(false);
    }

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    }

    const editCalendar = () => {
        let newCalendars = [];
        for (let i = 0; i < calendars.length; i++) {
            if (calendars[i].name === editName) {
                let newCalendar = {
                    name: calendarName,
                    collaborators: values,
                    personal: false
                }
                newCalendars.unshift(newCalendar);
            } else {
                newCalendars.push(calendars[i]);
            }
        }
        setCalendars(newCalendars);
        setCalendarName("");
        setValues([]);
        setSettingsDialogOpen(false);
    }

    const deleteCalendar = () => {
        let newCalendars = [];
        for (let i = 0; i < calendars.length; i++) {
            if (calendars[i].name !== deleteName) {
                newCalendars.push(calendars[i]);
            }
        }
        setCalendars(newCalendars);
        setCalendarName("");
        setValues([]);
        setDeleteDialogOpen(false);
    }

    const handleSettingsDialogOpen = () => {
        handleCloseSettingsMenu(false);
        setCalendarName(calendars === [] ? "" : calendars[0].name);
        setValues(calendars === [] ? [] : calendars[0].collaborators);
        setEditName(calendars === [] ? "" : calendars[0].name);
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

    return (
        <>
            <AppBar position="fixed" style={{backgroundColor: 'transparent', boxShadow: 'inset 0 0 2000px rgba(255, 255, 255, .1)'}}>
                <Toolbar disableGutters>
                    <img src={logo} alt="logo" style={{width: "30px", marginLeft: "15px", boxShadow: "0px 0px 12px 10px rgba(0,0,0,0.97)"}} />
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
                        
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center" style={{color: '#ffffff'}}>Dashboard</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleClick}>
                            <Typography textAlign="center" style={{color: '#ffffff'}}>Home</Typography>
                        </MenuItem>
                        
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: '50px' }}>
                        <Button style={{color: '#ffffff', textTransform: 'none', textDecoration: 'underline'}}>Dashboard</Button>
                        <Button style={{color: '#ffffff', textTransform: 'none'}} onClick={handleClick}>Home</Button>
                    </Box>

                    <Box sx={{ flexGrow: 0, float: 'right' }}>
                        <Tooltip title="Calendar Selection">
                            <Button onClick={handleOpenUserMenu} style={{backgroundColor: '#ffffff', color: '#8C52FF', textTransform: 'none', fontWeight: 'bold'}} endIcon={<KeyboardArrowDownIcon />}>{calendars[0].name}</Button>
                        </Tooltip>
                        <Tooltip title="Calendar Settings">
                            <Button onClick={handleOpenSettingsMenu} style={{backgroundColor: '#ffffff', color: '#8C52FF', textTransform: 'none', fontWeight: 'bold', marginLeft: '5px'}} endIcon={<SettingsIcon />}>Calendar Settings</Button>
                        </Tooltip>
                        <Tooltip title="Add A Calendar">
                        <Button onClick={handleAddDialogOpen} style={{backgroundColor: '#ffffff', color: '#8C52FF', textTransform: 'none', fontWeight: 'bold', marginLeft: '5px', marginRight: '15px'}} endIcon={<AddIcon />}>Add Calendar</Button>
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
                        {calendars.map((cal) => (
                            <MenuItem key={cal} onClick={() => handleCloseUserMenu(cal.name)}>
                                <ListItemText textAlign="left" style={{marginRight: '10px'}}>{cal.name}</ListItemText>
                            </MenuItem>
                        ))}
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
                        <MenuItem onClick={!calendars[0].personal ? handleDeleteDialogOpen : handleOpenSnackbar}>
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
                            <DialogContentText style={{marginTop: '20px'}}>
                                Invite Collaborators Via Email Address
                            </DialogContentText>
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
                            </Grid>
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
                        <Button variant="contained" style={{backgroundColor: "#8C52FF", textTransform: "none"}} onClick={deleteCalendar}>Yes, Delete Block</Button>
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

export default NavBar;