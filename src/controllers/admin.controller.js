const database = require('../config/database');
const mysql2 = require('mysql2');

// Función genérica para ejecutar consultas en la base de datos
let result = []; // Variable para almacenar los resultados de las consultas

//Get no necesita successMessage por que imprimimos los valores del get
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

/***************************************** CREATE -> POST *****************************************/
const createUser = (req, res) => {
  const { first_name, age } = req.body;

  const createQuery = `INSERT INTO Usuario(first_name, age) VALUES (?, ?);`;
  const params = [first_name, age];

  executeQuery(createQuery, params, 'Usuario creado', 'No se pudo crear el usuario', res);
};

const createEstudiante = (req, res) => {
  const { ID_ESTUDIANTE, NOMBRE, EMAIL, CONTRASEÑA, TELEFONO, ASIENTO_DEFECTO } = req.body;

  const createQuery = `INSERT INTO ESTUDIANTE(ID_ESTUDIANTE, NOMBRE, EMAIL, CONTRASEÑA, TELEFONO, ASIENTO_DEFECTO) VALUES (?, ?, ?, ?, ?, ?);`;
  const params = [ID_ESTUDIANTE, NOMBRE, EMAIL, CONTRASEÑA, TELEFONO, ASIENTO_DEFECTO];

  executeQuery(createQuery, params, 'Estudiante creado', 'No se pudo crear el estudiante', res);
};

const createReserva = (req, res) => {
  const { ID_ESTUDIANTE, ID_LINEA, HORA, TIPO_ASIENTO, FECHA } = req.body;

  const createQuery = `INSERT INTO RESERVA( ID_ESTUDIANTE, ID_LINEA, HORA, TIPO_ASIENTO, FECHA) VALUES ( ?, ?, ?, ?, ?);`;
  const params = [ ID_ESTUDIANTE, ID_LINEA, HORA, TIPO_ASIENTO, FECHA ];

  executeQuery(createQuery, params, 'Reserva creada', 'No se pudo crear la reserva', res);
};

const createReservaHistorico = (req, res) => {
  const { ID_RESERVA, ID_ESTUDIANTE, ID_LINEA, HORA, TIPO_ASIENTO, FECHA } = req.body;

  const createQuery = `INSERT INTO HISTORICO_RESERVAS( ID_RESERVA, ID_ESTUDIANTE, ID_LINEA, HORA, TIPO_ASIENTO, FECHA) VALUES ( ?, ?, ?, ?, ?, ?);`;
  const params = [ ID_RESERVA, ID_ESTUDIANTE, ID_LINEA, HORA, TIPO_ASIENTO, FECHA ];

  executeQuery(createQuery, params, 'Historico Reserva creada', 'No se pudo crear la reserva historica', res);
};

const createLinea = (req, res) => {
  const { ID_LINEA, ORIGEN, DESTINO, FRECUENCIA, HORA_INICIO, HORA_FIN} = req.body;

  const createQuery = `INSERT INTO LINEA(ID_LINEA, ORIGEN, DESTINO, FRECUENCIA, HORA_INICIO, HORA_FIN) VALUES (?, ?, ?, ?, ?, ?);`;
  const params = [ID_LINEA, ORIGEN, DESTINO, FRECUENCIA, HORA_INICIO, HORA_FIN];

  executeQuery(createQuery, params, 'Linea creada', 'No se pudo crear la linea', res);
};

const createAutobus = (req, res) => {
  const { ID_AUTOBUS, ID_LINEA, ID_CONDUCTOR, TIPO_MOTOR, N_ASIENTOS, N_ASIENTOS_ESPECIALES, N_ASIENTOS_SR} = req.body;

  const createQuery = `INSERT INTO AUTOBUS(ID_AUTOBUS, ID_LINEA, ID_CONDUCTOR, TIPO_MOTOR, N_ASIENTOS, N_ASIENTOS_ESPECIALES, N_ASIENTOS_SR) VALUES (?, ?, ?, ?, ?, ?, ?);`;
  const params = [ID_AUTOBUS, ID_LINEA, ID_CONDUCTOR, TIPO_MOTOR, N_ASIENTOS, N_ASIENTOS_ESPECIALES, N_ASIENTOS_SR];

  executeQuery(createQuery, params, 'Autobus creado', 'No se pudo crear el autobus', res);
};

const createConductor = (req, res) => {
  const { ID_CONDUCTOR, NOMBRE} = req.body;

  const createQuery = `INSERT INTO CONDUCTOR(ID_CONDUCTOR, NOMBRE) VALUES (?, ?);`;
  const params = [ID_CONDUCTOR, NOMBRE];

  executeQuery(createQuery, params, 'Conductor creado', 'No se pudo crear el conductor', res);
};

