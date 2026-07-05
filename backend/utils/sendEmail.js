const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    const mailOptions ={
        from: process.env.Email_user,
        to,
        subject,
        text
    };

    await transporter.sendMail(mailOptions);
     
    

    console.log('Email sent successfully');

  } catch (error) {
    console.error('Email bhejne mein error:', error);
  }
};

module.exports = sendEmail;