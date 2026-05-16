/**
 * The CandidaturasController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/CandidaturasService');
const candidaturasGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.candidaturasGET);
};

const candidaturasIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.candidaturasIdDELETE);
};

const candidaturasIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.candidaturasIdGET);
};

const candidaturasIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.candidaturasIdPUT);
};

const candidaturasPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.candidaturasPOST);
};


module.exports = {
  candidaturasGET,
  candidaturasIdDELETE,
  candidaturasIdGET,
  candidaturasIdPUT,
  candidaturasPOST,
};
