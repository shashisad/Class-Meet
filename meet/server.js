const express=require("express");
const { fstat } = require("fs");
const path=require("path");


var app=express();
var server=app.listen(process.env.PORT||5000,function(){
    console.log("listening to port 5000");
});

const fs= require("fs");
const fileUpload = require("express-fileupload");
const io=require("socket.io")(server,{
    allowEIO3: true // false by default 
});
app.use(express.static(path.join(__dirname,"")));

var userConnection=[];

io.on("connection",(socket)=>{
    // console.log( "socket id"+socket.id);
    socket.on("userconnect",(data)=>{
        // console.log("userconnect",data.displayName,data.meetingid);
        var other_users=userConnection.filter(
            (p)=>p.meeting_id==data.meetingid
        );
        userConnection.push({
            connectionId:socket.id,
            user_id:data.displayName,
            meeting_id:data.meetingid,
        });

var userCount =userConnection.length;

        other_users.forEach((v)=>{
            socket.to(v.connectionId).emit("inform_others_about_me",{
                other_user_id:data.displayName,
                connId:socket.id,
                userNumber:userCount,
            });

        });

// ----------------------------inform_me_about_other_users-----------------
        socket.emit("inform_me_about_other_user",other_users);
    });

    socket.on("SDPProcess",(data)=>{
        socket.to(data.to_connid).emit("SDPProcess",{
            message: data.message,
            from_connid: socket.id,
        })
    })

    socket.on("sendMessage",(msg)=>{
        // console.log(msg);
        var mUser = userConnection.find((p)=> p.connectionId ==socket.id);
        if(mUser){
            var meetingid = mUser.meeting_id;
            var from = mUser.user_id;
            var list = userConnection.filter((p)=>p.meeting_id == meetingid)    ;
            list.forEach((v)=>{
                socket.to(v.connectionId).emit("showChatMessage",{
                    from:from,
                    message:msg
                })
            })  
     }
    })

    socket.on("fileTransferToOther",(msg)=>{
        // console.log(msg);
        var mUser = userConnection.find((p)=> p.connectionId ==socket.id);
        if(mUser){
            var meetingid = mUser.meeting_id;
            var from = mUser.user_id;
            var list = userConnection.filter((p)=>p.meeting_id == meetingid)    ;
            list.forEach((v)=>{
                socket.to(v.connectionId).emit("showFileMessage",{
                   username: msg.username,
                    meetingid:msg.meetingid,
                   filePath: msg.filePath,
                   fileName: msg.fileName,
                })
            })  
     }
    })

    

    socket.on("disconnect",function(){
        // console.log(
        //     "disconnected"
        // );

        var disUser =userConnection.find((p)=> p.connectionId==socket.id);
        if(disUser){
            var meetingid = disUser.meeting_id;
            userConnection =userConnection.filter((p)=>p.connectionId !=socket.id);
            var list =userConnection.filter((p)=>p.meeting_id == meetingid)
            list.forEach((v)=>{
                var userNumberAfterUserLeave=userConnection.length;
                socket.to(v.connectionId).emit("inform_other_about_disconnected_user",{
                    connId:socket.id,
                    uNumber:userNumberAfterUserLeave,
                });

            });
        }
    });
});

app.use(fileUpload());
app.post("/attachimg",function(req,res){
    var data=req.body;
    var imageFile  =req.files.zipfile;
    var dir=`public/Assets/attachment/${data.meeting_id}/`;
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
   imageFile.mv("public/Assets/attachment/"+data.meeting_id+"/"+imageFile.name,function(e){
    if(e){
        console.log("could not upload image ,error:"+e);
    
    }else{
        console.log("successfully file uploaded");
    }
   })
})
