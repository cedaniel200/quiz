var models = require('../models/models.js');


// AUTOLOAD - factoriza el código si ruta incluye :quizId
exports.load = function(req,res, next, quizId){
  models.Quiz.find(quizId).then(
    function(quiz){
      if(quiz){
        req.quiz = quiz;
        next();
      }else{
        next(new Error('No existe quizId = '+quizId));
      }
    }
  ).catch(function(error){ next( error ); });
};

// GET /quizes
exports.index = function(req, res){

  var search = new String((req.query.search||''));
  search = search.replace(/ /g, '%'); // Reemplaza los espacios en blanco con &
  search = '%'+search+'%';

  models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function(quizes){
    res.render('quizes/index.ejs',{quizes:quizes, errors:[]});
  }).catch(function(error){next(error);});
};

// GET /quizes/question
exports.show = function(req,res){
  res.render('quizes/show',{quiz:req.quiz, errors:[]});
};

// GET /quizes/answer
exports.answer = function(req,res){
  var resultado = 'Incorrecto';
  if(req.query.respuesta === req.quiz.respuesta){
    resultado = 'Correcto';
  }
  res.render('quizes/answer',{
      quiz:req.quiz,
      respuesta:resultado,
      errors:[]
    });
};

exports.new = function(req, res){
  var quiz = models.Quiz.build(
    // Crea Objeto quiz
    {pregunta:"Pregunta", respuesta: "Respuesta"}
  );
  res.render('quizes/new', {quiz:quiz, errors:[]});
};

// POST /quizes/create
exports.create = function(req, res){
  var quiz = models.Quiz.build(req.body.quiz);

  quiz
  .validate()
  .then(
    function(err){
      if(err){
        res.render('quizes/new', {quiz:quiz,errors:err.errors});
      }else{
        // guardar en la DB los campos pregunta y respuesta de quiz
        quiz.save({feilds:["pregunta","respuesta"]}).then(function(){
          res.redirect('/quizes'); // Redireccion HTTP (URL relativo) lista de preguntas
        });
      }
    }
  );
};
