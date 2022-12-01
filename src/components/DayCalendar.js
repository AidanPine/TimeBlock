import React from 'react';
import { Grid, Typography, IconButton, FormControl, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, DialogContentText, Checkbox } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SquareIcon from '@mui/icons-material/Square';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Draggable from 'react-draggable';

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

const Block = (props) => {
    const blockHeight = props.duration*39 + (props.duration-1);
    const [completed, setCompleted] = React.useState(props.completed);
    const [yPos, setYPos] = React.useState(props.yPos);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [zIndex, setZIndex] = React.useState(1);

    const editBlock = () => {
        props.handleEdit(props.id, props.name, props.hours, props.minutes, props.color);
    }

    const deleteBlock = () => {
        props.handleDelete(props.id);
    }

    const toggleCompleted = () => {
        setCompleted(!completed);
        props.handleCompleted(props.id, !completed);
    }

    const handleDrag = (e, ui) => {
        //console.log(yPos + ui.deltaY);
        setZIndex(1000);
        setYPos(yPos + ui.deltaY);
        props.updateYPos(props.id, yPos + ui.deltaY);
    }

    const handleStop = () => {
        setZIndex(1);
    }

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    return (
        <>
            <Draggable
                axis="y"
                grid={[10,10]}
                bounds={{top: 0}}
                defaultPosition={{
                    x: 0,
                    y: yPos
                }}
                onDrag={handleDrag}
                onStop={handleStop}
            >
                <div style={{height: blockHeight, backgroundColor: props.color,  textAlign: 'left', width: '100%', display: 'flex', position: 'absolute', cursor: 'pointer', zIndex: zIndex}}>
                    <p style={{color: '#ffffff', width: '70%', alignItems: 'center', display: 'flex', textDecoration: completed ? 'line-through' : ''}}>&nbsp;{props.name}</p>
                    <IconButton style={{float: 'right', width: '10%'}} onClick={editBlock}>
                        <CreateIcon style={{color: '#ffffff'}} />
                    </IconButton>
                    <IconButton style={{float: 'right', width: '10%'}} onClick={handleDialogOpen}>
                        <DeleteIcon style={{color: '#ffffff'}} />
                    </IconButton>
                    <Checkbox style={{float: 'right', width: '10%', color: '#ffffff'}} checked={completed} onChange={toggleCompleted} />
                </div>
            </Draggable>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this block?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{color: "#8C52FF", textTransform: "none"}} onClick={handleDialogClose}>No, Cancel</Button>
                        <Button variant="contained" style={{backgroundColor: "#8C52FF", textTransform: "none"}} onClick={deleteBlock}>Yes, Delete Block</Button>
                    </DialogActions>
            </Dialog>
        </>
    );

}

