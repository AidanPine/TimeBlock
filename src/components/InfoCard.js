import * as React from 'react';
import { Typography, Grid } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import TimelineIcon from '@mui/icons-material/Timeline';
import SwipeVerticalIcon from '@mui/icons-material/SwipeVertical';
import AddTaskIcon from '@mui/icons-material/AddTask';

const InfoCard = (props) => {
    let icon;
    switch (props.img) {
      case 1:
        icon = <ViewListIcon style={{color: "#8C52FF"}} sx={{fontSize: 80}} />;
        break;
      case 2:
        icon = <TimelineIcon style={{color: "#8C52FF"}} sx={{fontSize: 80}} />;
        break;
      case 3:
        icon = <SwipeVerticalIcon style={{color: "#8C52FF"}} sx={{fontSize: 80}} />;
        break;
      default:
        icon = <AddTaskIcon style={{color: "#8C52FF"}} sx={{fontSize: 80}} />;
        break;
    }
  
    return (
      <Grid item xs={12} sm={12} md={6} lg={6} container style={{padding: "50px"}}>
        <Grid item xs={8} align="left">
          <Typography variant="h5" style={{color: "#eeeeee", marginTop: "20px", lineHeight: "30px"}}>{props.title}</Typography>
        </Grid>
        <Grid item xs={4}>
          {icon}
        </Grid>
        <Grid item xs={12} align="left">
          <Typography variant="h5" style={{color: "#8C52FF", marginBottom: "20px"}}>{props.subtitle}</Typography>
        </Grid>
      </Grid>
    );
}

export default InfoCard;