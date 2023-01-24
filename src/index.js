const express = require("express")
const bodyParser = require("body-parser")
const {PORT} = require("./config/serverConfig")
const EmailService= require("./services/email-service")
const jobs = require('./utils/job')
const TicketController = require('./controller/ticket-controller')

const {subscribeMessage,createChannel} = require('./utils/messageQueue')

const {REMINDER_BINDING_KEY} = require('./config/serverConfig')

const setupAndStartServer=async()=>{

    const app = express();
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
   
    // const channel = await createChannel();

    app.post('/api/v1/tickets',TicketController.create)

    const channel = await createChannel();
    subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY)
    
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