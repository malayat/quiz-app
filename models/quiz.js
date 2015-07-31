/**
 * Definicion de la Tabla QUIZ.
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Quiz',
        {
            pregunta: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: '*Falta Pregunta'
                    }
                }
            },
            respuesta: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: '* Falta Respuesta'
                    }
                }
            },
            tema: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: '* Falta Tema'
                    }
                }
            }
        }
    );
};