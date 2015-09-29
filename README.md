# Quiz
### El portal donde podrás crear tus propios juegos!
Quiz es un juego, donde pones a prueba tus conocimientos, también puedes crear tus propias preguntas y dejar comentarios
para interactuar con otras personas.

Esta aplicación es fruto del curso MOOC de [MiriadaX](https://miriadax.net/home)

[Desarrollo de servicios en la nube con HTML5, Javascript y node.js](https://www.miriadax.net/web/javascript-node-js)

Puedes jugar **ahora** en línea, la aplicación está disponible **[AQUI](https://quizappl.herokuapp.com/)**

#### Tecnologías

Esta aplicación usa:

* [NodeJs](https://nodejs.org/en/)
* [ExpressJs](http://expressjs.com/)
* [EJS](http://www.embeddedjs.com/)
* [SQLite](https://www.sqlite.org/)
* [PostgreSQL](http://www.postgresql.org/)
* [Bootstrap](http://getbootstrap.com/)
* [Sequelize](http://docs.sequelizejs.com/en/latest/)
* [Heroku](https://www.heroku.com/)

#### Ejecutando QuizApp en tu máquina

1. Clonar el repositorio
2. Instalar las Dependencias `npm install`
3. Lanzar la aplicación con el comando `foreman start`
4. Disfrutar del juego en la siguiente dirección [https://localhost:8443/](https://localhost:8443/)

Se ha usado Heroku para desplegar la aplicación, por tal motivo se usa el comando _foreman_ para lanzar la aplicación.
Para poder debugear hay que agregar la siguiente línea al archivo _**Procfile**_

```
webDebug: node --debug-brk=5858 ./bin/www
```

Y lanzar la aplicación con el siguiente comando

```
foreman start webDebug
```

El debugger estará escuchando en el puerto **5858** y la aplicación en [http://localhost:5100](http://localhost:5100)
en lugar de [http://localhost:5000](http://localhost:5000)

Cualquier error que quieras reportar [https://github.com/malayat/quiz-app/issues](https://github.com/malayat/quiz-app/issues)

Cualquier duda en twitter: @a1ejo_ayala