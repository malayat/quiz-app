/**
 * Definicion de la Tabla QUIZ.
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Quiz',
        {
            pregunta: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        msg: '*Falta Pregunta'
                    }
                }
            },
            respuesta: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        msg: '* Falta Respuesta'
                    }
                }
            },
            url_bandera: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        msg: '* Falta URL Bandera'
                    },
                    isUrl: {
                        msg: '* No es una URL Válida'
                    }
                }
            }
        }
    );
}