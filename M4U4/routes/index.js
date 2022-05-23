var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tarea 1'});
});

  router.post('/', async(req, res, next) => {
    var nombre = req.body.nombre;
    var email = req.body.email;
    var mensaje = req.body.mensaje;

    var obj = {
      to: 'facundoroblesrutigliano@gmail.com',
      subject: 'CONTACTO WEB',
      html: nombre + " se contacto a traves de la pagina web y quiere mas informacion a este correo: " + email + ".<br> Ademas, hizo este comentario: " + mensaje 
    }
    var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    var info = await transport.sendMail(obj);

    res.render('index'), {
      message: 'mensaje enviado correctamente'
    };
  });


module.exports = router;
