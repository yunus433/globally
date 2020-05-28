const nodemailer = require('nodemailer');

const htmlToText = require('nodemailer-html-to-text').htmlToText;

const transporter = nodemailer.createTransport({
  direct: true,
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER_NAME, 
    pass: process.env.MAIL_PASSWORD
  }
});
transporter.use('compile', htmlToText());

const templates = {
  password_reset: (data) => ({
    to: data.email,
    subject: 'Ceo Yeşilyurt: Şifre Sıfırlama',
    html: `
      Değerli kullanıcımız,
      <br />
      <br />
      Şifrenizi sıfırlamak için istekte bulundunuz. Bu linke tıklayarak şifrenizi sıfırlayabilirsiniz: <a href='http://localhost:3000/auth/reset?id=${data.user_id}&code=${data.code}'>http://localhost:3000/auth/reset<a />
      <br />
      <br />
      Eğer bu isteği siz göndermediyseniz lütfen bu e-posta'yı görmezden gelin. Güvenlik önlemleri hakkında admin@stumarkt.com adresinden temsilcilerimize danışabilirsiniz.
      <br />
      <br />
      Ceo Yeşilyurt
    `
  })
};

module.exports = (data, template, callback) => {
  const mailOptions = {
    from: "admin@stumarkt.com",
    ...templates[template](data)
  };
  transporter.sendMail(mailOptions, callback);
};
