/**
 * Definicion de la Tabla COMMENT.
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Comment',
        {
            texto: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: '*Falta Comentario'
                    }
                }
            },
            publicado: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }
    );
};