const database = require('../config/database');
const mysql2 = require('mysql2');

// Función genérica para ejecutar consultas en la base de datos
let result = []; // Variable para almacenar los resultados de las consultas

const executeQueryGetReservas = (query, params, errorMessage, res) => {
    const aux = mysql2.format(query, params);
    database.query(aux, (err, queryResult) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (queryResult.length > 0) {
        res.json(queryResult);
      } else {
        res.status(404).json({ message: errorMessage });
      }
    });
  };

  const executeQueryGetListas = (query, errorMessage, res) => {
    database.query(query, (err, queryResult) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (queryResult.length > 0) {
        res.json(queryResult);
        //console.log("Se encontraron lineas");
      } else {
        //console.log("No se encontraron lineas");
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

/***************************************** READ - GET *****************************************/

const readReservasIdentificado = (req, res) => {
  const {ID_ESTUDIANTE} = req.params;

  const readQuery = `SELECT * FROM RESERVA WHERE ID_ESTUDIANTE=?;`;
  const params = [ID_ESTUDIANTE];

  executeQueryGetReservas( readQuery, params, 'Reserva no encontrada', res);
};

const readHistoricoReservasIdentificado = (req, res) => {
  const {ID_ESTUDIANTE} = req.params;

  const readQuery = `SELECT * FROM HISTORICO_RESERVAS WHERE ID_ESTUDIANTE=?;`;
  const params = [ID_ESTUDIANTE];

  executeQueryGetReservas( readQuery, params, 'Historico Reservas no encontradas', res);
};

const readReservaMismoDiayHora = (req, res) => {
  const {HORA, FECHA,ID_ESTUDIANTE} = req.params;
  //const{HORA, FECHA} = req.body;

  const readQuery = `SELECT * FROM RESERVA WHERE HORA=? AND FECHA=? AND ID_ESTUDIANTE=?;`;
  const params = [HORA, FECHA, ID_ESTUDIANTE];

  executeQueryGetReservas( readQuery, params, 'Reserva no encontrada', res);
};

const readViajeFechaHoraLinea = (req, res) => {
  const {FECHA, HORA_SALIDA, ID_LINEA} = req.params;

  const readQuery = `SELECT * FROM VIAJES WHERE FECHA=? AND HORA_SALIDA=? AND ID_LINEA=?;`;
  const params = [FECHA, HORA_SALIDA, ID_LINEA];

  executeQueryGetReservas( readQuery, params, 'Viaje no encontrada', res);
};

const readViajeExistente = (req, res) => {
  const {FECHA} = req.params;

  const readQuery = `SELECT * FROM VIAJES WHERE FECHA=?;`;
  const params = [FECHA];

  executeQueryGetReservas( readQuery, params, 'Viaje no encontrada', res);
};
/***************************************** UPDATE - PUT *****************************************/

const updateEstudianteIdentificado = (req, res) => {
  const { ID_ESTUDIANTE } = req.params;
  const { NOMBRE, EMAIL, CONTRASEÑA, TELEFONO, ASIENTO_DEFECTO } = req.body;

  let updateQuery = `UPDATE ESTUDIANTE SET `;
  const params = [];

  if (NOMBRE) {
    updateQuery += `NOMBRE=?, `;
    params.push(NOMBRE);
  }

  if (EMAIL) {
    updateQuery += `EMAIL=?, `;
    params.push(EMAIL);
  }

  if (CONTRASEÑA) {
    updateQuery += `CONTRASEÑA=?, `;
    params.push(CONTRASEÑA);
  }

  if (TELEFONO) {
    updateQuery += `TELEFONO=?, `;
    params.push(TELEFONO);
  }

  if (ASIENTO_DEFECTO) {
    updateQuery += `ASIENTO_DEFECTO=?, `;
    params.push(ASIENTO_DEFECTO);
  }

  // Eliminar la coma final y agregar la cláusula WHERE
  updateQuery = updateQuery.slice(0, -2) + ` WHERE ID_ESTUDIANTE=?;`;
  params.push(ID_ESTUDIANTE);

  executeQuery(updateQuery, params, 'Estudiante actualizado', 'Estudiante no actualizado', res);
};

const updateReservaIdentificado = (req, res) => {
  const { ID_ESTUDIANTE } = req.params;
  const { ID_RESERVA ,ID_LINEA, HORA, TIPO_ASIENTO, FECHA } = req.body;

  let updateQuery = `UPDATE RESERVA SET `;
  const params = [];

  if (ID_LINEA) {
    updateQuery += `ID_LINEA=?, `;
    params.push(ID_LINEA);
  }

  if (HORA) {
    updateQuery += `HORA=?, `;
    params.push(HORA);
  }

  if (TIPO_ASIENTO) {
    updateQuery += `TIPO_ASIENTO=?, `;
    params.push(TIPO_ASIENTO);
  }

  if (FECHA) {
    updateQuery += `FECHA=?, `;
    params.push(FECHA);
  }

  // Eliminar la coma final y agregar la cláusula WHERE
  updateQuery = updateQuery.slice(0, -2) + ` WHERE ID_RESERVA=? AND ID_ESTUDIANTE=?;`;
  params.push(ID_RESERVA, ID_ESTUDIANTE);

  executeQuery(updateQuery, params, 'Reserva actualizada', 'Reserva no actualizada', res);
};

const updateAsientosViajeNormal = (req, res) => {
  const {ID_VIAJE, N_ASIENTOS} = req.params;
//console.log("aqui llego?");
  const updateQuery = `UPDATE VIAJES SET N_ASIENTOS=? WHERE ID_VIAJE=?;`;
  const params = [ N_ASIENTOS, ID_VIAJE];

  executeQuery(updateQuery, params, 'Asiento Normal viaje actualizado', 'Asiento Normal viaje no actualizado', res);
};

const updateAsientosViajeEspecial = (req, res) => {
  const {ID_VIAJE, N_ASIENTOS_ESPECIALES} = req.params;

  const updateQuery = `UPDATE VIAJES SET N_ASIENTOS_ESPECIALES=? WHERE ID_VIAJE=?;`;
  const params = [ N_ASIENTOS_ESPECIALES, ID_VIAJE];

  executeQuery(updateQuery, params, 'Asiento Especial viaje actualizado', 'Asiento Especial viaje no actualizado', res);
};

const updateAsientosViajeSR = (req, res) => {
  const {ID_VIAJE, N_ASIENTOS_SR} = req.params;

  const updateQuery = `UPDATE VIAJES SET N_ASIENTOS_SR=? WHERE ID_VIAJE=?;`;
  const params = [ N_ASIENTOS_SR, ID_VIAJE];

  executeQuery(updateQuery, params, 'Asiento SR viaje actualizado', 'Asiento SR viaje no actualizado', res);
};

/***************************************** DELETE - DELETE *****************************************/
const deleteReservaIdentificado = (req, res) => {
  const { ID_ESTUDIANTE } = req.params;
  const { ID_RESERVA } = req.body;


  const deleteQuery = `DELETE FROM RESERVA WHERE ID_ESTUDIANTE=? AND ID_RESERVA=?;`;
  const params = [ID_ESTUDIANTE, ID_RESERVA];
//console.log("LLEGO AQUI ----- 1: estudiante: "+ ID_ESTUDIANTE +" reserva: "+ ID_RESERVA);
  executeQuery(deleteQuery, params, 'Reserva eliminada', 'Reserva no eliminada', res);
};

const deleteViajes = (req, res) => {
  const { FECHA } = req.params;

  const deleteQuery = `DELETE FROM VIAJES WHERE FECHA=?;`;
  const params = [FECHA];
  executeQuery(deleteQuery, params, 'Viajes eliminadaos', 'Viajes no eliminados', res);
};

/**************************** ESTOS IRIAN EN ADMIN *****************************/
const readLineas = (req, res) => {

  const readQuery = `SELECT * FROM LINEA;`;

  executeQueryGetListas( readQuery, 'Lineas no encontradas', res);
};

const readAutobuses = (req, res) => {

  const readQuery = `SELECT * FROM AUTOBUS;`;

  executeQueryGetListas( readQuery, 'Autobuses no encontrados', res);
};

const readConductores = (req, res) => {

  const readQuery = `SELECT * FROM CONDUCTOR;`;

  executeQueryGetListas( readQuery, 'Conductores no encontrados', res);
};

const readRutinas = (req, res) => {

  const readQuery = `SELECT * FROM RUTINAS;`;

  executeQueryGetListas( readQuery, 'Rutinas no encontradas', res);
};

const readViajes = (req, res) => {

  const readQuery = `SELECT * FROM VIAJES;`;

  executeQueryGetListas( readQuery, 'Viajes no encontrados', res);
};

const readConductoresSinAutobusAsignado = (req, res) => {

  const readQuery = `SELECT c.ID_CONDUCTOR FROM CONDUCTOR c LEFT JOIN AUTOBUS a ON c.ID_CONDUCTOR = a.ID_CONDUCTOR WHERE a.ID_AUTOBUS IS NULL;`;

  executeQueryGetListas( readQuery, 'Conductores sin autobus asignado no encontrados', res);
};

const readAutobusesDeLinea = (req, res) => {
  const { ID_LINEA } = req.params;
  const readQuery = `SELECT * FROM AUTOBUS WHERE ID_LINEA=?;`;
  const params = [ID_LINEA];

  executeQueryGetReservas( readQuery, params, 'Autobuses no encontrados', res);
};

module.exports = {
    readReservasIdentificado, readLineas, readAutobuses, readAutobusesDeLinea, readConductores, readViajeExistente,
    readConductoresSinAutobusAsignado, readReservaMismoDiayHora, readRutinas, readViajes, readViajeFechaHoraLinea, readHistoricoReservasIdentificado,
    updateEstudianteIdentificado, updateReservaIdentificado, updateAsientosViajeNormal, updateAsientosViajeEspecial, updateAsientosViajeSR,
    deleteReservaIdentificado, deleteViajes
};

