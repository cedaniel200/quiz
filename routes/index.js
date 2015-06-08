var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors:[] });
});

/* GET author page. */
router.get('/author', function(req, res) {
  res.render('author', { author: 'César Daniel Meneses Guevara', errors:[] });
});

// AUTOLOAD de comandos con :quizId
router.param('quizId', quizController.load); // AUTOLOAD :quizId

// Definición de rutas del /quizes
router.get('/quizes',                         quizController.index);
router.get('/quizes/:quizId(\\d+)',           quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',    quizController.answer);
router.get('/quizes/new',                     quizController.new);
router.post('/quizes/create',                 quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',      quizController.edit);
router.put('/quizes/:quizId(\\d+)',           quizController.update);
router.delete('/Quizes/:quizId(\\d+)',        quizController.destroy);

module.exports = router;
