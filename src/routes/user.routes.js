const { Router } = require('express');
const router = Router();

  /***************************************** login *****************************************/
  const { verificarCredenciales, updateFechaUltimaConexion, readFechaUltimaConexion
    } = require('../controllers/login.controller');

    router.post('/login', verificarCredenciales);

    router.get('/readfechaultimaconexion/:ID_FECHA_VIAJES', readFechaUltimaConexion);
    router.put('/actualizarfechaultimaconexion/:ID_FECHA_VIAJES/:FECHA_ULTIMA_CONEXION', updateFechaUltimaConexion);

  /***************************************** user *****************************************/
  const { readReservasIdentificado, updateEstudianteIdentificado, updateReservaIdentificado, 
    readLineas, readAutobuses, readAutobusesDeLinea, readConductores, readConductoresSinAutobusAsignado, readViajeExistente,
    deleteReservaIdentificado, readReservaMismoDiayHora, readRutinas, readViajes, readViajeFechaHoraLinea, readHistoricoReservasIdentificado,
    updateAsientosViajeNormal, updateAsientosViajeEspecial, updateAsientosViajeSR, deleteViajes
    } = require('../controllers/user.controller');

    router.get('/reservaidentificado/:ID_ESTUDIANTE', readReservasIdentificado);
    router.get('/historicoreservasidentificado/:ID_ESTUDIANTE', readHistoricoReservasIdentificado);

    router.get('/reservarepetida/:HORA/:FECHA/:ID_ESTUDIANTE', readReservaMismoDiayHora);
    router.get('/viajeencontrado/:FECHA/:HORA_SALIDA/:ID_LINEA', readViajeFechaHoraLinea);
    router.get('/viajeexistente/:FECHA', readViajeExistente);

    
    router.get('/lineas/', readLineas);
    router.get('/autobuses/', readAutobuses);
    router.get('/autobusesxlinea/:ID_LINEA', readAutobusesDeLinea);
    router.get('/conductores/', readConductores);
    router.get('/conductoressinautobusasignado/', readConductoresSinAutobusAsignado);
    router.get('/rutinas/', readRutinas);
    router.get('/viajes/', readViajes);


    router.put('/estudianteupdate/:ID_ESTUDIANTE', updateEstudianteIdentificado);
    router.put('/reservaupdate/:ID_ESTUDIANTE', updateReservaIdentificado);
    router.put('/actualizarasientonormal/:ID_VIAJE/:N_ASIENTOS', updateAsientosViajeNormal);
    router.put('/actualizarasientoespecial/:ID_VIAJE/:N_ASIENTOS_ESPECIALES', updateAsientosViajeEspecial);
    router.put('/actualizarasientosr/:ID_VIAJE/:N_ASIENTOS_SR', updateAsientosViajeSR);

    router.delete('/reservaidentificado/:ID_ESTUDIANTE', deleteReservaIdentificado);
    router.delete('/viajes/:FECHA', deleteViajes);




  /***************************************** admin *****************************************/

  const { createUser, createEstudiante, createReserva, createReservaHistorico, createLinea, createAutobus, createConductor, createRutina, createViaje,
    readUser, readEstudiante, readReserva, readReservaHistorico, readLinea, readAutobus, readConductor, readRutina, readViaje,
    updateUser, updateEstudiante, updateReserva, updateReservaHistorico, updateLinea, updateAutobus,updateConductor, updateRutina, 
    deleteUser, deleteEstudiante, deleteReserva, deleteReservaHistorico, deleteLinea, deleteAutobus, deleteConductor, deleteRutina 
    } = require('../controllers/admin.controller');


    router.get('/usuario/:id', readUser);
    router.get('/estudiante/:ID_ESTUDIANTE', readEstudiante);
    router.get('/reserva/:ID_RESERVA', readReserva);
    router.get('/reservahistorico/:ID_RESERVA', readReservaHistorico);
    router.get('/linea/:ID_LINEA', readLinea);
    router.get('/autobus/:ID_AUTOBUS', readAutobus);
    router.get('/conductor/:ID_CONDUCTOR', readConductor);
    router.get('/rutina/:ID_RUTINA', readRutina);
    router.get('/viaje/:ID_VIAJE', readViaje);



    router.post('/usuario/', createUser);
    router.post('/estudiante/', createEstudiante);
    router.post('/reserva/', createReserva);
    router.post('/reservahistorico/', createReservaHistorico);
    router.post('/linea/', createLinea);
    router.post('/autobus/', createAutobus);
    router.post('/conductor/', createConductor);
    router.post('/rutina/', createRutina);
    router.post('/viaje/', createViaje);


    router.put('/usuario/:id', updateUser);
    router.put('/estudiante/:ID_ESTUDIANTE', updateEstudiante);
    router.put('/reserva/:ID_RESERVA', updateReserva);
    router.put('/reservahistorico/:ID_RESERVA', updateReservaHistorico);
    router.put('/linea/:ID_LINEA', updateLinea);
    router.put('/autobus/:ID_AUTOBUS', updateAutobus);
    router.put('/conductor/:ID_CONDUCTOR', updateConductor);
    router.put('/rutina/:ID_RUTINA', updateRutina);


    router.delete('/usuario/:id', deleteUser);
    router.delete('/estudiante/:ID_ESTUDIANTE', deleteEstudiante);
    router.delete('/reserva/:ID_RESERVA', deleteReserva);
    router.delete('/reservahistorico/:ID_RESERVA', deleteReservaHistorico);
    router.delete('/linea/:ID_LINEA', deleteLinea);
    router.delete('/autobus/:ID_AUTOBUS', deleteAutobus);
    router.delete('/conductor/:ID_CONDUCTOR', deleteConductor);
    router.delete('/rutina/:ID_RUTINA', deleteRutina);



module.exports = router;