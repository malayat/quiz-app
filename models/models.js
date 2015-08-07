/**
 * Construye la DB y el modelo importando quiz.js
 */

var path = require('path');

//Obtiene los diferentes parametros de coneccion de las dos bases de datos,
//postgres o sqlite mediante la expresion regular
// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

//Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
    {
        dialect: protocol,
        protocol: protocol,
        port: port,
        host: host,
        storage: storage,  // solo SQLite (.env)
        omitNull: true      // solo Postgres
    }
);

//Importar la definicion de la tabla Quiz
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//exportar la tabla Quiz
exports.Quiz = Quiz;
//exportar la tabla Comment
exports.Comment = Comment;

//sequelize.sync crea e inicializa tabla de pregntas en BD
sequelize.sync().then(function () {
    //then(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function (count) {
        if (count === 0) { // la tabla se inicializa solo si esta vacia
            Quiz.bulkCreate(
                [
                    {
                        pregunta: 'Capital de Ecuador',
                        respuesta: 'Quito',
                        tema: 'Geografía'
                    },
                    {
                        pregunta: 'Quién es el autor de la Teoría de la Evolución',
                        respuesta: 'Charles Darwin',
                        tema: 'Ciencia'
                    },
                    {
                        pregunta: 'Quién inventó NodeJS',
                        respuesta: 'Ryan Dahl',
                        tema: 'Tecnología'
                    },
                    {
                        pregunta: 'Quién ganó la copa del mundo Brasil 2014',
                        respuesta: 'Alemania',
                        tema: 'Ocio'
                    },
                    {
                        pregunta: 'Quién creó Linux',
                        respuesta: 'Linus Torvalds',
                        tema: 'Tecnología'
                    }
                ]
            ).then(function () {
                    console.log('Base de datos Inicializada');
                });
        }
    });
});