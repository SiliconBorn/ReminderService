const express = require("express")
const bodyParser = require("body-parser")
const {PORT} = require("./config/serverConfig")
const {sendBasicEmail} = require("./services/email-service")
const jobs = require('./utils/job')
const TicketController = require('./controller/ticket-controller')
const setupAndStartServer=()=>{

    const app = express();
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    app.post('/api/v1/tickets',TicketController.create)
    
    app.listen(PORT,()=>{

        console.log(`server started on port ${PORT}`)
        jobs();
        // sendBasicEmail(
        //     "support@admin.com",
        //     "siliconBorn97@gmail.com",
        //     "This is a testing email",
        //     "Hey! how are you ? I hope you like the support"
        // )
    })
}

setupAndStartServer()