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

//Importar la definicion de la tabla Comment
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

//Importar la definicion de la tabla User
var user_path = path.join(__dirname, 'user');
var User = sequelize.import(user_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// los quizes pertenecen a un usuario registrado
Quiz.belongsTo(User);
User.hasMany(Quiz);

//exportar la tabla Quiz
exports.Quiz = Quiz;
//exportar la tabla Comment
exports.Comment = Comment;
//exportar la tabla User
exports.User = User;

//sequelize.sync crea e inicializa tabla de pregntas en BD
sequelize.sync().then(function () {
    //then(..) ejecuta el manejador una vez creada la tabla
    User.count().then(function (count) {
        if (count === 0) {
            User.bulkCreate(
                [
                    {username: 'admin', password: '1234', isAdmin: true},
                    {username: 'pepe', password: '5678'} // el valor por defecto de isAdmin es 'false'
                ]
            ).then(function () {
                    console.log('Base de datos (USER) Inicializada');

                    Quiz.count().then(function (count) {
                        if (count === 0) { // la tabla se inicializa solo si esta vacia
                            Quiz.bulkCreate(
                                [
                                    {
                                        pregunta: 'Capital de Ecuador',
                                        respuesta: 'Quito',
                                        tema: 'Geografía',
                                        UserId: 1
                                    },
                                    {
                                        pregunta: 'Quién es el autor de la Teoría de la Evolución',
                                        respuesta: 'Charles Darwin',
                                        tema: 'Ciencia',
                                        UserId: 1
                                    },
                                    {
                                        pregunta: 'Quién inventó NodeJS',
                                        respuesta: 'Ryan Dahl',
                                        tema: 'Tecnología',
                                        UserId: 1
                                    },
                                    {
                                        pregunta: 'Quién ganó la copa del mundo Brasil 2014',
                                        respuesta: 'Alemania',
                                        tema: 'Ocio',
                                        UserId: 1
                                    },
                                    {
                                        pregunta: 'Quién creó Linux',
                                        respuesta: 'Linus Torvalds',
                                        tema: 'Tecnología',
                                        UserId: 1
                                    }
                                ]
                            ).then(function () {
                                    console.log('Base de datos (QUIZ) Inicializada');
                                });
                        }
                    });
                });
        }
    });
});