import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SchoolIcon from '@mui/icons-material/School';
import LoginIcon from '@mui/icons-material/Login';
import { makeStyles } from "@material-ui/core";
import { Header } from '../Header/Header';
import {  IconButton } from '@mui/material';
import { Menu } from '@material-ui/icons';
import ClassIcon from '@mui/icons-material/Class';
import { useLocalContext } from '../../context/context';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
  
    color: "black",
  },
});

export default function SwipeableTemporaryDrawer() {
 
  const routeChange = () =>{ 
   window.location.href= 'http://localhost:5000/action.html';
  }

  const [anchorEl,setAnchorEl]=React.useState(null);
  const {
    setCreateClassDialog ,
    setJoinClassDialog,   
    loggedInUser,
    
    logout,
  }=useLocalContext();



//   const handleClick=(event)=>{
//     setAnchorEl(event.currentTarget);
// }

const handleClose = () => setAnchorEl(null);



const handleCreate = () => {
    handleClose();
    setCreateClassDialog(true);
  };

  const handleJoin = () => {
    handleClose();
    setJoinClassDialog(true);
  };


  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[ 'Join Class' ,'Create Class'].map((text, index) => (
          <ListItem button key={text}>
            
              {index % 2 === 0 ?     <ListItemText primary={text}  onClick={handleJoin}  /> :  (loggedInUser ?<ListItemText primary={text}  onClick={handleCreate}/>:<Divider/>) }
              <ListItemIcon>
              {index % 2 === 0 ? <ClassIcon /> :  <ClassIcon /> }
            </ListItemIcon>
           
          </ListItem>
        ))}
      </List>
   
      <Divider />
      <List>
        {[ 'Class-Meet','Logout'].map((text, index) => (
          <ListItem button key={text}>
            
              {index % 2 === 0 ?     <ListItemText primary={text}  onClick={() =>routeChange("/") }/> :   (loggedInUser ?<ListItemText primary={text}  onClick={() => logout()}/>: <ListItemText/>)}
              <ListItemIcon>
              {index % 2 === 0? <SchoolIcon /> :   (loggedInUser ?<LoginIcon />:<Divider/>) }
            </ListItemIcon>
           
          </ListItem>
        ))}
      </List>

    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
        <Header>
        <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(anchor,true)}
        >
 <Menu className={classes.menuButton}/>
        </IconButton>
        </Header>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]||false}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
