var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var novedadesModel = require('../models/novedadesModel');

/* GET home page. */
router.get('/', async function(req, res, next) {

  var novedades = await novedadesModel.getNovedades()

  res.render('index',{
    novedades
  });
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
