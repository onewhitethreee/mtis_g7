/**
 * The CursosController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/CursosService');
const cursosGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.cursosGET);
};

const cursosIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.cursosIdDELETE);
};

const cursosIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.cursosIdGET);
};

const cursosIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.cursosIdPUT);
};

const cursosPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.cursosPOST);
};


module.exports = {
  cursosGET,
  cursosIdDELETE,
  cursosIdGET,
  cursosIdPUT,
  cursosPOST,
};
