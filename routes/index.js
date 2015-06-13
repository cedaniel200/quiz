var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[] });
});

/* GET author page. */
router.get('/author', function(req, res) {
  res.render('author', { author: 'César Daniel Meneses Guevara', errors:[] });
});

// AUTOLOAD de comandos con :quizId
router.param('quizId',    quizController.load); // AUTOLOAD :quizId
router.param('commentId', commentController.load); // AUTOLOAD :commentId

// Definicion de rutas de sessionController
router.get('/login',      sessionController.new); // Formulario de login
router.post('/login',     sessionController.create); // crear sessionController
router.get('/logout',     sessionController.destroy ); // destruir sesion, deberia ser delete para trabajar con delete se debe
// poner el boton logout que esta en el layout.ejs entre un formulario methodOverride para sobreescribir el metodo get y pasarlo a delete


// Definición de rutas del /quizes
router.get('/quizes',                         quizController.index);
router.get('/quizes/:quizId(\\d+)',           quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',    quizController.answer);
router.get('/quizes/new',                     sessionController.loginRequired, quizController.new);
router.post('/quizes/create',                 sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',      sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',           sessionController.loginRequired, quizController.update);
router.delete('/Quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.destroy);

// Definicion de las rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new',            commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',               commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish); // DEBIA SER UN put


module.exports = router;
