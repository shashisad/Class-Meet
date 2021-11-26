import { Add } from '@material-ui/icons'
import {Avatar } from '@material-ui/core';
import { AppBar, Menu, Toolbar, Typography,MenuItem} from '@mui/material'
import React   from 'react'
import { useStyles } from "./style"
import { CreateClass } from '..';
import { useLocalContext } from '../../context/context';
import JoinClass from '../JoinClass.js/JoinClass';

import logo from './logo.png'


export const Header = ({children}) => {
    const classes =useStyles();

    const [anchorEl,setAnchorEl]=React.useState(null);
    
    const {
      setCreateClassDialog ,
      setJoinClassDialog,   
      loggedInUser,
   
    }=useLocalContext();


    const handleClick=(event)=>{
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => setAnchorEl(null);



    const handleCreate = () => {
        handleClose();
        setCreateClassDialog(true);
      };
    
      const handleJoin = () => {
        handleClose();
        setJoinClassDialog(true);
      };



    return (
      <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
            <Toolbar className={classes.toolbar}>

        <div className={classes.headerWrapper}>
            {children}
            <img src={logo} className ={classes.img}alt="Class"/>
            <Typography variant="h6" className={classes.title}>
            
            </Typography>
        </div>

              <div className={classes.header__wrapper__right}>
              <Add onClick={handleClick}className={classes.icon} />
              {/* <Apps className={classes.icon}/> */}
           <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleJoin} > Join Class</MenuItem>
              <MenuItem onClick={handleCreate}>Create Class </MenuItem>
            </Menu>
    <div>

<Avatar src={loggedInUser?.photoURL} className={classes.icon}/>
</div>
</div>
</Toolbar>

</AppBar>
<JoinClass/>
<CreateClass/>

        </div>
    )
}
