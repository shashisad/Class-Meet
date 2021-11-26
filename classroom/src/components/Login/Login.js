import { Button ,Grid} from "@material-ui/core";

import React from "react";
// import logo from "../../assets/logo.png";
import { useLocalContext } from "../../context/context";
import SwipeableTemporaryDrawer from "../Drawer/Drawer";
import clas from './class.jpg'
import "./style.css";
const Login = () => {
  const { login, loggedInUser } = useLocalContext();

  console.log(loggedInUser);
  return (
    
   
    <div className="login">
    <SwipeableTemporaryDrawer/>
    <Grid container spacing={2} className="grid">
  <Grid item xs={6} className="grid-col-1">
  <div>
  <div className="content">
  An online productive tool for online
learning which meets teachers’ and learners’ needs conventionally.
</div>
<div className="content-in"> Platform to maintain classes with feature of Announcement and conduct classes with the feature of video call.

</div>
<div className="buttonbtn">
  <Button variant="contained" color="primary" onClick={() => login()}>
        Login Now!
      </Button>

</div>
      </div>
  </Grid>
  <Grid item xs={6} className="col">
  <div className="grid-col-2">
   <img className="class-photo" src={clas} alt="classroom"/>
   </div>
  </Grid>
 
</Grid>
   
      {/* <img className="login__logo"  alt="Classroom" /> */}

      
    
   
    </div>
  );
};

export default Login;