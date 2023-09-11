const app = require('./app');
const database = require('./database');

const main = () => {
    database.connect((err) => {
        console.log('Base de datos conectada');
    });
    app.listen(app.get('port'), () => {
        console.log(`Servidor escuchando en el puerto ${app.get('port')}`);
    });
};

main();