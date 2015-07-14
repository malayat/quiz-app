var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var creditosController = require('../controllers/creditos_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

//Definicion de las rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.question);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

//Definicion de los creditos
router.get('/author', creditosController.creditos);

module.exports = router;
