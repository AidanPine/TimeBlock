import React from "react";
import Draggable from "react-draggable";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText, DialogTitle,
    Grid,
    IconButton, MenuItem, TextField
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import {monthOffsets} from "../data_functions/monthOffsets";
import SquareIcon from "@mui/icons-material/Square";
import {connect} from "react-redux";
import {addBlock, deleteBlock, editBlock} from "../redux_functions/actions";

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

    const getBlock = () => {
        return {
            name: props.name,
            hours: props.hours,
            minutes: props.minutes,
            duration: props.duration,
            color: props.color,
            completed: props.completed,
            yPos: props.yPos,
            key: props.id,
        }
    }

    const editBlock = () => {
        props.handleEdit(props.id, props.name, props.hours, props.minutes, props.color);
    }

    const deleteBlock = () => {
        props.handleDelete(props.id);
    }

    const toggleCompleted = () => {
        setCompleted(!completed);
        props.handleCompleted(getBlock(), !completed);
    }

    const handleDrag = (e, ui) => {
        //console.log(yPos + ui.deltaY);
        setZIndex(1000);
        setYPos(yPos + ui.deltaY);
    }

    const handleStop = () => {
        setZIndex(1);
        props.updateYPos(getBlock(), yPos);
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

    let offset = 0;
    for (let yearOffset of monthOffsets) {
        // console.log(yearOffset.year);
        if (yearOffset.year === props.currYear) {
            for (let month of yearOffset.offsets) {
                // console.log(month.month);
                if (month.month === props.monthIndex) {
                    offset = month.offset;
                    // console.log(yearOffset.year, month.month);
                }
            }
        }
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
                        block.day === dateNum+offset && block.month === props.monthIndex && block.year === props.currYear ? <Block
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

    //const [blocks, setBlocks] = React.useState(props.blocks);

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

            props.addBlock(newBlock);
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
        //let newBlocks = [];
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
        };
        /*
        for (let block of props.blocks) {
            if (block.key === blockKey) {
                //newBlocks.push(newBlock);
            } else {
                //newBlocks.push(block);
            }
        }
        */
        props.editBlock(newBlock);

        //setBlocks([...newBlocks]);
        setEditDialogOpen(false);
        setBlockKey("");
        setBlockName("");
        setBlockHours(0);
        setBlockMinutes(0);
        setBlockColor("#da5151");
        //props.updateBlocks([...newBlocks]);
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
        /*
        let newBlocks = [];
        for (let block of blocks) {
            if (block.key !== key) {
                newBlocks.push(block);
            }
        }*/

        //setBlocks([...newBlocks]);
        //props.updateBlocks([...newBlocks]);
        props.deleteBlock(key);
    }

    const handleCompleted = (block, completed) => {
        /*
        let newBlocks = [];
        for (let block of blocks) {
            if (block.key === key) {
                block.completed = completed;
            }
            newBlocks.push(block)
        }*/
        block.completed = completed;
        block.day = props.dayIndex;
        block.month = props.monthIndex;
        block.year = props.currYear;

        props.editBlock(block);
        //setBlocks([...newBlocks]);
        //props.updateBlocks([...newBlocks]);
    }

    const updateYPos = (block, yPos) => {
        /*
        let newBlocks = [];
        for (let block of blocks) {
            if (block.key === key) {
                block.yPos = yPos;
            }
            newBlocks.push(block)
        }
        setBlocks([...newBlocks]);
        props.updateBlocks([...newBlocks]); */
        block.yPos = yPos;
        block.day = props.dayIndex;
        block.month = props.monthIndex;
        block.year = props.currYear;

        props.editBlock(block);
    }

    return (
        <React.Fragment>
            <Grid item xs={1} />
            <Grid item xs={1}>
                <HatchMarks />
            </Grid>
            <Grid item xs={4}>
                <DayItem day={props.days[props.dayIndex]} blocks={props.blocks} handleEdit={handleEdit} handleDelete={handleDelete} handleCompleted={handleCompleted} updateYPos={updateYPos} monthIndex={props.monthIndex} currYear={props.currYear} />
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" onClick={handleDialogOpen} style={{marginTop: '290px', textTransform: 'none', backgroundColor: '#8c52ff', color: '#ffffff', borderRadius: '10px'}} endIcon={<AddIcon />}>Add Block</Button>

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

const mapDispatchToProps = (dispatch) => {
    return {
        addBlock: (newBlock) => dispatch(addBlock(newBlock)),

        editBlock: (block) => dispatch(editBlock(block)),

        deleteBlock: (blockID) => dispatch(deleteBlock(blockID))
    }
}

export default connect(null, mapDispatchToProps)(CalendarRow);