const createRutina = (req, res) => {
  const { ID_LINEA, HORA_SALIDA, ID_AUTOBUS } = req.body;

  const createQuery = `INSERT INTO RUTINAS( ID_LINEA, HORA_SALIDA, ID_AUTOBUS) VALUES ( ?, ?, ? );`;
  const params = [ ID_LINEA, HORA_SALIDA, ID_AUTOBUS ];

  executeQuery(createQuery, params, 'Rutina creada', 'No se pudo crear la rutina', res);
};

const createViaje = (req, res) => {
  const { FECHA, HORA_SALIDA, ID_LINEA, N_ASIENTOS, N_ASIENTOS_ESPECIALES, N_ASIENTOS_SR } = req.body;

  const createQuery = `INSERT INTO VIAJES( FECHA, HORA_SALIDA, ID_LINEA, N_ASIENTOS, N_ASIENTOS_ESPECIALES, N_ASIENTOS_SR) VALUES ( ?, ?, ?, ?, ?, ? );`;
  const params = [ FECHA, HORA_SALIDA, ID_LINEA, N_ASIENTOS, N_ASIENTOS_ESPECIALES, N_ASIENTOS_SR ];

  executeQuery(createQuery, params, 'Viaje creada', 'No se pudo crear el viaje', res);
};

/***************************************** READ -> GET *****************************************/
const readUser = (req, res) => {
  const { id } = req.params;

  const readQuery = `SELECT * FROM Usuario WHERE id=?;`;
  const params = [id];

  executeQueryGet(readQuery, params, 'Usuario no encontrado', res);
};

const readEstudiante = (req, res) => {
  const { ID_ESTUDIANTE } = req.params;

  const readQuery = `SELECT * FROM ESTUDIANTE WHERE ID_ESTUDIANTE=?;`;
  const params = [ID_ESTUDIANTE];
  
  executeQueryGet( readQuery, params, 'Estudiante nIDEcoña encontrado', res);
};

const readReserva = (req, res) => {
  const { ID_RESERVA } = req.params;

  const readQuery = `SELECT * FROM RESERVA WHERE ID_RESERVA=?;`;
  const params = [ID_RESERVA];

  executeQueryGet( readQuery, params, 'Reserva no encontrada', res);
};
const readReservaHistorico = (req, res) => {
  const { ID_RESERVA } = req.params;

  const readQuery = `SELECT * FROM HISTORICO_RESERVAS WHERE ID_RESERVA=?;`;
  const params = [ID_RESERVA];

  executeQueryGet( readQuery, params, 'Historico Reserva no encontrada', res);
};

const readLinea = (req, res) => {
  const { ID_LINEA } = req.params;

  const readQuery = `SELECT * FROM LINEA WHERE ID_LINEA=?;`;
  const params = [ID_LINEA];

  executeQueryGet( readQuery, params, 'Linea no encontrada', res);
};

const readAutobus = (req, res) => {
  const { ID_AUTOBUS } = req.params;

  const readQuery = `SELECT * FROM AUTOBUS WHERE ID_AUTOBUS=?;`;
  const params = [ID_AUTOBUS];

  executeQueryGet( readQuery, params, 'Autobus no encontrado', res);
};

const readConductor = (req, res) => {
  const { ID_CONDUCTOR } = req.params;

  const readQuery = `SELECT * FROM CONDUCTOR WHERE ID_CONDUCTOR=?;`;
  const params = [ID_CONDUCTOR];

  executeQueryGet( readQuery, params, 'Conductor no encontrado', res);
};

const readRutina = (req, res) => {
  const { ID_RUTINA } = req.params;

  const readQuery = `SELECT * FROM RUTINAS WHERE ID_RUTINA=?;`;
  const params = [ID_RUTINA];

  executeQueryGet( readQuery, params, 'Rutina no encontrada', res);
};

const readViaje = (req, res) => {
  const { ID_VIAJE } = req.params;

  const readQuery = `SELECT * FROM VIAJES WHERE ID_VIAJE=?;`;
  const params = [ID_VIAJE];

  executeQueryGet( readQuery, params, 'Viaje no encontrada', res);
};
/***************************************** UPDATE -> PUT *****************************************/
const updateUser = (req, res) => {
    const {id} = req.params;
    const {first_name, age} = req.body;

    const updateQuery = `UPDATE Usuario SET first_name=?, age=? WHERE id=?;`;
    const params = [first_name, age, id];

    executeQuery( updateQuery, params, 'Usuario actualizado', 'Usuario no actualizado', res);

};

