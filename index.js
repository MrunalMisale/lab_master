const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const admin = require("firebase-admin");
const credentials = require("./key.json");
const nodemailer = require('nodemailer');

let mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "Enter your service account gmail here",
        pass: "Password of that account"
    }
})

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "<--Database URL of firebase-->"
});
var db = admin.database();

app.use(express.json());
app.use(cors());

app.get('/',async(req,resp)=>{
    resp.send("Server deployed Successfully!");
})

app.post('/login', async (req, resp) => {
    const userName = req.body.username;
    const password = req.body.password;
    const ref = db.ref(`users/${userName}`).on("value", (snapshot) => {
        if (snapshot.exists()) {
            if (bcrypt.compareSync(password, snapshot.val().password)) {

                resp.send({ success: "Logged In Successfully!", status: true, role: snapshot.val().role, email: snapshot.val().email, username: snapshot.val().username })

            } else {
                resp.send({ error: "Incorrect Password!", status: false })
            }
        } else {
            resp.send({ error: "User not found!", status: false })
        }
    }, (err) => {
        console.log(err)
    })
})

app.post('/admin/dashboard/enroll-user', async (req, resp) => {
    const username = req.body.username;
    await bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        } else {
            console.log(hash)
            const ref = db.ref(`users/${username}`).set({
                email: req.body.email,
                password: hash,
                username: req.body.username,
                role: req.body.role
            });
        }
    });

    if (req.body.role == "Tech") {
        const result = db.ref(`mailInfo`).push({
            email: req.body.email
        })
    }
    resp.send({ success: "Registered Successful!", status: true })
})

app.delete('/admin/dashboard/delete-user', async (req, resp) => {
    const ref = db.ref(`users/${req.query.username}`).remove();
    resp.send({ success: "Removed Successfully!" })
})

app.post("/admin/dashboard/add-lab", async (req, resp) => {
    let ref = await db.ref("labs").child(`${req.body.lab_no}`).set({
        lab_no: req.body.lab_no,
        lab_name: req.body.lab_name,
        incharge_name: req.body.incharge_name
    })

    let result = await db.ref("sysadmin/configure").child(`${req.body.lab_no}`).set({
        lab_no: req.body.lab_no,
        lab_name: req.body.lab_name,
        incharge_name: req.body.incharge_name
    })
    resp.send({ success: "Added Successfully!" })
})

app.delete('/admin/dashboard/delete-lab', async (req, resp) => {
    const ref = db.ref("labs").child(`${req.query.labno}`).remove();
    const res = db.ref(`sysadmin/configured/${req.query.labno}`).on('value', snapshot => {
        if (snapshot.exists()) {
            db.ref(`sysadmin/configured/${req.query.labno}`).remove()
        } else {
            return;
        }
    })
    const result = db.ref(`sysadmin/configure/${req.query.labno}`).on('value', snapshot => {
        if (snapshot.exists()) {
            db.ref(`sysadmin/configure/${req.query.labno}`).remove()
        } else {
            return;
        }
    })
    resp.send({ success: "Removed Successfully!" })
})

// app.get('/system_admin/dashboard/labs/configure/:id', async (req, resp) => {
//     console.log(req.params.id)
// })

app.post('/system_admin/dashboard/labs/configure/:id', async (req, resp) => {
    let ref = db.ref(`sysadmin/configured/${req.params.id}`).update({
        lab_no: req.params.id,
        lab_name: req.body.lab_name,
        gridARow: req.body.gridARow,
        gridAColumn: req.body.gridAColumn,
        incharge_name: req.body.incharge_name
    })
    let result = db.ref(`sysadmin/configure/${req.params.id}`).remove()
    resp.send({ success: "Succeed" });
})

app.post('/system_admin/dashboard/labs/configure/:id/:pc', async (req, resp) => {
    let pcs = req.params.pc
    console.log(pcs)
    let ref = await db.ref(`sysadmin/configured/${req.params.id}/pc/${req.params.pc}`).set({
        lab_no: req.params.id,
        pc_no: req.params.pc,
        pc_memory: "",
        pc_processor: "",
        pc_ram: "",
        pc_os: "",
        issueCount: 0,
        issueStatus: false,
        issueResolved: 0
    })
    resp.send({ success: `${pcs} Added Successfully` });
})

app.post('/system_admin/dashboard/labs/view/:lab/:pc', async (req, resp) => {
    console.log(req.params.lab, req.params.pc, req.body.os)
    console.log(req.body.ram, req.body.processor, req.body.memory)
    let ref = await db.ref(`sysadmin/configured/${req.params.lab}/pc/${req.params.pc}`).update({
        pc_os: req.body.os,
        pc_ram: req.body.ram,
        pc_processor: req.body.processor,
        pc_memory: req.body.memory
    })
    resp.send({ success: "Updated!" })
})

