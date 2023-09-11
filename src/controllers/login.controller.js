const database = require('../config/database');
const mysql2 = require('mysql2');
let result = []; // Variable para almacenar los resultados de las consultas

const executeQuery = (query, params, successMessage, errorMessage, res) => {
  const aux = mysql2.format(query, params);
  database.query(aux, (err, result) => {
    if (err) {
      //console.log("Entro en el ERR");
      res.status(500).json({ message: errorMessage });
      return;
    } else{
    res.send({ message: successMessage });
    }
  });
};

  const verificarCredenciales = (req, res) => {
    const { ID_ESTUDIANTE, CONTRASEÑA } = req.body;
    
    const readQuery = `SELECT * FROM ESTUDIANTE WHERE ID_ESTUDIANTE=?;`;
    const query = mysql2.format(readQuery, [ID_ESTUDIANTE]);

    database.query(query, (err, results) => {
        if (err) {
            //console.error('Error al consultar la base de datos:', err);
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
      
          // Verificar si se encontraron resultados
          if (results.length === 0) {
            // El usuario no existe
            return res.json({ userExists: false });
          } else {
            // El usuario existe, aquí puedes validar la contraseña
            const user = results[0];
            const isValidPassword = user.CONTRASEÑA === CONTRASEÑA;
            return res.json({ userExists: true, isValidPassword: isValidPassword });
        }
    });
};

const executeQueryGet = (query, params, errorMessage, res) => {
  const aux = mysql2.format(query, params);
  database.query(aux, (err, queryResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Almacenar el resultado en result[0]
    result[0] = queryResult[0];
    //console.log("el result 0 es:" + result[0]);
    if (queryResult[0] !== undefined) {
      res.json(queryResult[0]);
    } else {
      //console.log("Entro en el ERR");
      res.status(404).json({ message: errorMessage });
    }
  });
};

const updateFechaUltimaConexion = (req, res) => {
  const {ID_FECHA_VIAJES, FECHA_ULTIMA_CONEXION} = req.params;

  const updateQuery = `UPDATE FECHA_VIAJES SET FECHA_ULTIMA_CONEXION=? WHERE ID_FECHA_VIAJES=?;`;
  const params = [FECHA_ULTIMA_CONEXION, ID_FECHA_VIAJES];

  executeQuery( updateQuery, params, 'Fecha ultima conexion actualizada', 'Fecha ultima conexion no actualizado', res);

};

const readFechaUltimaConexion = (req, res) => {
  const { ID_FECHA_VIAJES } = req.params;

  const readQuery = `SELECT * FROM FECHA_VIAJES WHERE ID_FECHA_VIAJES=?;`;
  const params = [ID_FECHA_VIAJES];

  executeQueryGet(readQuery, params, 'Fecha ultima conexion no encontrado', res);
};
  
  module.exports = {
    verificarCredenciales, updateFechaUltimaConexion, readFechaUltimaConexion
  };