const updateEstudiante = (req, res) => {
  const {ID_ESTUDIANTE} = req.params;
  const { NOMBRE, EMAIL, CONTRASEÑA, TELEFONO, ASIENTO_DEFECTO } = req.body;

  const updateQuery = `UPDATE ESTUDIANTE SET NOMBRE=?, EMAIL=?, CONTRASEÑA=?, TELEFONO=?, ASIENTO_DEFECTO=? WHERE ID_ESTUDIANTE=?;`;
  const params = [NOMBRE, EMAIL, CONTRASEÑA, TELEFONO, ASIENTO_DEFECTO, ID_ESTUDIANTE];

  executeQuery(updateQuery, params, 'Estudiante actualizado', 'Estudiante no actualizado', res);
};

const updateReserva = (req, res) => {
  const {ID_RESERVA} = req.params;
  const { ID_ESTUDIANTE, ID_LINEA, HORA, TIPO_ASIENTO, FECHA } = req.body;

  const updateQuery = `UPDATE RESERVA SET ID_ESTUDIANTE=?, ID_LINEA=?, HORA=?, TIPO_ASIENTO=?, FECHA=? WHERE ID_RESERVA=?;`;
  const params = [ID_ESTUDIANTE, ID_LINEA, HORA, TIPO_ASIENTO, FECHA, ID_RESERVA];

  executeQuery(updateQuery, params, 'Reserva actualizada', 'Reserva no actualizada', res);
};

const updateReservaHistorico = (req, res) => {
  const {ID_RESERVA} = req.params;
  const { ID_ESTUDIANTE, ID_LINEA, HORA, TIPO_ASIENTO, FECHA } = req.body;

  const updateQuery = `UPDATE HISTORICO_RESERVAS SET ID_ESTUDIANTE=?, ID_LINEA=?, HORA=?, TIPO_ASIENTO=?, FECHA=? WHERE ID_RESERVA=?;`;
  const params = [ID_ESTUDIANTE, ID_LINEA, HORA, TIPO_ASIENTO, FECHA, ID_RESERVA];

  executeQuery(updateQuery, params, 'Historico Reserva actualizada', 'Historico Reserva no actualizada', res);
};

const updateLinea = (req, res) => {
  const {ID_LINEA} = req.params;
  const { ORIGEN, DESTINO, FRECUENCIA, HORA_INICIO, HORA_FIN} = req.body;

  let updateQuery = `UPDATE LINEA SET `;
  const params = [];

  if (ORIGEN) {
    updateQuery += `ORIGEN=?, `;
    params.push(ORIGEN);
  }

  if (DESTINO) {
    updateQuery += `DESTINO=?, `;
    params.push(DESTINO);
  }

  if (FRECUENCIA) {
    updateQuery += `FRECUENCIA=?, `;
    params.push(FRECUENCIA);
  }

  if (HORA_INICIO) {
    updateQuery += `HORA_INICIO=?, `;
    params.push(HORA_INICIO);
  }

  if (HORA_FIN) {
    updateQuery += `HORA_FIN=?, `;
    params.push(HORA_FIN);
  }

  // Eliminar la coma final y agregar la cláusula WHERE
  updateQuery = updateQuery.slice(0, -2) + ` WHERE ID_LINEA=?;`;
  params.push(ID_LINEA);

  executeQuery(updateQuery, params, 'Linea actualizada', 'Linea no actualizada', res);
};

const updateAutobus = (req, res) => {
  const {ID_AUTOBUS} = req.params;
  const { ID_LINEA, ID_CONDUCTOR, TIPO_MOTOR, N_ASIENTOS, N_ASIENTOS_ESPECIALES, N_ASIENTOS_SR} = req.body;
  
  let updateQuery = `UPDATE AUTOBUS SET `;
  const params = [];

  if (ID_LINEA) {
    updateQuery += `ID_LINEA=?, `;
    params.push(ID_LINEA);
  }

  if (ID_CONDUCTOR) {
    updateQuery += `ID_CONDUCTOR=?, `;
    params.push(ID_CONDUCTOR);
  }

  if (TIPO_MOTOR) {
    updateQuery += `TIPO_MOTOR=?, `;
    params.push(TIPO_MOTOR);
  }

  if (N_ASIENTOS) {
    updateQuery += `N_ASIENTOS=?, `;
    params.push(N_ASIENTOS);
  }

  if (N_ASIENTOS_ESPECIALES) {
    updateQuery += `N_ASIENTOS_ESPECIALES=?, `;
    params.push(N_ASIENTOS_ESPECIALES);
  }

  if (N_ASIENTOS_SR) {
    updateQuery += `N_ASIENTOS_SR=?, `;
    params.push(N_ASIENTOS_SR);
  }

  // Eliminar la coma final y agregar la cláusula WHERE
  updateQuery = updateQuery.slice(0, -2) + ` WHERE ID_AUTOBUS=?;`;
  params.push(ID_AUTOBUS);

  executeQuery(updateQuery, params, 'Autobus actualizado', 'Autobus no actualizado', res);
};

