var models = require('../models/models.js');
var Quiz = models.Quiz;
var Comment = models.Comment;
var Sequelize = require('sequelize');

//GET /quizes/statistics
exports.statistics = function (req, res) {

    var data = {};

    Sequelize.Promise.all([
        Quiz.count(),
        Comment.count(),
        Quiz.count({
            distinct: true,
            include: [
                {
                    model: Comment,
                    required: true
                }
            ]
        }),
        Comment.count({
            where: {
                publicado: false
            }
        })
    ]).then(function (count) {
        data.quizCount = count[0];
        data.commentCount = count[1];
        data.quizCommented = count[2];
        data.quizUncommented = count[0] - count[2];
        data.unpublishedComment = count[3];

        res.render('quizes/statistics', {
            statistics: data,
            errors: []
        });
    }).catch(function (error) {
        next(error);
    });
};
