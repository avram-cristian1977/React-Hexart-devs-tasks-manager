const express = require("express")
const cors = require("cors")
const devs = require("./devs")
const tasks = require("./tasks")
const app = express()

const nodemailer = require("nodemailer")
const e = require("express")




app.use(cors())
app.use(express.json())
app.listen(3003, ()=>{
    console.log("Server is running on port 3003");
})

app.post('/informationmail', (req, res)=>{
    const jobType = req.body.jobType;
    const emails = req.body.emails;
    console.log("jobType", jobType, "emails", emails);
    const transporter = nodemailer.createTransport({
        service:"Yahoo",
        secure: false,
        port: 465,
        auth:{
            user:"amarcuadrian@yahoo.com",
            pass:"ecucoswsthjrvlwk"
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    let send_emails = ''
    emails.map(email => {
        send_emails += email + ', ';
    })
    const options = {
        from : "amarcuadrian@yahoo.com",
        to : send_emails,
        subject : "Job opportunity",
        text : `Hello! Would you be interested in creating an ${jobType} ?`
    }
    
    transporter.sendMail(options, function(err, info){
        if(err){
            console.log(err);
        }
        console.log("Mail sent")
    })
    res.send("Got data");
    res.end();
})

app.get("/devs", (req,res)=>{
    res.send(devs)
})

app.get("/tasks", (req,res)=>{
    res.send(tasks)
})