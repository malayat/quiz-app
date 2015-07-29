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
            res.render("quizes/index", {
                quizes: quizes,
                errors: []
            });
        }).catch(function (error) {
            next(error);
        });

};

// GET /quizes/:id
exports.question = function (req, res) {
    res.render('quizes/question', {
        quiz: req.quiz,
        errors: []
    });
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
            respuesta: resultado,
            errors: []
        });
};

//GET /quizes/new
exports.new = function (req, res) {
    var quiz = models.Quiz.build({
        pregunta: "Pregunta",
        respuesta: "Respuesta",
        url_bandera: "URL Bandera"
    });
    res.render('quizes/new', {
        quiz: quiz,
        errors: []
    });
};

//POST /quizes/create
exports.create = function (req, res) {
    var quiz = models.Quiz.build(req.body.quiz);

    //Guarda en la DB los campos pregunta y respuesta de quiz
    quiz
        .validate().then(function (err) {
            if (err) {
                res.render('quizes/new', {
                    quiz: quiz,
                    errors: err.errors
                });
            } else {
                quiz.
                    save({
                        fields: ['pregunta', 'respuesta', 'url_bandera']
                    }).then(function () {
                        res.redirect('../quizes');
                    })
            }
        });
};

//GET quizes/:id/edit
exports.edit = function(req, res) {
    var quiz = req.quiz;
    res.render('quizes/edit', {
        quiz: quiz,
        errors: []
    });

};

//PUT /quizes/:id
exports.update = function(req, res) {

    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.url_bandera = req.body.quiz.url_bandera;

    req.quiz
        .validate().then(function (err) {
            if (err) {
                res.render('quizes/edit', {
                    quiz: req.quiz,
                    errors: err.errors
                });
            } else {
                req.quiz.
                    save({
                        fields: ['pregunta', 'respuesta', 'url_bandera']
                    }).then(function () {
                        res.redirect('../quizes');
                    })
            }
        });
};