const DayItem = (props) => {

    let dateNum;
    let circleColor = "#ffffff";
    let textColor= "#000000";
    if (props.day) {
        dateNum = props.day.date;
        if (props.day.isToday) {
            circleColor = "#8c52ff";
            textColor = "#ffffff";
        }
    } else {
        return;
    }

    let divs = [];
    for (let i = 0; i < 17; i++) {
        divs.push(
            <div style={{width: '100%', backgroundColor: '#ffffff', height: '39px', borderBottom: '1px solid #c2c2c2'}}></div>
        );
    }

    return (
        <>
        <div style={{backgroundColor: 'white', height: '600px', positiion: 'relative'}}>

            <div style={{height: '3px'}}></div>
            <div style={{height: '25px', width: '25px', borderRadius: '20px', backgroundColor: circleColor, paddingTop: '2px', marginLeft: '3px', color: textColor}}>
                {dateNum}
            </div>

            {divs}
            
        </div>
        <div style={{backgroundColor: 'transparent', height: '600px', position: 'relative', marginTop: '-530px', width: '100%'}}>
            {
                [...props.blocks].map((block) => (
                    block.day === dateNum+3 ? <Block 
                        name={block.name} hours={block.hours} minutes={block.minutes} 
                        duration={block.duration} color={block.color} key={block.key} 
                        id={block.key} handleEdit={props.handleEdit} handleDelete={props.handleDelete} 
                        handleCompleted={props.handleCompleted} completed={block.completed} yPos={block.yPos} updateYPos={props.updateYPos}
                    /> : null
                ))
            }
        </div>
        </>
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
    const hoursInputs = [
        {
            "value": 0,
            "label": 0
        },
        {
            "value": 1,
            "label": 1
        },
        {
            "value": 2,
            "label": 2
        },
        {
            "value": 3,
            "label": 3
        },
        {
            "value": 4,
            "label": 4
        },
        {
            "value": 5,
            "label": 5
        },
        {
            "value": 6,
            "label": 6
        },
        {
            "value": 7,
            "label": 7
        },
        {
            "value": 8,
            "label": 8
        },
        {
            "value": 9,
            "label": 9
        },
        {
            "value": 10,
            "label": 10
        },
        {
            "value": 11,
            "label": 11
        },
        {
            "value": 12,
            "label": 12
        }
    ]

    const minutesInputs = [
        {
            "value": 0,
            "label": 0
        },
        {
            "value": 15,
            "label": 15
        },
        {
            "value": 30,
            "label": 30
        },
        {
            "value": 45,
            "label": 45
        }
    ]

    const palette = [
        {
            "color": "#da5151"
        },
        {
            "color": "#ff7700"
        },
        {
            "color": "#f5b216"
        },
        {
            "color": "#1edb8b"
        },
        {
            "color": "#16b6f5"
        },
        {
            "color": "#006fff"
        },
        {
            "color": "#7b00ff"
        },
        {
            "color": "#F200FF"
        },
    ]

    const [addDialogOpen, setAddDialogOpen] = React.useState(false);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [blockName, setBlockName] = React.useState("");
    const [blockHours, setBlockHours] = React.useState(0);
    const [blockMinutes, setBlockMinutes] = React.useState(0);
    const [blockColor, setBlockColor] = React.useState("#da5151");
    const [blockKey, setBlockKey] = React.useState("");

    const [blocks, setBlocks] = React.useState(props.blocks);

    const handleDialogOpen = () => {
        setAddDialogOpen(true);
    }

    const handleDialogClose = () => {
        setAddDialogOpen(false);
    }

    const handleEditClose = () => {
        setEditDialogOpen(false);
        setBlockKey("");
        setBlockName("");
        setBlockHours(0);
        setBlockMinutes(0);
        setBlockColor("#da5151");
    }

    const addNewBlock = () => {
        if (!(blockName === "" || (blockHours === 0 && blockMinutes === 0))) {

            const duration = blockHours + (blockMinutes/60);
            const newKey = randomKey(8);
            
            const newBlock = {
                name: blockName,
                hours: blockHours,
                minutes: blockMinutes,
                duration: duration,
                color: blockColor, 
                completed: false,
                yPos: 0,
                key: newKey,
                day: props.dayIndex,
                month: props.monthIndex,
                year: props.currYear
            }
            setAddDialogOpen(false);
            setBlockName("");
            setBlockHours(0);
            setBlockMinutes(0);
            setBlockColor("#da5151");

            let prevBlocks = blocks;
            prevBlocks.push(newBlock);
            setBlocks([...prevBlocks]);
            props.updateBlocks([...prevBlocks]);
        }
    }

    const cancelAddNewBlock = () => {
        // reset values, close dialog
        setAddDialogOpen(false);
        setBlockName("");
        setBlockHours(0);
        setBlockMinutes(0);
        setBlockColor("#da5151");
    }

    const editBlock = () => {
        const duration = blockHours + (blockMinutes/60);
        let newBlocks = [];
        for (let block of blocks) {
            if (block.key === blockKey) {
                let newBlock = {
                    name: blockName,
                    hours: blockHours,
                    minutes: blockMinutes,
                    duration: duration,
                    color: blockColor, 
                    completed: false,
                    yPos: 0,
                    key: blockKey,
                    day: props.dayIndex,
                    month: props.monthIndex,
                    year: props.currYear
                }
                newBlocks.push(newBlock);
            } else {
                newBlocks.push(block);
            }
        }

        setBlocks([...newBlocks]);
        setEditDialogOpen(false);
        setBlockKey("");
        setBlockName("");
        setBlockHours(0);
        setBlockMinutes(0);
        setBlockColor("#da5151");
        props.updateBlocks([...newBlocks]);
    }

    const cancelEditBlock = () => {
        setEditDialogOpen(false);
        setBlockKey("");
        setBlockName("");
        setBlockHours(0);
        setBlockMinutes(0);
        setBlockColor("#da5151");
    }

    const handleEdit = (key, name, hours, minutes, color) => {
        setBlockKey(key);
        setBlockName(name);
        setBlockHours(hours);
        setBlockMinutes(minutes);
        setBlockColor(color);
        setEditDialogOpen(true);
    }

    const handleDelete = (key) => {
        let newBlocks = [];
        for (let block of blocks) {
            if (block.key !== key) {
                newBlocks.push(block);
            }
        }

        setBlocks([...newBlocks]);
        props.updateBlocks([...newBlocks]);
    }

    const handleCompleted = (key, completed) => {
        let newBlocks = [];
        for (let block of blocks) {
            if (block.key === key) {
                block.completed = completed;
            }
            newBlocks.push(block)
        }

        setBlocks([...newBlocks]);
        props.updateBlocks([...newBlocks]);
    }

    const updateYPos = (key, yPos) => {
        let newBlocks = [];
        for (let block of blocks) {
            if (block.key === key) {
                block.yPos = yPos;
            }
            newBlocks.push(block)
        }
        setBlocks([...newBlocks]);
        props.updateBlocks([...newBlocks]);
    }

    React.useEffect(() => {}, [blocks])

    return (
        <React.Fragment>
            <Grid item xs={1} />
            <Grid item xs={1}>
                <HatchMarks />
            </Grid>
            <Grid item xs={4}>
                <DayItem day={props.days[props.dayIndex]} blocks={blocks} handleEdit={handleEdit} handleDelete={handleDelete} handleCompleted={handleCompleted} updateYPos={updateYPos} />
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" onClick={handleDialogOpen} style={{marginTop: '290px', textTransform: 'none', backgroundColor: '#8c52ff', color: '#ffffff', width: '150px'}}>Add Block</Button>
                
                {
                    // ADD DIALOG
                }
                <Dialog open={addDialogOpen} onClose={handleDialogClose}>
                    <DialogTitle style={{ color: "#8C52FF" }}>Add A New Block</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please input a name for your block
                        </DialogContentText>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Block Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={blockName}
                                    onChange={(e) => setBlockName(e.target.value)}
                                    style={{color: "#000000"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DialogContentText>
                                    Estimate about how long this block will take to complete
                                </DialogContentText>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    select
                                    id="hourSelect"
                                    label="Hours"
                                    value={blockHours}
                                    onChange={(e) => setBlockHours(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                >
                                    {hoursInputs.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    select
                                    id="minuteSelect"
                                    label="Minutes"
                                    value={blockMinutes}
                                    onChange={(e) => setBlockMinutes(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                >
                                    {minutesInputs.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <DialogContentText>
                                    Pick a color for your block
                                </DialogContentText>
                            </Grid>
                            <Grid item xs={8}>
                                    {
                                        palette.map((option) => (
                                            <IconButton key={option.color} onClick={() => setBlockColor(option.color)}>
                                                <SquareIcon style={{backgroundColor: option.color, color: option.color}} />
                                            </IconButton>
                                        ))
                                    }
                            </Grid>
                            <Grid item xs={4}>
                                <DialogContentText>
                                    Selected Color:
                                </DialogContentText>
                            </Grid>
                            <Grid item xs={8}>
                                <DialogContentText>
                                    <SquareIcon style={{marginLeft: '8px', backgroundColor: blockColor, color: blockColor}} />
                                </DialogContentText>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{color: "#8C52FF", textTransform: "none"}} onClick={cancelAddNewBlock}>Cancel</Button>
                        <Button variant="contained" style={{backgroundColor: "#8C52FF", textTransform: "none"}} onClick={addNewBlock}>Add Block</Button>
                    </DialogActions>
                </Dialog>

                {
                    // EDIT DIALOG
                }
                <Dialog open={editDialogOpen} onClose={handleEditClose}>
                    <DialogTitle style={{ color: "#8C52FF" }}>Edit Block</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please input a name for your block
                        </DialogContentText>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Block Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={blockName}
                                    onChange={(e) => setBlockName(e.target.value)}
                                    style={{color: "#000000"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DialogContentText>
                                    Estimate about how long this block will take to complete
                                </DialogContentText>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    select
                                    id="hourSelect"
                                    label="Hours"
                                    value={blockHours}
                                    onChange={(e) => setBlockHours(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                >
                                    {hoursInputs.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    select
                                    id="minuteSelect"
                                    label="Minutes"
                                    value={blockMinutes}
                                    onChange={(e) => setBlockMinutes(e.target.value)}
                                    fullWidth
                                    variant="outlined"
                                >
                                    {minutesInputs.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <DialogContentText>
                                    Pick a color for your block
                                </DialogContentText>
                            </Grid>
                            <Grid item xs={8}>
                                    {
                                        palette.map((option) => (
                                            <IconButton key={option.color} onClick={() => setBlockColor(option.color)}>
                                                <SquareIcon style={{backgroundColor: option.color, color: option.color}} />
                                            </IconButton>
                                        ))
                                    }
                            </Grid>
                            <Grid item xs={4}>
                                <DialogContentText>
                                    Selected Color:
                                </DialogContentText>
                            </Grid>
                            <Grid item xs={8}>
                                <DialogContentText>
                                    <SquareIcon style={{marginLeft: '8px', backgroundColor: blockColor, color: blockColor}} />
                                </DialogContentText>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{color: "#8C52FF", textTransform: "none"}} onClick={cancelEditBlock}>Cancel</Button>
                        <Button variant="contained" style={{backgroundColor: "#8C52FF", textTransform: "none"}} onClick={editBlock}>Edit Block</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
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


    const [day, setDay] = React.useState(props.dayIndex);
    const [monthIndex, setMonthIndex] = React.useState(props.month); 
    const [arrayOfDays, setArrayOfDays] = React.useState(props.dayArray);
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

    const handleNextDay = () => {
        if (day === 41) {
            // last day in month
            if (monthIndex < 12) {
                props.setMonth(monthIndex + 1);
                setMonthIndex(monthIndex + 1);
                setDay(0);
            }
        } else {
            setDay(day + 1);
        }
    }

    const handlePrevDay = () => { 
        if (day === 0) {
            if (monthIndex > 1) {
                props.setMonth(monthIndex - 1);
                setMonthIndex(monthIndex - 1);
                setDay(41);
            }
        } else {
            setDay(day - 1);
        }
    }

    const handleChangeYear = e => {
        setCurrYear(e.target.value);
    }

    React.useEffect(() => {
        getDaysOfMonth();
    }, [setMonthIndex, setCurrYear]);

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
                        <IconButton style={{marginTop: '16px'}} size="large" onClick={handlePrevDay}>
                            <ArrowBackIosNewIcon style={{color: '#ffffff'}} fontSize="inherit" />
                        </IconButton>
                    </Grid>
                    <CalendarRow days={arrayOfDays} dayIndex={day} monthIndex={monthIndex} currYear={currYear} blocks={props.blocks} updateBlocks={props.updateBlocks} />
                    <Grid item xs={1}>
                        <IconButton style={{marginTop: '16px'}} size="large" onClick={handleNextDay}>
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