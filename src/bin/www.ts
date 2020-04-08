
/**
 * Module dependencies.
 */
import 'reflect-metadata';
import app from '../app';
import debugLib from 'debug';
import * as http from 'http';
import config from '../config/env';
import connection from './../config/database';

connection.then(async (connection: any) => {
const debug = debugLib('bicm:server');
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.port || '3000');
app.set('port', port);

 /**
  * Create HTTP server.
  */

const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error',  (error: { syscall: string; code: any; }) =>{
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error( ` ${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error( `${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}` ;
  debug(`Listening on ${bind}` );
});
}).catch((error: any) => console.log('Data Access Error : ', error));

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
