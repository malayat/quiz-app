var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var creditosController = require('../controllers/creditos_controller');
var commentController = require('../controllers/comment_controller');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        title: 'Quiz',
        options: ["Geografía", "Humanidades", "Ocio", "Ciencia", "Tecnología"],
        errors: []
    });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);

//Definicion de las rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.question);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

//Definicion de los creditos
router.get('/author', creditosController.creditos);

module.exports = router;
