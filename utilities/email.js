const nodemailer = require('nodemailer')



//Email class
module.exports =  class Email {
    constructor(user='',url='',from='',to='',subject='',message='',senderName ='') {
        this.user = user
        this.from = from || process.env.EMAIL_FROM
        this.to = to || user.email
        this.subject = subject 
        this.senderName = senderName
        this.message = message
        this.hostEmail = process.env.HOST_EMAIL
        this.hostEmailPassword = process.env.EMAIL_PASSWORD
        this.url = url

    }
    //1.  create transporter
    createTransporter() {
        if (process.env.NODE_ENV === 'development') {
            return nodemailer.createTransport({ //use mailtrap as transporter in development
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "fdda7e650b288d",
                    pass: "14d036a3a0d872"
                }
            });
        } else { //use gmail as transporter in production
            return nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: this.hostEmail,
                    pass: this.hostEmailPassword
                }
            });
        }
    }

    //2. send email
    async sendEmail(subject,html,) {
        // send mail with defined transport object
        let options = {
            from: this.from, // sender address
            to: this.to, // list of receivers
            subject, // Subject line
            // text:message,
            html, // html body
        }

        await this.createTransporter().sendMail(options)

    }

    //3. send welcome email
    async welcomeEmail(){
        let subject = `Welcome ${this.user.userName}`
        const html = `<h1>${subject}</h1>
        <b>Welcome ${this.user.userName}. Thanks for joining, feel free to email us if you need any help.💖❤💖</b>`
        // const text = `Welcome ${this.user.userName}. Thanks for joining, feel free to email us if you need any help.💖❤💖`
        await this.sendEmail(subject,html)
    }


    //4. send pasword reset email
    async sendPasswordResetEmail(){
        let subject = 'Password reset'
        const html = `<h1>${subject}</h1>
        <b>Please click on the link to change your password, if not then ignore this. <link>${this.url}</link></b> `
        await this.sendEmail(subject,html)
    }


    //5. send contact email
    async contactEmail(){
        console.log(this.subject,this.from, this.senderName,this.to)
        const subject = this.subject
        const html = `<h1>${subject}</h1>
        <b>Message from ${this.senderName} from email: ${this.from}</b> 
        <p>Message: ${this.message}</p>`
        // const message = `Message from ${this.senderName}, message: ${this.message}`
        await this.sendEmail(subject,html)
        
    }

}