app.post('/incharge/dashboard/lab/:lab', async (req, resp) => {
    let ref = await db.ref(`sysadmin/configured/${req.params.lab}/pc/${req.body.pc_no}/issues/currentIssue/issueNo${req.body.issue_no}`).set({
        timestamp: req.body.timestamp,
        issueDescription: req.body.issueDescription,
        lab_no: req.params.lab,
        pc_no: req.body.pc_no,
        issue_no: req.body.issue_no,
        faculty_email: req.body.faculty_email,
        reportedBy: req.body.reportedBy
    })
    let res = await db.ref(`sysadmin/configured/${req.params.lab}/pc/${req.body.pc_no}`).update({
        issueCount: req.body.issueCount,
        issueStatus: true
    })
    
    const userData = await db.ref("mailInfo").on("value", snapshot => {
        let users = [];
        snapshot.forEach((item) => {
            users.push(item.val().email)
        })
        let details = {
            from: "Enter your service account gmail here",
            to: users,
            subject: `New Issue Reported on Lab No - ${req.params.lab}`,
            text:   `Hey System- Administrator,
            A new issue has being raised in Lab No - ${req.params.lab}, PC No. : ${req.body.pc_no}
            Issue Description : ${req.body.issueDescription}.
            Reported by ${req.body.reportedBy}.
            Contact : ${req.body.faculty_email}. 
            Please look into this issue as soon as possible.`
        }
        mailTransport.sendMail(details,(err)=>{
            if(err){
                console.log("It has an error", err)
            }else{
                console.log("Email has sent successfully!");
            }
        })
        
    })
    
    resp.send({ success: "Issue Reported" })
})

app.post('/system_admin/dashboard/labs/view/:lab', async (req, resp) => {

    console.log(req.params.lab, req.body.pc_no, req.body.issue_no, req.body.timestamp, req.body.issueDescription, req.body.solution, req.body.faculty_name, req.body.faculty_email, req.body.technician_email, req.body.technician_name)
    let ref = await db.ref(`sysadmin/configured/${req.params.lab}/pc/${req.body.pc_no}/issues/resolved/issueNo${req.body.issue_no}`).update({
        timestamp: req.body.timestamp,
        issueDescription: req.body.issueDescription,
        lab_no: req.params.lab,
        pc_no: req.body.pc_no,
        issue_no: req.body.issue_no,
        solution: req.body.solution,
        resolvedTimestamp: req.body.resolvedTimestamp
    })
    let result = await db.ref(`sysadmin/configured/${req.params.lab}/pc/${req.body.pc_no}`).update({
        issueStatus: false,
        issueResolved: req.body.issueResolved
    })
    let technician_email = req.body.technician_email;
    let details = {
        from: technician_email,
        to: req.body.faculty_email,
        subject:`Issue resolved of Lab No - ${req.params.lab}`,
        text:`Hey ${req.body.faculty_name} ,
        Issue reported in Lab No. ${req.params.lab}, PC-No. ${req.body.pc_no} with an issue ${req.body.issueDescription} is being resolved by ${req.body.technician_name} on ${req.body.timestamp} providing solution :
        ${req.body.solution}.
        If faced more such issues, please report on the portal or contact ${req.body.technician_name} on ${technician_email}`
    }

    mailTransport.sendMail(details,(err)=>{
        if(err){
            console.log("It has an error", err)
        }else{
            console.log("Email has sent successfully!");
        }
    })
    
    let res = await db.ref(`sysadmin/configured/${req.params.lab}/pc/${req.body.pc_no}/issues/currentIssue/issueNo${req.body.issue_no}`).remove()


    let reportQuery = await db.ref(`report/2023/${req.body.month}`).push({
        timestamp: req.body.timestamp,
        issueDescription: req.body.issueDescription,
        lab_no: req.params.lab,
        pc_no: req.body.pc_no,
        issue_no: req.body.issue_no,
        solution: req.body.solution,
        resolvedTimestamp: req.body.resolvedTimestamp
    })
    let key = reportQuery.key
    console.log(key);
    resp.send({ status: "Done resolved!" })
})

app.put('/system_admin/dashboard/labs/view/:lab', async(req,resp)=>{
    console.log("this api is being called")
    console.log(req.params.lab, req.body.pc_no, req.body.issue_no, req.body.timestamp, req.body.issueDescription, req.body.solution, req.body.faculty_name, req.body.faculty_email, req.body.technician_email, req.body.technician_name)
    let faculty_email = req.body.faculty_email;
    let technician_email = req.body.technician_email;
    let details = {
        from: technician_email,
        to: [req.body.faculty_email, '<mailID of Admin>'],
        subject:`System Administrator revert back a issue of Lab No - ${req.params.lab}`,
        text:`Hey there,
        Issue reported in Lab No. ${req.params.lab}, PC-No. ${req.body.pc_no} with an issue ${req.body.issueDescription} is being revert back by ${req.body.technician_name} on ${req.body.timestamp} providing some points :
        ${req.body.solution}.

        These were some points/requirement that is to be needed/fulfilled before going towards further steps.
        If faced more such issues, please report on the portal or contact ${req.body.technician_name} on ${technician_email}`
    }

    mailTransport.sendMail(details,(err)=>{
        if(err){
            console.log("It has an error", err)
        }else{
            console.log("Email has sent successfully!");
        }
    })

    let resu = await db.ref(`sysadmin/configured/${req.params.lab}/pc/${req.body.pc_no}`).update({
        issueStatus: false
    })

    let res = await db.ref(`sysadmin/configured/${req.params.lab}/pc/${req.body.pc_no}/issues/currentIssue/issueNo${req.body.issue_no}`).remove()

    resp.send({status:"revert backed successfully!"})
})

const port = process.env.port || 5000;
app.listen(port,()=>console.log("Hello World!"));