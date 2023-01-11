const cron = require('node-cron');
const sender = require('../config/emailConfig');
const emailService = require('../services/email-service')

const setupJobs =()=>{
    cron.schedule('*/2 * * * *', async()=>{
        try {
            const response = await emailService.fetchPendingEmails()
             response.forEach((email)=>{
                sender.sendMail({
                    // from:"ReminderService@airline.com",
                    to:email.recepientEmail,
                    subject:email.subject,
                    text:email.content
             },async(err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(data)
                    await emailService.updateTicket(email.id,{status:"SUCCESS"})
                }
            
             })
            })
            console.log(response)
            
        } catch (error) {
            console.log(error)
            throw error
        }
    })
}



module.exports = setupJobs;