const updateConductor = (req, res) => {
  const {ID_CONDUCTOR} = req.params;
  const { NOMBRE} = req.body;

  const updateQuery = `UPDATE CONDUCTOR SET NOMBRE =? WHERE ID_CONDUCTOR=?;`;
  const params = [NOMBRE, ID_CONDUCTOR];

  executeQuery(updateQuery, params, 'Conductor actualizado', 'Conductor no actualizado', res);
};

const updateRutina = (req, res) => {
  const {ID_RUTINA} = req.params;
  const { ID_LINEA, HORA_SALIDA, ID_AUTOBUS } = req.body;

  const updateQuery = `UPDATE RUTINAS SET ID_LINEA=?, HORA_SALIDA=?, ID_AUTOBUS=? WHERE ID_RUTINA=?;`;
  const params = [ ID_LINEA, HORA_SALIDA, ID_AUTOBUS, ID_RUTINA ];

  executeQuery(updateQuery, params, 'Rutina actualizada', 'Rutina no actualizada', res);
};
/***************************************** DELETE -> DELETE *****************************************/
const deleteUser = (req, res) => {
    const { id } = req.params;
    
    const deleteQuery = `DELETE FROM Usuario WHERE id=?;`;
    const params = [id];
    
    executeQuery(deleteQuery, params, 'Usuario eliminado', 'Usuario no eliminado', res);
};

const deleteEstudiante = (req, res) => {
  const { ID_ESTUDIANTE } = req.params;

  const deleteQuery = `DELETE FROM ESTUDIANTE WHERE ID_ESTUDIANTE=?;`;
  const params = [ID_ESTUDIANTE];

  executeQuery(deleteQuery, params, 'Estudiante eliminado', 'Estudiante no eliminado', res);
};

const deleteReserva = (req, res) => {
  const { ID_RESERVA } = req.params;

  const deleteQuery = `DELETE FROM RESERVA WHERE ID_RESERVA=?;`;
  const params = [ID_RESERVA];

  executeQuery(deleteQuery, params, 'Reserva eliminada', 'Reserva no eliminada', res);
};
const deleteReservaHistorico = (req, res) => {
  const { ID_RESERVA } = req.params;

  const deleteQuery = `DELETE FROM HISTORICO_RESERVAS WHERE ID_RESERVA=?;`;
  const params = [ID_RESERVA];

  executeQuery(deleteQuery, params, 'Historico Reserva eliminada', 'Historico Reserva no eliminada', res);
};

const deleteLinea = (req, res) => {
  const { ID_LINEA } = req.params;

  const deleteQuery = `DELETE FROM LINEA WHERE ID_LINEA=?;`;
  const params = [ID_LINEA];

  executeQuery(deleteQuery, params, 'Linea eliminada', 'Linea no eliminada', res);
};

const deleteAutobus = (req, res) => {
  const { ID_AUTOBUS } = req.params;

  const deleteQuery = `DELETE FROM AUTOBUS WHERE ID_AUTOBUS=?;`;
  const params = [ID_AUTOBUS];

  executeQuery(deleteQuery, params, 'Autobus eliminado', 'Autobus no eliminado', res);
};

const deleteConductor = (req, res) => {
  const { ID_CONDUCTOR } = req.params;

  const deleteQuery = `DELETE FROM CONDUCTOR WHERE ID_CONDUCTOR=?;`;
  const params = [ID_CONDUCTOR];

  executeQuery(deleteQuery, params, 'Conductor eliminado', 'Conductor no eliminado', res);
};

const deleteRutina = (req, res) => {
  const { ID_RUTINA } = req.params;

  const deleteQuery = `DELETE FROM RUTINAS WHERE ID_RUTINA=?;`;
  const params = [ID_RUTINA];

  executeQuery(deleteQuery, params, 'Rutina eliminada', 'Rutina no eliminada', res);
};

module.exports = {
    createUser, createEstudiante, createReserva, createReservaHistorico, createLinea, createAutobus, createConductor,createRutina, createViaje,
    readUser, readEstudiante, readReserva, readReservaHistorico, readLinea, readAutobus, readConductor, readRutina, readViaje,
    updateUser, updateEstudiante, updateReserva, updateReservaHistorico, updateLinea, updateAutobus,updateConductor, updateRutina,
    deleteUser, deleteEstudiante, deleteReserva, deleteReservaHistorico, deleteLinea, deleteAutobus, deleteConductor, deleteRutina
};
