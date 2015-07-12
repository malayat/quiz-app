/**
 * Construye la DB y el modelo importando quiz.js
 */

var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar base de datos sqlite3
var sequelize = new Sequelize(null, null, null,
    {
        dialect: "sqlite",
        storage: "quiz.sqlite"
    }
);

//Importar la definicion de la tabla Quiz
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

//exportar la tabla Quiz
exports.Quiz = Quiz;

//sequelize.sync crea e inicializa tabla de pregntas en BD
sequelize.sync().then(function () {
    //then(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function (count) {
        if (count === 0) { // la tabla se inicializa solo si esta vacia
            Quiz.create(
                {
                    pregunta: 'Capital de Italia',
                    respuesta: 'Roma'
                }
            ).then(function () {
                    console.log('Base de datos Inicializada');
                });
        }
    });
});