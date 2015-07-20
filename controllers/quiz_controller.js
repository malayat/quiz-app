var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function (req, rex, next, quizId) {
    models.Quiz.findById(quizId).then(function (quiz) {
        if (quiz) {
            req.quiz = quiz;
            next();
        } else {
            next(new Error("No existe quizId = " + quizId));
        }
    }).catch(function (error) {
        next(error);
    });
};

//GET /quizes
exports.index = function (req, res) {

    var busqueda = (req.query.search || '');
    busqueda = busqueda.replace(/\s/g, '%');

    //usando la ultima version de sequelize la busqueda like
    //cambia a lo indicado en el curso
    models.Quiz.findAll({
            where: {
                pregunta: {
                    $like: '%' + busqueda + '%'
                }
            }
        }
    ).then(function (quizes) {
            res.render("quizes/index", {quizes: quizes});
        }).catch(function (error) {
            next(error);
        });

};

// GET /quizes/:id
exports.question = function (req, res) {
    res.render('quizes/question', {quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function (req, res) {
    var resultado = "Incorrecto";

    if (req.query.respuesta === req.quiz.respuesta) {
        resultado = "Correcto"
    }

    res.render('quizes/answer',
        {
            quiz: req.quiz,
            respuesta: resultado
        });
};
