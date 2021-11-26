import { makeStyles } from "@material-ui/core";


export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
   
   
  },
  menuButton: {
    marginRight: theme.spacing(1),
    color: "black",
  },
  title: {
    fontSize: "1.35rem",
    color: "#5f6368",
    marginLeft: "5px",
    cursor: "pointer",
    paddingTop:"5%"

   
  },
  appBar: {
    color: "black",
   backgroundColor:"white",
  },
  toolbar: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerWrapper: {
    display: "flex",
    alignItems: "center",
    
  },
  header__wrapper__right: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  icon: {
    
    marginRight: "15px",
    color: "#5f6368",
    cursor: "pointer",
  },

  img :{
    width:'70px',
    height:'52px',
    padding:"5%",
  }
}));