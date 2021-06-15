const nodemailer = require("nodemailer")
require("dotenv").config()

module.exports = async function Email() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  console.log("sending email")
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"OneWeekChallengeApp" <alessandro@corbyart.digital>', // sender address
    to: "<acorbinelli@gmail.com>", // list of receivers
    subject: "Please Confirm your account", // Subject line
    text: "Link here", // plain text body
    html: "<b>Link Here</b>", // html body
  })

  console.log("Message sent: %s", info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
