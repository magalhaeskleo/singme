'use strict';
const nodemailer = require('nodemailer');

module.exports = {
  async senEmail(request, response) {
    const assunto = 'Nome  para a lista';
    const enviarPara = 'magalhaeskleo@gmail.com';
    const mensagem = 'Mensagem de teste do servidor SMTP';
    let resp = '';

    await nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com', // Gmail Host
        port: 465, // Port
        secure: true, // this is true as port is 465
        auth: {
          user: 'gruporpzmuitoprazer@gmail.com', //Gmail username
          pass: 'muitoprazer', // Gmail password
        },
      });

      let mailOptions = {
        from: '"Grupo RPZ" <gruporpzmuitoprazer@gmail.com>',
        to: enviarPara, // Recepient email address. Multiple emails can send separated by commas
        subject: assunto,
        text: mensagem,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return response.json(error);
        }
        resp = info.messageId;
        console.log('Message sent: %s', info.messageId);
      });
    });

    return response.json(resp);
  },
};
