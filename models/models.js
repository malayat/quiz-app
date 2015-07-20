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

//exportar la tabla Quiz
exports.Quiz = Quiz;

//sequelize.sync crea e inicializa tabla de pregntas en BD
sequelize.sync().then(function () {
    //then(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function (count) {
        if (count === 0) { // la tabla se inicializa solo si esta vacia
            Quiz.bulkCreate(
                [
                    {
                        pregunta: 'Capital de Italia',
                        respuesta: 'Roma',
                        url_bandera: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/20px-Flag_of_Italy.svg.png'
                    },
                    {
                        pregunta: 'Capital de Portugal',
                        respuesta: 'Lisboa',
                        url_bandera: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/20px-Flag_of_Portugal.svg.png'
                    },
                    {
                        pregunta: 'Capital de Ecuador',
                        respuesta: 'Quito',
                        url_bandera: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/20px-Flag_of_Ecuador.svg.png'
                    },
                    {
                        pregunta: 'Capital de Yibuti',
                        respuesta: 'Yibuti',
                        url_bandera: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_Djibouti.svg/20px-Flag_of_Djibouti.svg.png'
                    },
                    {
                        pregunta: 'Capital de Baréin',
                        respuesta: 'Manama',
                        url_bandera: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/20px-Flag_of_Bahrain.svg.png'
                    }
                ]
            ).then(function () {
                    console.log('Base de datos Inicializada');
                });
        }
    });
});