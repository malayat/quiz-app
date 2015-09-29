var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function (req, rex, next, quizId) {
    models.Quiz.find({
        where: {
            id: quizId
        },
        include: [{model: models.Comment}]
    }).then(function (quiz) {
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
    var searchTema = req.query.searchTema;

    if (!searchTema) {
        busqueda = busqueda.replace(/\s/g, '%');

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
    } else {
        models.Quiz.findAll({
                where: {
                    tema: req.query.searchTema
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
    }
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
        tema: {
            options: ["Geografía", "Humanidades", "Ocio", "Ciencia", "Tecnología"]
        }
    });
    res.render('quizes/new', {
        quiz: quiz,
        errors: []
    });
};

//POST /quizes/create
exports.create = function (req, res) {
    req.body.quiz.UserId = req.session.user.id;
    var quiz = models.Quiz.build(req.body.quiz);

    //Guarda en la DB los campos pregunta y respuesta de quiz
    quiz.validate().then(function (err) {
        if (err) {
            quiz = models.Quiz.build({
                pregunta: req.body.quiz.pregunta,
                respuesta: req.body.quiz.respuesta,
                tema: {
                    options: ["Geografía", "Humanidades", "Ocio", "Ciencia", "Tecnología"]
                }
            });
            res.render('quizes/new', {
                quiz: quiz,
                errors: err.errors
            });
        } else {
            quiz.
                save({
                    fields: ['pregunta', 'respuesta', 'tema', 'UserId']
                }).then(function () {
                    res.redirect('../quizes');
                })
        }
    });
};

//GET quizes/:id/edit
exports.edit = function (req, res) {

    var quiz = req.quiz;
    var options = ["Geografía", "Humanidades", "Ocio", "Ciencia", "Tecnología"];
    var index = options.indexOf(quiz.tema);
    options.splice(index, 1);

    res.render('quizes/edit', {
        quiz: quiz,
        options: options,
        errors: []
    });
};

//PUT /quizes/:id
exports.update = function (req, res) {

    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.tema = req.body.quiz.tema;

    req.quiz
        .validate().then(function (err) {
            if (err) {
                var options = ["Geografía", "Humanidades", "Ocio", "Ciencia", "Tecnología"];
                var index = options.indexOf(req.quiz.tema);
                options.splice(index, 1);

                res.render('quizes/edit', {
                    quiz: req.quiz,
                    options: options,
                    errors: err.errors
                });
            } else {
                req.quiz.
                    save({
                        fields: ['pregunta', 'respuesta', 'tema']
                    }).then(function () {
                        res.redirect('../quizes');
                    })
            }
        });
};

//DELETE /quizes/:id
exports.destroy = function (req, res) {
    req.quiz.destroy().then(function () {
        res.redirect('../quizes');
    }).catch(function (error) {
        next(error);
    })
};