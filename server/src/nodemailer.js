const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PW
	}
})
module.exports = {
	createEmail(fromUser, toUser, subject, message) {
		return transporter.sendMail({
			from: fromUser,
			to: toUser,
			subject: subject,
			html: `<p>${message}</p>`
		});
	}
}



